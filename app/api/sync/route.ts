import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { dataGsmCookieNames, verifySession } from "../../lib/datagsm-auth";
import { isDatabaseConfigured } from "../../lib/db";
import { sanitizeProgress, sanitizeSettings } from "../../lib/game-state";
import {
  deleteUserBundle,
  readUserBundle,
  writeUserBundle,
} from "../../lib/sync-storage";
import type { SyncBundle } from "../../types";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Sync storage is not configured" },
      { status: 503 },
    );
  }

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
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Sync storage is not configured" },
      { status: 503 },
    );
  }

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

export async function DELETE() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { message: "Sync storage is not configured" },
      { status: 503 },
    );
  }

  const cookieStore = await cookies();
  const session = verifySession(
    cookieStore.get(dataGsmCookieNames.session)?.value,
  );

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await deleteUserBundle(session.user.id);
  return NextResponse.json({ ok: true });
}
