import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  isConfigured,
  passwordMatches,
  signToken,
} from "@/lib/loose-threads/auth";

const MAX_BODY_BYTES = 4 * 1024;

export async function POST(req: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Loose Threads is not configured on this server." },
      { status: 503 }
    );
  }

  let password = "";
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    const body = JSON.parse(raw || "{}");
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, signToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
