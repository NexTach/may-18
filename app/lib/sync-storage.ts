import type { SyncBundle } from "../types";
import { getDb } from "./db";

let ensureTablePromise: Promise<void> | null = null;

async function ensureSyncTable() {
  if (!ensureTablePromise) {
    ensureTablePromise = (async () => {
      const sql = getDb();
      await sql`
        create table if not exists user_sync (
          user_id text primary key,
          progress jsonb not null,
          settings jsonb not null,
          saved_at timestamptz not null default now(),
          updated_at timestamptz not null default now()
        )
      `;
    })();
  }

  await ensureTablePromise;
}

export async function readUserBundle(userId: string) {
  await ensureSyncTable();
  const sql = getDb();
  const rows = await sql<
    {
      progress: SyncBundle["progress"];
      settings: SyncBundle["settings"];
      saved_at: Date | string;
    }[]
  >`
    select progress, settings, saved_at
    from user_sync
    where user_id = ${userId}
    limit 1
  `;

  const row = rows[0];
  if (!row) {
    return null;
  }

  return {
    progress: row.progress,
    settings: row.settings,
    savedAt: new Date(row.saved_at).toISOString(),
  };
}

export async function writeUserBundle(userId: string, bundle: SyncBundle) {
  await ensureSyncTable();
  const sql = getDb();

  await sql`
    insert into user_sync (user_id, progress, settings, saved_at, updated_at)
    values (
      ${userId},
      ${sql.json(bundle.progress)},
      ${sql.json(bundle.settings)},
      ${bundle.savedAt}::timestamptz,
      now()
    )
    on conflict (user_id) do update
    set
      progress = excluded.progress,
      settings = excluded.settings,
      saved_at = excluded.saved_at,
      updated_at = now()
  `;
}
