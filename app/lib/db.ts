import postgres from "postgres";

type SqlClient = ReturnType<typeof postgres>;

declare global {
  // eslint-disable-next-line no-var
  var __may18Sql: SqlClient | undefined;
}

function readDatabaseUrl() {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.NEON_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    ""
  );
}

export function isDatabaseConfigured() {
  return readDatabaseUrl().length > 0;
}

export function getDb() {
  const databaseUrl = readDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured.");
  }

  if (!globalThis.__may18Sql) {
    globalThis.__may18Sql = postgres(databaseUrl, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
    });
  }

  return globalThis.__may18Sql;
}
