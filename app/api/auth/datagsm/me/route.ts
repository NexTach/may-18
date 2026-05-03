import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  dataGsmCookieNames,
  getDataGsmOAuthConfig,
  verifySession,
} from "@/app/lib/datagsm-auth";
import { isDatabaseConfigured } from "@/app/lib/db";
import { readUserBundle } from "@/app/lib/sync-storage";

export async function GET() {
  const config = getDataGsmOAuthConfig();
  const storageConfigured = isDatabaseConfigured();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(dataGsmCookieNames.session)?.value;
  const session = verifySession(sessionToken);

  if (!session) {
    return NextResponse.json({
      configured: config.configured,
      storageConfigured,
      authenticated: false,
      user: null,
      lastSyncedAt: null,
    });
  }

  const bundle = await readUserBundle(session.user.id);

  return NextResponse.json({
    configured: config.configured,
    storageConfigured,
    authenticated: true,
    user: session.user,
    lastSyncedAt: bundle?.savedAt ?? null,
  });
}
