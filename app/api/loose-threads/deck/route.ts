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
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await supabase.storage.from(BUCKET).download(OBJECT);
  if (error || !data) throw error || new Error("deck not found");
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
  } catch {
    return NextResponse.json({ error: "Deck unavailable" }, { status: 503 });
  }
}
