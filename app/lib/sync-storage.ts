import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { SyncBundle } from "../types";

const STORAGE_DIR = path.join(process.cwd(), "data", "user-sync");

function getUserFilePath(userId: string) {
  return path.join(STORAGE_DIR, `${userId}.json`);
}

export async function readUserBundle(userId: string) {
  try {
    const contents = await readFile(getUserFilePath(userId), "utf8");
    return JSON.parse(contents) as SyncBundle;
  } catch {
    return null;
  }
}

export async function writeUserBundle(userId: string, bundle: SyncBundle) {
  await mkdir(STORAGE_DIR, { recursive: true });
  await writeFile(
    getUserFilePath(userId),
    JSON.stringify(bundle, null, 2),
    "utf8",
  );
}
