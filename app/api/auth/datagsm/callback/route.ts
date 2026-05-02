import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
  dataGsmCookieNames,
  getDataGsmOAuthConfig,
  normalizeDataGsmUser,
  signSession,
} from "../../../../lib/datagsm-auth";

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
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.clientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: verifier,
  });
  if (config.clientSecret) body.set("client_secret", config.clientSecret);

  try {
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(new URL("/?auth=token-failed", request.url));
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
