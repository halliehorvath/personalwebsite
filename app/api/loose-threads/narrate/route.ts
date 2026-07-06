import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/loose-threads/auth";
import {
  NARRATOR_MODEL,
  NARRATOR_SYSTEM,
  type Narration,
} from "@/lib/loose-threads/narrator";

export const maxDuration = 30;

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Narrator is not configured." },
      { status: 503 }
    );
  }

  let connection: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    connection = JSON.parse(raw || "{}").connection;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!connection || typeof connection !== "object") {
    return NextResponse.json({ error: "Missing connection" }, { status: 400 });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: NARRATOR_MODEL,
        max_tokens: 1000,
        system: NARRATOR_SYSTEM,
        messages: [
          {
            role: "user",
            content:
              "Narrate this connection. Data:\n" +
              JSON.stringify(connection, null, 2),
          },
        ],
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Narrator upstream error" },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const text: string = (data.content || [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n");

    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as Narration;
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate narration" },
      { status: 500 }
    );
  }
}
