import { marked } from "marked";
import { getDoc, listDocs, SECTIONS } from "./content.js";

const Shell = ({ children }) => (
  <div style={{ background: "#F6F4EF", color: "#16222B", fontFamily: "'Barlow', system-ui, sans-serif", minHeight: "100vh" }}>
    <header style={{ background: "#fff", borderBottom: "1px solid #DDE2E5" }}>
      <div className="max-w-3xl mx-auto px-5 py-4">
        <a href="/" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.75rem", color: "#0B1F2A" }}>
          UNCONVINCED<span style={{ color: "#27C4D8" }}>.AI</span>
        </a>
      </div>
    </header>
    <main className="max-w-3xl mx-auto px-5 py-12">{children}</main>
  </div>
);

const H1 = ({ children }) => (
  <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "2.75rem", lineHeight: 1.05, color: "#0B1F2A" }}>{children}</h1>
);

export default function DocPage({ section, slug }) {
  const label = SECTIONS[section];

  if (!slug) {
    const items = listDocs(section);
    return (
      <Shell>
        <H1>{label}</H1>
        {items.length === 0 && <p className="mt-6">No published write-ups yet. <a className="underline" href="/">Back to home</a></p>}
        <ul className="mt-8 space-y-6">
          {items.map((d) => (
            <li key={d.slug}>
              <a href={`/${section}/${d.slug}`} className="text-xl font-bold underline">{d.title}</a>
              {d.summary && <p className="mt-1" style={{ color: "#55636D" }}>{d.summary}</p>}
            </li>
          ))}
        </ul>
      </Shell>
    );
  }

  const doc = getDoc(section, slug);
  return (
    <Shell>
      <a href={`/${section}`} className="text-sm font-bold" style={{ color: "#0F5A6A" }}>{label}</a>
      {doc ? (
        <article className="mt-2">
          <H1>{doc.title}</H1>
          {doc.date && <p className="mt-2 text-sm" style={{ color: "#55636D" }}>{doc.date}</p>}
          <div className="prose-uc mt-6" dangerouslySetInnerHTML={{ __html: marked.parse(doc.body) }} />
        </article>
      ) : (
        <>
          <H1>Write-up in progress</H1>
          <p className="mt-4">This investigation isn't published yet. <a className="underline" href={`/${section}`}>See what's available</a>.</p>
        </>
      )}
    </Shell>
  );
}
