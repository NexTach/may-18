import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import postgres from "postgres";

function readDatabaseUrl() {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.NEON_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    ""
  );
}

function assertRequiredEnv() {
  const required = [
    "NEXT_PUBLIC_DATAGSM_CLIENT_ID",
    "DATAGSM_CLIENT_SECRET",
    "APP_SESSION_SECRET",
  ];
  const missing = required.filter((key) => !process.env[key]?.trim());
  const databaseUrl = readDatabaseUrl();

  if (!databaseUrl) {
    missing.push("DATABASE_URL");
  }

  if (missing.length > 0) {
    throw new Error(
      [
        "Build aborted due to missing required environment variables.",
        `Missing: ${missing.join(", ")}`,
        "Check `.env.local` or your deployment environment settings.",
      ].join("\n"),
    );
  }

  return databaseUrl;
}

async function assertDatabaseConnection(databaseUrl: string) {
  const sql = postgres(databaseUrl, {
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
    prepare: false,
  });

  try {
    await sql`select 1`;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown connection error";
    throw new Error(
      [
        "Build aborted because Neon/Postgres connectivity validation failed.",
        `Cause: ${message}`,
        "Check DATABASE_URL and outbound network access.",
      ].join("\n"),
    );
  } finally {
    await sql.end({ timeout: 1 });
  }
}

export default async function nextConfig(phase: string): Promise<NextConfig> {
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    const databaseUrl = assertRequiredEnv();
    await assertDatabaseConnection(databaseUrl);
  }

  return {
    reactCompiler: true,
    images: {
      qualities: [100],
    },
  };
}
