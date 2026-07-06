"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { FormEvent, ReactNode, CSSProperties } from "react";
import { WindowControls } from "@/components/window-controls";
import { WindowNavShell, WindowNavSpacer } from "@/components/window-nav-shell";
import { useWindowNavBehavior } from "@/lib/use-window-nav-behavior";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Loose Threads — one connection at a time, from what you already love.
// Server-gated: the deck + narration come from /api/loose-threads/* only after
// a session cookie is set by the login route. Press the button, a receipt prints.
// ---------------------------------------------------------------------------

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace";

interface Book {
  title: string;
  author: string;
  rating?: number;
  window: [string, string];
  date_read?: string;
}
interface Music {
  album: string;
  artist: string;
  hours: number;
  plays: number;
  distinct_days: number;
  lift: number;
  win_share: number;
}
interface Podcast {
  show: string;
  hours: number;
  episodes: number;
  distinct_days: number;
  lift: number;
  win_share: number;
}
interface Connection {
  id: string;
  book: Book;
  music: Music;
  podcast?: Podcast;
  confidence: number;
  confidence_label: string;
  evidence: string;
}
interface Deck {
  generated_at: string;
  corpus_titles?: string[];
  connections: Connection[];
}
interface Rec {
  medium: string;
  title: string;
  creator?: string;
  why: string;
}
interface Narration {
  loading?: boolean;
  error?: boolean;
  narration?: string | null;
  recommendations?: Rec[] | null;
}

const KEYFRAMES = `
@keyframes ltPrintPaper { from { max-height: 0; } to { max-height: 1600px; } }
@keyframes ltPrinterHum { 0%,100% { transform: translateY(0);} 25% { transform: translateY(0.6px);} 75% { transform: translateY(-0.6px);} }
@keyframes ltLedBlink { 0%,100% { opacity: 1;} 50% { opacity: 0.25;} }
@keyframes ltShimmer { 0% { opacity: 0.35;} 50% { opacity: 0.9;} 100% { opacity: 0.35;} }
@keyframes ltTearOff { to { transform: translateY(60px) rotate(2.5deg); opacity: 0; } }
@keyframes ltCoverFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ltShake { 0%,100% { transform: translateX(0);} 20% { transform: translateX(-8px);} 40% { transform: translateX(7px);} 60% { transform: translateX(-5px);} 80% { transform: translateX(3px);} }
@media (prefers-reduced-motion: reduce) {
  .lt-paper { animation: none !important; max-height: none !important; }
}
`;

// ---------------------------------------------------------------------------
// Root: title bar + auth state machine
// ---------------------------------------------------------------------------
export function LooseThreadsApp({
  isMobile = false,
  inShell = false,
}: {
  isMobile?: boolean;
  inShell?: boolean;
}) {
  const [status, setStatus] = useState<"checking" | "locked" | "open">("checking");
  const [deck, setDeck] = useState<Deck | null>(null);

  const loadDeck = useCallback(async (): Promise<{ ok: boolean; status: number }> => {
    try {
      const r = await fetch("/api/loose-threads/deck");
      if (r.ok) {
        setDeck(await r.json());
        setStatus("open");
        return { ok: true, status: 200 };
      }
      setStatus("locked");
      return { ok: false, status: r.status };
    } catch {
      setStatus("locked");
      return { ok: false, status: 0 };
    }
  }, []);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  return (
    <div
      data-app="loose-threads"
      className={cn(
        "flex flex-col bg-background text-foreground outline-none overflow-hidden",
        isMobile ? "h-dvh w-full" : "h-full"
      )}
    >
      <style>{KEYFRAMES}</style>
      <LTNav isMobile={isMobile} isDesktop={inShell} />
      <div className="flex-1 min-h-0 overflow-auto">
        {status === "checking" && (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            …
          </div>
        )}
        {status === "locked" && <LoginGate onUnlocked={loadDeck} />}
        {status === "open" && deck && <Printer deck={deck} />}
      </div>
    </div>
  );
}

