const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function handleContact(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (!(request.headers.get("content-type") || "").includes("application/json"))
    return json({ error: "Send JSON." }, 415);

  const raw = await request.text();
  if (raw.length > 12000) return json({ error: "Message too long." }, 413);

  let data;
  try { data = JSON.parse(raw); } catch { return json({ error: "Invalid JSON." }, 400); }

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (clean(data.website, 200)) return json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 200);
  const company = clean(data.company, 150);
  const message = clean(data.message, 5000);

  if (!name) return json({ error: "Name is required." }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "Enter a valid email address." }, 400);
  if (message.length < 10) return json({ error: "Describe the system in at least a sentence." }, 400);

  await env.DB.prepare(
    "INSERT INTO leads (name, email, company, message, ip, user_agent) VALUES (?1, ?2, ?3, ?4, ?5, ?6)"
  )
    .bind(name, email, company || null, message,
      request.headers.get("cf-connecting-ip"),
      clean(request.headers.get("user-agent") || "", 300))
    .run();

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      try { return await handleContact(request, env); }
      catch (err) { console.error(err); return json({ error: "Submission failed. Try again." }, 500); }
    }
    if (url.pathname.startsWith("/api/")) return json({ error: "Not found." }, 404);
    return env.ASSETS.fetch(request);
  },
};
