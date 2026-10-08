import { Layout, Button } from "../brand.jsx";
import { Link } from "../router.jsx";
import { getApp } from "../apps.js";
import { getDoc } from "../content.js";

// Reusable template for every entry in src/apps.js.
export default function AppDetail({ slug }) {
  const app = getApp(slug);
  if (!app)
    return (
      <Layout title="App not found">
        <section className="max-w-3xl mx-auto px-4 sm:px-5 pt-12 pb-20">
          <h1 className="uc-display text-5xl">App not found</h1>
          <p className="mt-4"><Link to="/apps" className="underline">See all apps</Link></p>
        </section>
      </Layout>
    );

  const caseStudy = app.caseStudy && getDoc("cases", app.caseStudy);
  const hasAccess = app.play || app.links.length > 0;

  return (
    <Layout title={app.name}>
      <article className="max-w-3xl mx-auto px-4 sm:px-5 pt-12 pb-20">
        <Link to="/apps" className="uc-link text-sm">
          <span aria-hidden="true">←</span> All apps
        </Link>
        <h1 className="uc-display uc-caps mt-3" style={{ fontSize: "var(--text-display-s)" }}>{app.name}</h1>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="uc-stamp" style={{ color: "var(--color-ink-2)" }}>{app.platform}</span>
          <span className="uc-stamp" style={{ color: "var(--color-rust)" }}>{app.status}</span>
        </div>
        <p className="mt-6 text-xl">{app.summary}</p>

        

        <section className="mt-12 pt-6" style={{ borderTop: "2px solid var(--color-ink)" }}>
          <h2 className="uc-display text-2xl">About the app</h2>
          <div className="mt-3 space-y-3 text-lg leading-relaxed">
            {app.about.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="uc-display text-2xl">Availability</h2>
          {hasAccess ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {app.play && <Button href={app.play}>Play</Button>}
              {app.links.map((l) => <Button key={l.href} href={l.href} variant="ghost">{l.label}</Button>)}
            </div>
          ) : (
            <p className="mt-3" style={{ color: "var(--color-muted)" }}>
              Not available to download yet. A link will appear here once it is.
            </p>
          )}
        </section>

        {caseStudy && (
          <section className="mt-10">
            <h2 className="uc-display text-2xl">Case study</h2>
            <p className="mt-3"><Link to={`/cases/${app.caseStudy}`} className="underline font-bold">{caseStudy.title}</Link></p>
          </section>
        )}
      </article>
    </Layout>
  );
}
