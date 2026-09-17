import { env } from "cloudflare:workers";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://fgdfbfb.github.io",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, init: ResponseInit = {}) =>
  Response.json(body, {
    ...init,
    headers: { ...corsHeaders, ...init.headers },
  });

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const b = (await request.json()) as Record<string, string>;
    if (b.website) return json({ ok: true });
    const allowed = new Set(["parent", "mentor", "community", "volunteer", "donate"]);
    if (!b.name?.trim() || !b.email?.includes("@") || !b.location?.trim() || !allowed.has(b.pathway)) {
      return json({ error: "Missing fields" }, { status: 400 });
    }
    if (!env.DB) return json({ error: "Database unavailable" }, { status: 503 });
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS interests (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT NOT NULL,name TEXT NOT NULL,location TEXT NOT NULL,province TEXT NOT NULL,pathway TEXT NOT NULL,details TEXT NOT NULL,permission INTEGER NOT NULL DEFAULT 1,source TEXT NOT NULL DEFAULT 'website',follow_up_status TEXT NOT NULL DEFAULT 'new',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(email,pathway))`).run();
    await env.DB.prepare(`INSERT INTO interests (email,name,location,province,pathway,details) VALUES (?,?,?,?,?,?) ON CONFLICT(email,pathway) DO UPDATE SET name=excluded.name,location=excluded.location,province=excluded.province,details=excluded.details`).bind(b.email.trim().toLowerCase(), b.name.trim(), b.location.trim(), b.province || "", b.pathway, b.details?.trim() || "").run();
    return json({ ok: true });
  } catch {
    return json({ error: "Unable to save" }, { status: 500 });
  }
}
