import { createHmac, timingSafeEqual } from "crypto";

// Server-side gate for Loose Threads. The password is checked here, never on the
// client, and success mints an HMAC-signed token stored in an httpOnly cookie so
// it can't be read or forged from the browser. The deck + narration routes only
// respond when this token verifies.

export const SESSION_COOKIE = "lt_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days (seconds)

function secret(): string {
  return process.env.LOOSE_THREADS_SECRET || "";
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Whether the configured password matches the submitted one. */
export function passwordMatches(input: string): boolean {
  const expected = process.env.LOOSE_THREADS_PASSWORD || "";
  if (!expected) return false; // no password configured => locked shut
  return safeEqual(input, expected);
}

/** Mint a signed session token: `<expiry>.<hmac>`. */
export function signToken(): string {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  const sig = createHmac("sha256", secret()).update(exp).digest("hex");
  return `${exp}.${sig}`;
}

/** Verify a session token's signature and expiry. */
export function verifyToken(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(exp).digest("hex");
  if (!safeEqual(sig, expected)) return false;
  const expMs = Number(exp);
  return Number.isFinite(expMs) && expMs > Date.now();
}

/** True when both required secrets are present (helps return a clear 503). */
export function isConfigured(): boolean {
  return Boolean(process.env.LOOSE_THREADS_PASSWORD && process.env.LOOSE_THREADS_SECRET);
}
