import { Layout } from "../brand.jsx";
import { APPS, PROJECTS } from "../apps.js";

export default function Apps() {
  return (
    <Layout title="Apps">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-24">
        <p className="uc-kicker">Shipped</p>
        <h1 className="uc-display uc-caps mt-2" style={{ fontSize: "var(--text-display-s)" }}>
          Built with AI. Tested like it matters.
        </h1>
        <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {APPS.map((a) => (
            <a key={a.slug} href={a.page} className="uc-card">
              <div className="flex flex-wrap gap-2">
                <span className="uc-stamp" style={{ color: "var(--color-steel)" }}>{a.platform}</span>
                <span className="uc-stamp" style={{ color: "var(--color-rust-hi)" }}>{a.tag}</span>
              </div>
              <h2 className="uc-display text-3xl">{a.name}</h2>
              <p className="uc-muted">{a.summary}</p>
              <span className="uc-link mt-auto">Details <span aria-hidden="true">→</span></span>
            </a>
          ))}
          {PROJECTS.map((p) => (
            <div key={p.name} className="uc-card">
              <span className="uc-stamp self-start" style={{ color: "var(--color-cream)" }}>{p.tag}</span>
              <h2 className="uc-display text-3xl">{p.name}</h2>
              <p className="uc-muted">{p.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