function LTNav({ isMobile, isDesktop }: { isMobile: boolean; isDesktop: boolean }) {
  const nav = useWindowNavBehavior({ isDesktop, isMobile });
  return (
    <WindowNavShell
      isMobile={isMobile}
      onMouseDown={nav.onDragStart}
      left={
        <WindowControls
          inShell={nav.inShell}
          showWhenNotInShell={!isDesktop}
          className="p-2"
          onClose={nav.onClose}
          onMinimize={nav.onMinimize}
          onToggleMaximize={nav.onToggleMaximize}
          isMaximized={nav.isMaximized}
          closeLabel={nav.closeLabel}
        />
      }
      center={
        <div className="text-center text-[13px] font-semibold select-none">
          Loose Threads
        </div>
      }
      right={<WindowNavSpacer isMobile={isMobile} />}
    />
  );
}

// ---------------------------------------------------------------------------
// Login gate — posts the password to the server, which sets the session cookie.
// ---------------------------------------------------------------------------
function LoginGate({
  onUnlocked,
}: {
  onUnlocked: () => Promise<{ ok: boolean; status: number }>;
}) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!pw || busy) return;
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/loose-threads/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        // Password accepted + cookie set; now load the deck. Surface any
        // failure instead of silently returning to the locked screen.
        const res = await onUnlocked();
        if (!res.ok) {
          setErr(
            res.status === 503
              ? "Signed in, but the deck couldn't load — check the server config (Supabase key)."
              : res.status === 401
                ? "Signed in, but the session didn't stick. Check cookies are enabled."
                : `Signed in, but couldn't load the deck (${res.status || "network error"}).`
          );
        }
        return;
      }
      const data = await r.json().catch(() => ({}));
      setErr(data.error || "Wrong password.");
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setBusy(false);
      setPw("");
      setShakeKey((k) => k + 1);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="h-full flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        key={shakeKey}
        style={{ animation: err ? "ltShake 0.45s ease" : "none" }}
        className="flex flex-col items-center gap-3 w-[260px]"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
          style={{ background: "linear-gradient(140deg, #63C97A, #1F8A46)" }}
          aria-hidden
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8.2" stroke="white" strokeWidth="1.6" opacity="0.85" />
            <path
              d="M12 5.4 A6.6 6.6 0 1 0 18.6 12"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M12 3.6 L12 7 L9 5.4 Z" fill="white" />
            <line x1="12" y1="12" x2="9.4" y2="9.6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="12" y1="12" x2="14.6" y2="10.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-[15px] font-semibold">Loose Threads is private</div>
        <div className="text-xs text-muted-foreground -mt-2">Enter the password to continue</div>
        <div className="relative w-full mt-1">
          <input
            ref={inputRef}
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-full border border-black/15 dark:border-white/15 bg-muted px-4 py-2 pr-9 text-sm outline-none focus:border-[#0A7CFF]"
          />
          <button
            type="submit"
            aria-label="Unlock"
            disabled={!pw || busy}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full grid place-items-center text-white disabled:opacity-40"
            style={{ background: "#0A7CFF" }}
          >
            →
          </button>
        </div>
        <div className="h-4 text-xs text-red-500">{err}</div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Printer + receipt
// ---------------------------------------------------------------------------
function Printer({ deck }: { deck: Deck }) {
  const [phase, setPhase] = useState<"idle" | "printing" | "done" | "tearing">("idle");
  const [current, setCurrent] = useState<Connection | null>(null);
  const [narrations, setNarrations] = useState<Record<string, Narration>>({});
  const [feedback, setFeedback] = useState<Record<string, "kept" | "missed">>({});
  const [toast, setToast] = useState("");
  const drawCount = useRef(0);

  const ordered = useMemo(() => {
    const cs = deck.connections || [];
    const kept = cs.filter((c) => feedback[c.id] !== "missed");
    const missed = cs.filter((c) => feedback[c.id] === "missed");
    return [...kept, ...missed];
  }, [deck, feedback]);

  const fetchNarration = useCallback(async (conn: Connection) => {
    setNarrations((n) => ({ ...n, [conn.id]: { loading: true } }));
    try {
      const r = await fetch("/api/loose-threads/narrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ connection: conn }),
      });
      if (!r.ok) throw new Error("narrate failed");
      const parsed = (await r.json()) as Narration;
      setNarrations((n) => ({ ...n, [conn.id]: { ...parsed, loading: false } }));
    } catch {
      setNarrations((n) => ({
        ...n,
        [conn.id]: { loading: false, error: true, narration: null, recommendations: null },
      }));
    }
  }, []);

  const pull = useCallback(() => {
    if (!ordered.length || phase === "printing" || phase === "tearing") return;
    const next = ordered[drawCount.current % ordered.length];
    drawCount.current += 1;

    const start = () => {
      setCurrent(next);
      setPhase("printing");
      if (!narrations[next.id]) fetchNarration(next);
      window.setTimeout(() => setPhase("done"), 3300);
    };

    if (current) {
      setPhase("tearing");
      window.setTimeout(start, 500);
    } else {
      start();
    }
  }, [ordered, phase, current, narrations, fetchNarration]);

  function mark(id: string, val: "kept" | "missed") {
    setFeedback((f) => ({ ...f, [id]: val }));
    setToast(val === "kept" ? "Noted — more like this rise in the deck." : "Noted — this one sinks in the deck.");
    window.setTimeout(() => setToast(""), 2200);
  }

  const n = current ? narrations[current.id] : null;
  const busy = phase === "printing" || phase === "tearing";

  return (
    <div className="min-h-full flex flex-col items-center px-5 pt-6 pb-8">
      <div className="text-[10.5px] tracking-[0.09em] uppercase text-muted-foreground text-center">
        One connection at a time, from what you already love
      </div>

      {/* printer console */}
      <div
        className="mt-4 w-full max-w-[420px] flex items-center justify-between gap-4 rounded-2xl border bg-muted px-5 py-4"
        style={{ animation: phase === "printing" ? "ltPrinterHum 0.12s linear infinite" : "none" }}
      >
        <div className="text-left">
          <div className="text-[13px] font-semibold">Memory printer</div>
          <div className="text-[11.5px] text-muted-foreground mt-0.5">
            {ordered.length} connections · deck of {deck.generated_at}
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <span
            title={busy ? "printing" : "ready"}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: busy ? "#febc2e" : "#28c840",
              boxShadow: `0 0 6px ${busy ? "#febc2e" : "#28c840"}`,
              animation: busy ? "ltLedBlink 0.5s linear infinite" : "none",
            }}
          />
          <PrintButton onClick={pull} disabled={busy || !ordered.length} printing={busy} />
        </div>
      </div>

      {/* the slot */}
      <div
        className="mt-4 h-2.5 w-[min(360px,90%)] rounded-full"
        style={{ background: "#3f3f46", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.55)" }}
      />

      {/* receipt */}
      <div className="w-full flex justify-center px-2" style={{ minHeight: 120 }}>
        {current && phase !== "idle" ? (
          <div
            className="lt-paper"
            style={{
              width: 300,
              marginTop: -2,
              overflow: "hidden",
              animation:
                phase === "tearing"
                  ? "ltTearOff 0.5s ease-in both"
                  : "ltPrintPaper 3.2s steps(48, end) both",
              filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.22))",
            }}
          >
            <Receipt
              conn={current}
              n={n}
              feedback={feedback}
              onMark={mark}
              onAnother={pull}
              done={phase === "done"}
            />
          </div>
        ) : (
          <div className="self-center text-[12.5px] text-muted-foreground py-9">
            Press print to draw one connection.
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border bg-background/90 backdrop-blur px-4 py-2 text-[12.5px] shadow-lg z-10">
          {toast}
        </div>
      )}
    </div>
  );
}

