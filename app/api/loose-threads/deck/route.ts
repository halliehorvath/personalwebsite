import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SESSION_COOKIE, verifyToken } from "@/lib/loose-threads/auth";

// The deck (reading + listening history) lives in a PRIVATE Supabase Storage
// bucket, never in the public repo or as a static asset. It's downloaded here
// with the service-role key and only returned to an authenticated session.

const BUCKET = "loose-threads";
const OBJECT = "connections.json";

// Cache across warm invocations so a 38KB blob isn't re-downloaded every request.
let cachedDeck: unknown = null;

async function loadDeck(): Promise<unknown> {
  if (cachedDeck) return cachedDeck;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    const missing = [!url && "NEXT_PUBLIC_SUPABASE_URL", !key && "SUPABASE_SERVICE_ROLE_KEY"]
      .filter(Boolean)
      .join(", ");
    throw new Error(`missing env: ${missing}`);
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase.storage.from(BUCKET).download(OBJECT);
  if (error) throw new Error(`storage: ${error.message}`);
  if (!data) throw new Error("storage: empty response");
  cachedDeck = JSON.parse(await data.text());
  return cachedDeck;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await loadDeck());
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    console.error("[loose-threads] deck load failed:", reason);
    return NextResponse.json({ error: "Deck unavailable", reason }, { status: 503 });
  }
}
