import { createHash, createHmac, randomBytes } from "node:crypto";
import type { DataGsmUser } from "../types";

const SESSION_COOKIE = "may18_datagsm_session";
const STATE_COOKIE = "may18_datagsm_oauth_state";
const VERIFIER_COOKIE = "may18_datagsm_oauth_verifier";

type SessionPayload = {
  user: DataGsmUser;
  createdAt: string;
};

function getSessionSecret() {
  return process.env.APP_SESSION_SECRET ?? "may18-dev-session-secret";
}

function toBase64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(
    normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    ),
  );
}

export function getDataGsmOAuthConfig() {
  const clientId = process.env.NEXT_PUBLIC_DATAGSM_CLIENT_ID ?? "";
  const clientSecret = process.env.DATAGSM_CLIENT_SECRET ?? "";

  return {
    clientId,
    clientSecret,
    scope: process.env.NEXT_PUBLIC_DATAGSM_SCOPE ?? "",
    authorizeUrl:
      process.env.DATAGSM_OAUTH_AUTHORIZE_URL ??
      "https://oauth.authorization.datagsm.kr/v1/oauth/authorize",
    tokenUrl:
      process.env.DATAGSM_OAUTH_TOKEN_URL ??
      "https://oauth.authorization.datagsm.kr/v1/oauth/token",
    userInfoUrl:
      process.env.DATAGSM_OAUTH_USERINFO_URL ??
      "https://oauth.resource.datagsm.kr/userinfo",
    configured: clientId.length > 0,
  };
}

export function createPkcePair() {
  const verifier = toBase64Url(randomBytes(32));
  const challenge = toBase64Url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export function createOAuthState() {
  return toBase64Url(randomBytes(24));
}

export function signSession(payload: SessionPayload) {
  const body = toBase64Url(JSON.stringify(payload));
  const signature = toBase64Url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  return `${body}.${signature}`;
}

export function verifySession(token: string | undefined) {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = toBase64Url(
    createHmac("sha256", getSessionSecret()).update(body).digest(),
  );
  if (expected !== signature) return null;

  try {
    const parsed = JSON.parse(
      fromBase64Url(body).toString("utf8"),
    ) as SessionPayload;
    if (!parsed?.user?.id || !parsed?.user?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

function readNestedNumber(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number") return value;
  }
  return undefined;
}

function readNestedString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}

export function normalizeDataGsmUser(raw: unknown): DataGsmUser {
  const root =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const account =
    root.account && typeof root.account === "object"
      ? (root.account as Record<string, unknown>)
      : root;
  const student =
    root.student && typeof root.student === "object"
      ? (root.student as Record<string, unknown>)
      : account.student && typeof account.student === "object"
        ? (account.student as Record<string, unknown>)
        : {};

  const id =
    readNestedString(root, ["id", "userId", "uuid", "sub"]) ??
    readNestedString(account, ["id", "userId", "uuid", "sub"]) ??
    readNestedString(student, ["id", "studentId"]) ??
    "unknown";
  const name =
    readNestedString(root, ["name", "nickname"]) ??
    readNestedString(account, ["name", "nickname"]) ??
    readNestedString(student, ["name"]) ??
    "DataGSM 사용자";
  const role =
    readNestedString(root, ["role"]) ??
    readNestedString(account, ["role"]) ??
    readNestedString(student, ["role"]) ??
    "학생";

  return {
    id,
    name,
    role,
    grade: readNestedNumber(student, ["grade"]),
    classRoom: readNestedNumber(student, ["class", "classRoom", "room"]),
    number: readNestedNumber(student, ["number", "studentNumber"]),
  };
}

export const dataGsmCookieNames = {
  session: SESSION_COOKIE,
  state: STATE_COOKIE,
  verifier: VERIFIER_COOKIE,
};
