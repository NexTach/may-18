import { NextResponse } from "next/server";
import { dataGsmCookieNames } from "../../../../lib/datagsm-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(dataGsmCookieNames.session, "", {
    path: "/",
    maxAge: 0,
  });
  return response;
}
