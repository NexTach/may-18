import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { dataGsmCookieNames, verifySession } from "../../lib/datagsm-auth";
import { sanitizeProgress, sanitizeSettings } from "../../lib/game-state";
import { readUserBundle, writeUserBundle } from "../../lib/sync-storage";
import type { SyncBundle } from "../../types";

export async function GET() {
  const cookieStore = await cookies();
  const session = verifySession(
    cookieStore.get(dataGsmCookieNames.session)?.value,
  );

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const bundle = await readUserBundle(session.user.id);
  return NextResponse.json({ bundle: bundle ?? null });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = verifySession(
    cookieStore.get(dataGsmCookieNames.session)?.value,
  );

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<SyncBundle>;
  const bundle: SyncBundle = {
    progress: sanitizeProgress(body.progress),
    settings: sanitizeSettings(body.settings),
    savedAt: new Date().toISOString(),
  };

  await writeUserBundle(session.user.id, bundle);
  return NextResponse.json({ ok: true, bundle });
}
