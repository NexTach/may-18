import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  dataGsmCookieNames,
  getDataGsmOAuthConfig,
  normalizeDataGsmUser,
  signSession,
} from "@/app/lib/datagsm-auth";

function extractOAuthError(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const error =
    typeof record.error === "string" ? record.error.trim() : undefined;
  const description =
    typeof record.error_description === "string"
      ? record.error_description.trim()
      : typeof record.message === "string"
        ? record.message.trim()
        : undefined;

  if (!error && !description) return null;
  return [error, description].filter(Boolean).join(": ");
}

async function exchangeToken(
  tokenUrl: string,
  payload: Record<string, string>,
) {
  const formBody = new URLSearchParams(payload);
  let response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
    cache: "no-store",
  });

  if (response.status !== 415) {
    return response;
  }

  response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return response;
}

export async function GET(request: NextRequest) {
  const config = getDataGsmOAuthConfig();
  if (!config.configured) {
    return NextResponse.redirect(new URL("/?auth=not-configured", request.url));
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(dataGsmCookieNames.state)?.value;
  const verifier = cookieStore.get(dataGsmCookieNames.verifier)?.value;

  if (error) {
    return NextResponse.redirect(
      new URL(`/?auth=${encodeURIComponent(error)}`, request.url),
    );
  }

  if (!code || !state || !verifier || expectedState !== state) {
    return NextResponse.redirect(new URL("/?auth=invalid-state", request.url));
  }

  const redirectUri = new URL(
    "/api/auth/datagsm/callback",
    request.url,
  ).toString();
  const tokenPayload: Record<string, string> = {
    grant_type: "authorization_code",
    client_id: config.clientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: verifier,
  };
  if (config.clientSecret) {
    tokenPayload.client_secret = config.clientSecret;
  }

  try {
    const tokenResponse = await exchangeToken(config.tokenUrl, tokenPayload);

    if (!tokenResponse.ok) {
      let reason = `HTTP ${tokenResponse.status}`;

      try {
        const tokenErrorJson = await tokenResponse.json();
        reason = extractOAuthError(tokenErrorJson) ?? reason;
      } catch {
        try {
          const tokenErrorText = (await tokenResponse.text()).trim();
          if (tokenErrorText) {
            reason = tokenErrorText;
          }
        } catch {
          // Ignore secondary parsing failures and keep the status-only reason.
        }
      }

      const redirectUrl = new URL("/?auth=token-failed", request.url);
      redirectUrl.searchParams.set("reason", reason.slice(0, 180));
      return NextResponse.redirect(redirectUrl);
    }

    const tokenJson = (await tokenResponse.json()) as { access_token?: string };
    if (!tokenJson.access_token) {
      return NextResponse.redirect(
        new URL("/?auth=token-missing", request.url),
      );
    }

    const userResponse = await fetch(config.userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
      },
      cache: "no-store",
    });

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL("/?auth=userinfo-failed", request.url),
      );
    }

    const rawUser = await userResponse.json();
    const user = normalizeDataGsmUser(rawUser);

    if (user.academicState === "dropout") {
      return NextResponse.redirect(
        new URL("/?auth=unauthorized-role", request.url),
      );
    }

    const session = signSession({
      user,
      createdAt: new Date().toISOString(),
    });

    const response = NextResponse.redirect(
      new URL("/?auth=success", request.url),
    );
    response.cookies.set(dataGsmCookieNames.session, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
    response.cookies.set(dataGsmCookieNames.state, "", {
      path: "/",
      maxAge: 0,
    });
    response.cookies.set(dataGsmCookieNames.verifier, "", {
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch {
    return NextResponse.redirect(new URL("/?auth=network-failed", request.url));
  }
}