function PrintButton({
  onClick,
  disabled,
  printing,
}: {
  onClick: () => void;
  disabled: boolean;
  printing: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        border: "none",
        cursor: disabled ? "default" : "pointer",
        background: `radial-gradient(circle at 35% 30%, ${printing ? "#5EA8FF" : "#3D95FF"}, #0A7CFF 70%)`,
        color: "#fff",
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.06em",
        boxShadow:
          pressed || printing
            ? "inset 0 3px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)"
            : "0 4px 10px rgba(10,124,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
        transform: pressed ? "translateY(1.5px)" : "translateY(0)",
        transition: "transform 0.08s ease, box-shadow 0.12s ease",
        opacity: disabled && !printing ? 0.55 : 1,
      }}
    >
      {printing ? "…" : "PRINT"}
    </button>
  );
}

function Receipt({
  conn,
  n,
  feedback,
  onMark,
  onAnother,
  done,
}: {
  conn: Connection;
  n: Narration | null;
  feedback: Record<string, "kept" | "missed">;
  onMark: (id: string, val: "kept" | "missed") => void;
  onAnother: () => void;
  done: boolean;
}) {
  const stamp = useMemo(
    () => new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conn.id]
  );
  const stars = "★".repeat(Math.round(conn.confidence * 5)).padEnd(5, "☆");

  return (
    <div
      style={{
        background: "#fdfdfb",
        color: "#1c1c1c",
        fontFamily: MONO,
        fontSize: 11,
        lineHeight: 1.55,
        padding: "18px 18px 14px",
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 7px), 96% 100%, 92% calc(100% - 7px), 88% 100%, 84% calc(100% - 7px), 80% 100%, 76% calc(100% - 7px), 72% 100%, 68% calc(100% - 7px), 64% 100%, 60% calc(100% - 7px), 56% 100%, 52% calc(100% - 7px), 48% 100%, 44% calc(100% - 7px), 40% 100%, 36% calc(100% - 7px), 32% 100%, 28% calc(100% - 7px), 24% 100%, 20% calc(100% - 7px), 16% 100%, 12% calc(100% - 7px), 8% 100%, 4% calc(100% - 7px), 0 100%)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.18em" }}>LOOSE THREADS</div>
        <div style={{ fontSize: 9.5, letterSpacing: "0.12em", marginTop: 2 }}>MEMORY RECEIPT</div>
        <div style={{ fontSize: 9.5, marginTop: 4, color: "#555" }}>
          {stamp} · #{conn.id}
        </div>
      </div>

      <Divider />

      <Section label="THE READ">
        <div style={{ display: "flex", gap: 10 }}>
          <Cover kind="book" query={{ title: conn.book.title, author: conn.book.author }} />
          <div>
            <div style={{ fontWeight: 700 }}>{conn.book.title}</div>
            <div style={{ color: "#555" }}>{conn.book.author}</div>
            <div style={{ color: "#888", fontSize: 9.5, marginTop: 3 }}>
              read {formatDate(conn.book.window[0])} – {formatDate(conn.book.window[1])}
            </div>
          </div>
        </div>
      </Section>

      <Section label="THE SOUNDTRACK">
        <div style={{ display: "flex", gap: 10 }}>
          <Cover kind="album" query={{ artist: conn.music.artist, album: conn.music.album }} />
          <div>
            <div style={{ fontWeight: 700 }}>{conn.music.album}</div>
            <div style={{ color: "#555" }}>{conn.music.artist}</div>
            <div style={{ color: "#888", fontSize: 9.5, marginTop: 3 }}>
              {conn.music.hours}h · {conn.music.plays} plays · {conn.music.distinct_days} days
            </div>
          </div>
        </div>
        <ShiftStat windowShare={conn.music.win_share} lift={conn.music.lift} />
      </Section>

      {conn.podcast && (
        <Section label="ALSO IN THE MIX">
          <div style={{ display: "flex", gap: 10 }}>
            <Cover kind="podcast" query={{ show: conn.podcast.show }} />
            <div>
              <div style={{ fontWeight: 700 }}>{conn.podcast.show}</div>
              <div style={{ color: "#888", fontSize: 9.5, marginTop: 3 }}>
                {conn.podcast.hours}h · {conn.podcast.episodes} episodes · {conn.podcast.distinct_days} days
              </div>
            </div>
          </div>
          <ShiftStat windowShare={conn.podcast.win_share} lift={conn.podcast.lift} />
        </Section>
      )}

      <Divider />

      <div style={{ minHeight: 30 }}>
        {!n || n.loading ? (
          <div style={{ animation: "ltShimmer 1.4s infinite", color: "#777" }}>
            printing narration
            <br />
            ...
          </div>
        ) : n.narration ? (
          <div>{n.narration}</div>
        ) : (
          <div style={{ color: "#777" }}>{prettifyDates(conn.evidence)}</div>
        )}
      </div>

      {n && !n.loading && n.recommendations && n.recommendations.length > 0 && (
        <>
          <Divider />
          <Section label="THREADS TO PULL">
            {n.recommendations.map((rec, i) => (
              <Recommendation key={i} rec={rec} first={i === 0} />
            ))}
          </Section>
        </>
      )}
      {n?.error && (
        <div style={{ color: "#999", fontSize: 9.5, marginTop: 4 }}>
          narrator unreachable — data only
        </div>
      )}

      <Divider />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#555" }}>CONFIDENCE</span>
        <span>
          {stars} {conn.confidence}
        </span>
      </div>
      <div style={{ textAlign: "center", fontSize: 9.5, color: "#555", marginTop: 2 }}>
        {conn.confidence_label.toUpperCase()}
      </div>

      <div
        aria-hidden
        style={{
          margin: "12px auto 4px",
          height: 26,
          width: "72%",
          background:
            "repeating-linear-gradient(90deg, #1c1c1c 0 2px, transparent 2px 4px, #1c1c1c 4px 5px, transparent 5px 9px, #1c1c1c 9px 12px, transparent 12px 14px)",
        }}
      />
      <div style={{ textAlign: "center", fontSize: 9, letterSpacing: "0.14em", color: "#555" }}>
        THANK YOU FOR REMEMBERING
      </div>

      {done && (
        <div style={{ display: "flex", gap: 6, marginTop: 12, justifyContent: "center" }}>
          <ReceiptBtn active={feedback[conn.id] === "kept"} onClick={() => onMark(conn.id, "kept")}>
            landed
          </ReceiptBtn>
          <ReceiptBtn active={feedback[conn.id] === "missed"} onClick={() => onMark(conn.id, "missed")}>
            miss
          </ReceiptBtn>
          <ReceiptBtn onClick={onAnother}>print another</ReceiptBtn>
        </div>
      )}
    </div>
  );
}

