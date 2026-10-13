// Gives every SPA route a real file so GitHub Pages returns 200 (not the 404.html fallback).
// Never overwrites existing files (e.g. static pages in public/apps/). Also rebuilds sitemap.xml.
import fs from "node:fs";
import path from "node:path";

const BASE = "https://unconvinced.ai";
const dist = "dist";
const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const routes = new Set(["/apps", "/about", "/contact"]);

for (const section of fs.readdirSync("content")) {
  const dir = path.join("content", section);
  if (!fs.statSync(dir).isDirectory()) continue;
  routes.add(`/${section}`);
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md") || f.startsWith("_")) continue;
    const draft = /^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(dir, f), "utf8").split(/^---\s*$/m)[1] || "");
    if (!draft) routes.add(`/${section}/${f.replace(/\.md$/, "")}`);
  }
}
const appsSrc = fs.readFileSync("src/apps.js", "utf8");
for (const [, slug] of appsSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) routes.add(`/apps/${slug}`);
for (const d of fs.readdirSync(path.join(dist, "apps"), { withFileTypes: true }))
  if (d.isDirectory()) routes.add(`/apps/${d.name}`);

for (const r of routes) {
  const file = path.join(dist, r, "index.html");
  if (fs.existsSync(file)) continue;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, shell);
  console.log("route:", r);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ["/", ...[...routes].sort()].map((r) => `${BASE}${r === "/" ? "/" : r + "/"}`);
fs.writeFileSync(path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") + "\n</urlset>\n");
