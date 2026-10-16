import { Layout, Button } from "../brand.jsx";
import { Link } from "../router.jsx";
import { getApp } from "../apps.js";

// Fallback only: each app's full page is static in public/apps/<slug>/.
export default function AppDetail({ slug }) {
  const app = getApp(slug);
  return (
    <Layout title={app ? app.name : "App not found"}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-24">
        <Link to="/apps" className="uc-link text-sm"><span aria-hidden="true">←</span> All apps</Link>
        {app ? (
          <>
            <h1 className="uc-display uc-caps mt-3" style={{ fontSize: "var(--text-display-s)" }}>{app.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="uc-stamp" style={{ color: "var(--color-steel)" }}>{app.platform}</span>
              <span className="uc-stamp" style={{ color: "var(--color-rust-hi)" }}>{app.tag}</span>
            </div>
            <p className="mt-6 text-xl" style={{ color: "var(--color-text-2)" }}>{app.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {app.store && <Button href={app.store} variant="rust">View on the App Store</Button>}
              <Button href={app.page} variant="ghost">Full details</Button>
            </div>
          </>
        ) : (
          <h1 className="uc-display text-5xl mt-3">App not found</h1>
        )}
      </article>
    </Layout>
  );
}