function Divider() {
  return <div style={{ margin: "10px 0", borderTop: "1px dashed #b9b9b2" }} />;
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 9, letterSpacing: "0.16em", color: "#888" }}>{label}</div>
      {children}
    </div>
  );
}

const ORDINALS = ["th", "st", "nd", "rd"];
function ordinal(nn: number) {
  const v = nn % 100;
  return ORDINALS[(v - 20) % 10] || ORDINALS[v] || ORDINALS[0];
}
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const month = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  return `${month} ${d}${ordinal(d)}, ${y}`;
}
const ISO_DATE_RE = /\b(\d{4})-(\d{2})-(\d{2})\b/g;
function prettifyDates(text: string) {
  return text.replace(ISO_DATE_RE, (m) => formatDate(m));
}
function pctLabel(v: number) {
  const pct = v * 100;
  if (pct < 0.1) return "<0.1%";
  if (pct < 1) return `${pct.toFixed(1)}%`;
  return `${Math.round(pct)}%`;
}

// Emphasizes the SHIFT: "usually" vs "this read" as two points on a log-scaled
// rare→constant line, with the multiplier as the hero number.
function ShiftStat({ windowShare, lift }: { windowShare: number; lift: number }) {
  const baseline = lift > 0 ? windowShare / lift : windowShare;
  const pos = (share: number) => {
    const lo = -3;
    const hi = 0;
    const l = Math.log10(Math.max(share, 1e-4));
    return Math.min(1, Math.max(0, (l - lo) / (hi - lo))) * 100;
  };
  const bPos = pos(baseline);
  const wPos = pos(windowShare);
  const mult = lift >= 10 ? Math.round(lift) : lift.toFixed(1);

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 9, color: "#888", letterSpacing: "0.04em" }}>SHARE OF YOUR LISTENING</span>
        <span style={{ fontSize: 12, fontWeight: 700 }}>
          {mult}× <span style={{ fontSize: 9, fontWeight: 400, color: "#555" }}>above normal</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 34, marginTop: 12 }}>
        <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 1, background: "#c9c9c2" }} />
        <div
          style={{
            position: "absolute",
            top: 15,
            height: 3,
            left: `${Math.min(bPos, wPos)}%`,
            width: `${Math.abs(wPos - bPos)}%`,
            background: "#1c1c1c",
          }}
        />
        <Point pos={bPos} label="usually" value={pctLabel(baseline)} below filled={false} />
        <Point pos={wPos} label="this read" value={pctLabel(windowShare)} filled />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 8,
          color: "#aaa",
          letterSpacing: "0.08em",
          marginTop: 1,
        }}
      >
        <span>RARE</span>
        <span>CONSTANT</span>
      </div>
    </div>
  );
}

