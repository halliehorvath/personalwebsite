// Upload the Loose Threads deck to a PRIVATE Supabase Storage bucket.
// Reads creds from the environment (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
// Usage:
//   node scripts/upload-loose-threads-deck.mjs <path-to-connections.json>
// e.g. after regenerating the deck with the pipeline:
//   node scripts/upload-loose-threads-deck.mjs ../cowork-agent/pipeline/output/connections.json
//
// The bucket is private, so the deck is only reachable server-side via the
// service-role key in app/api/loose-threads/deck/route.ts — never a public URL.

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "loose-threads";
const OBJECT = "connections.json";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const file = process.argv[2];

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}
if (!file) {
  console.error("Usage: node scripts/upload-loose-threads-deck.mjs <path-to-connections.json>");
  process.exit(1);
}

const body = readFileSync(file); // throws if missing — fail loudly
JSON.parse(body.toString()); // validate it's JSON before uploading

const supabase = createClient(url, key);

// Create the bucket (private) if it doesn't exist yet.
const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
if (listErr) {
  console.error("Could not list buckets:", listErr.message);
  process.exit(1);
}
if (!buckets.some((b) => b.name === BUCKET)) {
  const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
  if (error) {
    console.error("Could not create bucket:", error.message);
    process.exit(1);
  }
  console.log(`Created private bucket "${BUCKET}".`);
}

const { error: upErr } = await supabase.storage
  .from(BUCKET)
  .upload(OBJECT, body, { contentType: "application/json", upsert: true });
if (upErr) {
  console.error("Upload failed:", upErr.message);
  process.exit(1);
}

console.log(`Uploaded ${file} -> ${BUCKET}/${OBJECT} (${body.length} bytes).`);
