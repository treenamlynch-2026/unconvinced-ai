import { marked } from "marked";
import { getDoc, listDocs, SECTIONS } from "./content.js";
import { Layout } from "./brand.jsx";
import { Link } from "./router.jsx";

const Shell = ({ title, children }) => (
  <Layout title={title}>
    <div className="max-w-3xl mx-auto px-4 sm:px-5 py-12">{children}</div>
  </Layout>
);

const H1 = ({ children }) => (
  <h1 className="uc-display text-5xl">{children}</h1>
);

export default function DocPage({ section, slug }) {
  const label = SECTIONS[section];

  if (!slug) {
    const items = listDocs(section);
    return (
      <Shell title={label}>
        <H1>{label}</H1>
        {items.length === 0 && <p className="mt-6">No published write-ups yet. <Link className="underline" to="/">Back to home</Link></p>}
        <ul className="mt-8 space-y-6">
          {items.map((d) => (
            <li key={d.slug}>
              <Link to={`/${section}/${d.slug}`} className="text-xl font-bold underline">{d.title}</Link>
              {d.summary && <p className="mt-1" style={{ color: "var(--muted)" }}>{d.summary}</p>}
            </li>
          ))}
        </ul>
      </Shell>
    );
  }

  const doc = getDoc(section, slug);
  return (
    <Shell title={doc ? doc.title : label}>
      <Link to={`/${section}`} className="text-sm font-bold" style={{ color: "var(--teal-2)" }}>{label}</Link>
      {doc ? (
        <article className="mt-2">
          <H1>{doc.title}</H1>
          {doc.date && <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>{doc.date}</p>}
          <div className="prose-uc mt-6" dangerouslySetInnerHTML={{ __html: marked.parse(doc.body) }} />
        </article>
      ) : (
        <>
          <H1>Write-up in progress</H1>
          <p className="mt-4">This investigation isn't published yet. <Link className="underline" to={`/${section}`}>See what's available</Link>.</p>
        </>
      )}
    </Shell>
  );
}