function Point({
  pos,
  label,
  value,
  filled,
  below,
}: {
  pos: number;
  label: string;
  value: string;
  filled: boolean;
  below?: boolean;
}) {
  const align = pos > 70 ? "right" : pos < 30 ? "left" : "center";
  const tx = align === "right" ? "-100%" : align === "left" ? "0" : "-50%";
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: `${pos}%`,
          width: 8,
          height: 8,
          borderRadius: "50%",
          borderWidth: 1.5,
          borderStyle: "solid",
          borderColor: "#1c1c1c",
          background: filled ? "#1c1c1c" : "#fdfdfb",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${pos}%`,
          top: below ? 22 : -1,
          transform: `translateX(${tx})`,
          textAlign: align,
          whiteSpace: "nowrap",
          fontSize: 9,
          lineHeight: 1.2,
          fontWeight: filled ? 700 : 400,
        }}
      >
        {label} <span style={{ color: "#555", fontWeight: 400 }}>{value}</span>
      </div>
    </>
  );
}

// --- Cover art: iTunes (album/podcast) + Open Library (books). Public APIs,
// no secrets. Cached in localStorage so each cover only fetches once.
const COVER_CACHE = "lt-covers-v1";
function readCoverCache(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(COVER_CACHE) || "{}");
  } catch {
    return {};
  }
}
function writeCover(key: string, url: string | null) {
  try {
    const c = readCoverCache();
    c[key] = url || "none";
    localStorage.setItem(COVER_CACHE, JSON.stringify(c));
  } catch {
    /* ignore quota */
  }
}
interface CoverQuery {
  title?: string;
  author?: string;
  artist?: string;
  album?: string;
  show?: string;
}
async function lookupCover(kind: string, q: CoverQuery): Promise<string | null> {
  if (kind === "album") {
    const term = encodeURIComponent(`${q.artist} ${q.album}`);
    const r = await fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=1`);
    const d = await r.json();
    const a: string | undefined = d.results?.[0]?.artworkUrl100;
    return a ? a.replace("100x100bb", "300x300bb") : null;
  }
  if (kind === "podcast") {
    const term = encodeURIComponent(q.show || "");
    const r = await fetch(`https://itunes.apple.com/search?term=${term}&entity=podcast&limit=1`);
    const d = await r.json();
    const a: string | undefined = d.results?.[0]?.artworkUrl600 || d.results?.[0]?.artworkUrl100;
    return a ? a.replace("100x100bb", "300x300bb") : null;
  }
  const author = (q.author || "").split(",")[0].trim();
  const url =
    `https://openlibrary.org/search.json?title=${encodeURIComponent(q.title || "")}` +
    (author ? `&author=${encodeURIComponent(author)}` : "") +
    "&limit=1";
  const r = await fetch(url);
  const d = await r.json();
  const doc = d.docs?.[0];
  if (doc?.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
  if (doc?.isbn?.[0]) return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
  return null;
}

