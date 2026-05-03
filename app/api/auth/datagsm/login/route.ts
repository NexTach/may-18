import { type NextRequest, NextResponse } from "next/server";
import {
  createOAuthState,
  createPkcePair,
  dataGsmCookieNames,
  getDataGsmOAuthConfig,
} from "@/app/lib/datagsm-auth";

export async function GET(request: NextRequest) {
  const config = getDataGsmOAuthConfig();
  if (!config.configured) {
    return NextResponse.redirect(new URL("/?auth=not-configured", request.url));
  }

  const { state: cookieNameState, verifier: verifierCookie } =
    dataGsmCookieNames;
  const state = createOAuthState();
  const { verifier, challenge } = createPkcePair();
  const redirectUri = new URL(
    "/api/auth/datagsm/callback",
    request.url,
  ).toString();
  const authorizeUrl = new URL(config.authorizeUrl);

  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", config.clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", challenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  if (config.scope) authorizeUrl.searchParams.set("scope", config.scope);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(cookieNameState, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
  response.cookies.set(verifierCookie, verifier, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
