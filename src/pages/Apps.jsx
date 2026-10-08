import { Layout } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";

// Index-style list: one ruled row per app, not a card grid.
export default function Apps() {
  return (
    <Layout title="Apps">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-24">
        <h1 className="uc-display uc-caps" style={{ fontSize: "var(--text-display-s)" }}>
          Built with AI. Then tested like it matters.
        </h1>
        <ul className="uc-sheet mt-10">
          {APPS.map((a) => (
            <li key={a.slug}>
              <Link to={`/apps/${a.slug}`} className="group grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-2 md:gap-8 py-6 md:items-baseline">
                <span className="uc-display text-3xl sm:text-4xl group-hover:text-[var(--color-teal-2)]">{a.name}</span>
                <span className="uc-muted">{a.summary}</span>
                <span className="flex flex-wrap gap-2">
                  <span className="uc-stamp" style={{ color: "var(--color-ink-2)" }}>{a.platform}</span>
                  <span className="uc-stamp" style={{ color: "var(--color-rust)" }}>{a.status}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm uc-muted">More projects are added here once they're ready to show.</p>
      </section>
    </Layout>
  );
}