function Cover({ kind, query }: { kind: string; query: CoverQuery }) {
  const key = `${kind}:${JSON.stringify(query)}`;
  const [state, setState] = useState<{ key: string | null; src: string | null | undefined }>({
    key: null,
    src: undefined,
  });

  useEffect(() => {
    const cached = readCoverCache()[key];
    if (cached !== undefined) {
      setState({ key, src: cached === "none" ? null : cached });
      return;
    }
    setState({ key, src: undefined });
    let alive = true;
    lookupCover(kind, query)
      .then((url) => {
        if (alive) {
          setState({ key, src: url });
          writeCover(key, url);
        }
      })
      .catch(() => {
        if (alive) {
          setState({ key, src: null });
          writeCover(key, null);
        }
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const src = state.key === key ? state.src : undefined;

  const box: CSSProperties = {
    width: 46,
    height: 46,
    flexShrink: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };
  if (src) {
    return (
      <div style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.05)",
            animation: "ltCoverFade 0.5s ease both",
          }}
          onError={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) parent.style.display = "none";
          }}
        />
      </div>
    );
  }
  if (src === null) return null;
  return <div style={{ ...box, borderStyle: "dashed", borderColor: "#ccc" }} />;
}

// Build a resolve-anywhere link per medium: music → Spotify, books/essays →
// Goodreads, everything else → a web search. All are search links that resolve.
function recLink(rec: Rec): { href: string; label: string } {
  const q = encodeURIComponent(`${rec.title} ${rec.creator || ""}`.trim());
  switch (rec.medium) {
    case "music":
      return { href: `https://open.spotify.com/search/${q}`, label: "Play on Spotify" };
    case "book":
    case "essay":
      return { href: `https://www.goodreads.com/search?q=${q}`, label: "Find on Goodreads" };
    default:
      return { href: `https://www.google.com/search?q=${q}`, label: "Look it up" };
  }
}
const MEDIUM_TAG: Record<string, string> = {
  music: "MUSIC",
  book: "READ",
  essay: "READ",
  film: "WATCH",
  poem: "READ",
};

