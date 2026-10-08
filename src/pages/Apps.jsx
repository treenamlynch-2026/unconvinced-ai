import { Layout, Eyebrow } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";

export default function Apps() {
  return (
    <Layout title="Apps">
      <section className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
        <Eyebrow>Apps</Eyebrow>
        <h1 className="uc-display text-5xl mt-2">Built with AI. Then tested like it matters.</h1>
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {APPS.map((a) => (
            <li key={a.slug} className="uc-card p-6 flex flex-col">
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="uc-stamp" style={{ color: "var(--steel)" }}>{a.platform}</span>
                <span className="uc-stamp" style={{ color: "var(--rust)" }}>{a.status}</span>
              </div>
              <h2 className="uc-display text-3xl mt-4">{a.name}</h2>
              <p className="mt-2 flex-1" style={{ color: "var(--muted)" }}>{a.summary}</p>
              <Link to={`/apps/${a.slug}`} className="uc-focus mt-5 font-bold" style={{ color: "var(--teal-2)" }}>
                Details <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>More projects are added here once they're ready to show.</p>
      </section>
    </Layout>
  );
}
