import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  dataGsmCookieNames,
  getDataGsmOAuthConfig,
  verifySession,
} from "../../../../lib/datagsm-auth";
import { readUserBundle } from "../../../../lib/sync-storage";

export async function GET() {
  const config = getDataGsmOAuthConfig();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(dataGsmCookieNames.session)?.value;
  const session = verifySession(sessionToken);

  if (!session) {
    return NextResponse.json({
      configured: config.configured,
      authenticated: false,
      user: null,
      lastSyncedAt: null,
    });
  }

  const bundle = await readUserBundle(session.user.id);

  return NextResponse.json({
    configured: config.configured,
    authenticated: true,
    user: session.user,
    lastSyncedAt: bundle?.savedAt ?? null,
  });
}