function Recommendation({ rec, first }: { rec: Rec; first: boolean }) {
  const { href, label } = recLink(rec);
  return (
    <div style={{ marginTop: first ? 4 : 12 }}>
      <div style={{ fontSize: 8.5, letterSpacing: "0.14em", color: "#aaa" }}>
        {MEDIUM_TAG[rec.medium] || "NEXT"}
      </div>
      <div style={{ fontWeight: 700, marginTop: 1 }}>
        {rec.title}
        {rec.creator ? ` — ${rec.creator}` : ""}
      </div>
      <div style={{ color: "#555", fontStyle: "italic" }}>{rec.why}</div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: 5,
          textDecoration: "none",
          fontFamily: MONO,
          fontSize: 9.5,
          letterSpacing: "0.08em",
          padding: "4px 10px",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#1c1c1c",
          borderRadius: 2,
          color: "#1c1c1c",
          background: "transparent",
        }}
      >
        {label} ↗
      </a>
    </div>
  );
}

function ReceiptBtn({
  children,
  onClick,
  active,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: MONO,
        fontSize: 9.5,
        letterSpacing: "0.08em",
        padding: "5px 10px",
        cursor: "pointer",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#1c1c1c",
        borderRadius: 2,
        background: active ? "#1c1c1c" : "transparent",
        color: active ? "#fdfdfb" : "#1c1c1c",
      }}
    >
      {children}
    </button>
  );
}
