// Loads /content/<section>/<slug>.md at build time. Frontmatter: simple "key: value" lines.
const files = import.meta.glob("/content/**/*.md", { query: "?raw", import: "default", eager: true });

export const SECTIONS = { cases: "Case studies", museum: "Failure Museum", lab: "Unconvinced Lab" };

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parse(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, body: m[2] };
}

const docs = Object.entries(files).map(([path, raw]) => {
  const [, section, file] = path.match(/^\/content\/([^/]+)\/(.+)\.md$/);
  const { meta, body } = parse(raw);
  return { section, slug: file, title: meta.title || file, summary: meta.summary || "", date: meta.date || "", draft: meta.draft === "true", body };
});

export const getDoc = (section, slug) => docs.find((d) => d.section === section && d.slug === slug && !d.draft);
export const listDocs = (section) =>
  docs.filter((d) => d.section === section && !d.draft).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
