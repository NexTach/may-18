import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { dataGsmCookieNames, verifySession } from "@/app/lib/datagsm-auth";
import { readUserBundle } from "@/app/lib/sync-storage";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(dataGsmCookieNames.session)?.value;
  const session = verifySession(sessionToken);

  if (!session) {
    return NextResponse.json({
      authenticated: false,
      user: null,
      lastSyncedAt: null,
    });
  }

  const bundle = await readUserBundle(session.user.id);

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    lastSyncedAt: bundle?.savedAt ?? null,
  });
}
