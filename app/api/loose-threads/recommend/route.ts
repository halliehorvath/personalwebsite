import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/loose-threads/auth";
import {
  AGENT_MODEL,
  AGENT_SYSTEM,
  WEB_SEARCH_TOOL,
  type AgentResult,
} from "@/lib/loose-threads/narrator";

// Recommendation AGENT: reason -> web_search -> verify -> return. Runs live at
// pull time so the search loop is visible. Anthropic's web_search is a server
// tool, so the API runs the searches internally and returns the final answer in
// a single call; max_uses (in WEB_SEARCH_TOOL) caps searches per pull.
//
// Failure never crashes the reveal — the client renders narration regardless and
// degrades the recommendation slot: found:true -> found:false -> soft error.
export const maxDuration = 60;

const MAX_BODY_BYTES = 16 * 1024;

interface Block {
  type: string;
  text?: string;
  name?: string;
  input?: { query?: string };
}

// Pull the last JSON object out of the model's text (it may be preceded by a
// visible "REASON:" line and interleaved with search blocks).
function extractJson(text: string): unknown | null {
  const cleaned = text.replace(/```json|```/g, "");
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function isAgentResult(v: unknown): v is AgentResult {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (o.found === true) return typeof o.title === "string" && typeof o.creator === "string";
  if (o.found === false) return typeof o.reason === "string";
  return false;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Agent is not configured.", reason: "missing env: ANTHROPIC_API_KEY" },
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
        model: AGENT_MODEL,
        max_tokens: 1500,
        system: AGENT_SYSTEM,
        tools: [WEB_SEARCH_TOOL],
        messages: [
          {
            role: "user",
            content:
              "Find a thread to pull from this connection. Data:\n" +
              JSON.stringify(connection, null, 2),
          },
        ],
      }),
    });

    if (!upstream.ok) {
      const bodyText = await upstream.text().catch(() => "");
      console.error("[loose-threads] recommend upstream", upstream.status, bodyText.slice(0, 300));
      return NextResponse.json(
        { error: "Agent upstream error", reason: `upstream ${upstream.status}: ${bodyText.slice(0, 160)}` },
        { status: 502 }
      );
    }

    const data = await upstream.json();
    const blocks: Block[] = data.content || [];

    // Trace (the evidence it's an agent): the queries it ran + its REASON line.
    const queries = blocks
      .filter((b) => b.type === "server_tool_use" && b.name === "web_search")
      .map((b) => b.input?.query)
      .filter((q): q is string => typeof q === "string");
    const fullText = blocks
      .filter((b) => b.type === "text")
      .map((b) => b.text || "")
      .join("\n");
    const reasonLine = fullText.match(/REASON:\s*(.+)/)?.[1]?.trim();
    console.error(
      "[loose-threads] agent trace — searches:",
      JSON.stringify(queries),
      "| REASON:",
      reasonLine || "(none)"
    );

    const parsed = extractJson(fullText);
    if (!isAgentResult(parsed)) {
      // Couldn't get a clean verdict — treat as a soft failure at the reveal.
      return NextResponse.json(
        { error: "Agent returned no parseable result", reason: "no verdict" },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: parsed, trace: { reason: reasonLine, queries } });
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    console.error("[loose-threads] recommend failed:", reason);
    return NextResponse.json({ error: "Agent failed", reason }, { status: 500 });
  }
}
