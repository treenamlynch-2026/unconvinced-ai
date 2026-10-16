import { useEffect, useState } from "react";
import { Layout, LogoLockup, Button } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";
import Resume from "../Resume.jsx";

// Layout = Iris's page mockup, section for section. Copy is placeholder until real copy is set.
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

// Small app icon; placeholder tile until the app has real store art.
const AppIcon = ({ app, size = 48 }) =>
  app.icon ? (
    <img src={app.icon} alt="" width={size} height={size} className="flex-none" style={{ width: size, height: size, borderRadius: size * 0.225, boxShadow: "0 2px 8px rgba(0,0,0,.5)" }} />
  ) : (
    <span className="flex-none flex items-center justify-center uc-display" aria-hidden="true"
      style={{ width: size, height: size, borderRadius: size * 0.225, fontSize: size * 0.42, background: "linear-gradient(160deg, var(--color-steel-2), var(--color-steel-3))", border: "2px solid var(--color-rust-lo)" }}>
      {app.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
    </span>
  );

// Left: big phone view of the selected app. Right: the four apps as small cards.
function AppShowcase() {
  const [sel, setSel] = useState(0);
  const [shot, setShot] = useState(0);
  const app = APPS[sel];
  useEffect(() => {
    if (app.shots.length < 2) return;
    const t = setInterval(() => setShot((n) => (n + 1) % app.shots.length), 3500);
    return () => clearInterval(t);
  }, [sel, app.shots.length]);
  const pick = (i) => { setSel(i); setShot(0); };

  return (
    <section id="work" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-2 gap-8 items-center scroll-mt-20">
      {/* big display */}
      <div className="uc-card items-center gap-6 sm:gap-8 relative" style={{ padding: "1.5rem", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" className="uc-next" onClick={() => pick((sel + 1) % APPS.length)} aria-label={`Next app: ${APPS[(sel + 1) % APPS.length].name}`}>
          <span aria-hidden="true">&raquo;</span>
        </button>
        <div className="uc-phone">
          {app.shots.length ? (
            app.shots.map((src, i) => (
              <img key={src} src={src} alt={`${app.name} screenshot ${i + 1}`} loading={i ? "lazy" : "eager"} style={{ opacity: i === shot ? 1 : 0 }} />
            ))
          ) : (
            <span className="uc-phone-empty"><AppIcon app={app} size={72} /><span className="uc-slab mt-3">Coming soon</span></span>
          )}
        </div>
        <div className="flex flex-col gap-3 items-start" style={{ flex: "1 1 200px", minWidth: 0 }}>
          <AppIcon app={app} size={64} />
          <h2 className="uc-display" style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)" }}>{app.name}</h2>
          <div className="flex flex-wrap gap-2">
            <span className="uc-stamp" style={{ color: "var(--color-steel)" }}>{app.platform}</span>
            <span className="uc-stamp" style={{ color: app.live ? "var(--color-rust-hi)" : "var(--color-muted)" }}>{app.live ? "On the App Store" : "In review"}</span>
          </div>
          <p style={{ color: "var(--color-text-2)" }}>{app.summary}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {app.store && <Button href={app.store} variant="rust">Get it free <span aria-hidden="true">→</span></Button>}
            <Button href={app.page} variant="ghost">Details</Button>
          </div>
          {app.shots.length > 1 && (
            <div className="flex gap-2 pt-1" role="group" aria-label="Screenshots">
              {app.shots.map((_, i) => (
                <button key={i} type="button" onClick={() => setShot(i)} aria-label={`Screenshot ${i + 1}`} aria-pressed={i === shot}
                  className="w-2.5 h-2.5 rounded-full" style={{ background: i === shot ? "var(--color-rust)" : "var(--color-line-2)" }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* four app cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {APPS.map((a, i) => (
          <button key={a.slug} type="button" onClick={() => pick(i)} aria-pressed={i === sel}
            className="uc-card uc-app-card text-left cursor-pointer" style={i === sel ? { borderColor: "var(--color-rust)", boxShadow: "inset 0 0 0 1px var(--color-rust)" } : undefined}>
            <span className="flex items-center gap-3">
              <AppIcon app={a} size={40} />
              <span className="uc-ui font-bold text-lg leading-tight">{a.name}</span>
            </span>
            <span className="text-[15px]" style={{ color: "var(--color-text-2)" }}>{a.summary}</span>
            <span className="uc-ui text-xs font-bold tracking-wider uppercase mt-auto" style={{ color: a.live ? "var(--color-rust-hi)" : "var(--color-muted)" }}>
              {a.live ? "On the App Store" : "In review"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

const METHOD = ["Understand", "Challenge", "Measure", "Trace", "Retest", "Report"];

export default function Home() {
  return (
    <Layout>
      {/* 1. Hero */}
      <section className="uc-iron">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <h1 className="uc-display" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
              Build it? Poke it? Support it?<br />
              <span style={{ color: "var(--color-steel)" }}>I can do that!</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-2)" }}>{LOREM}</p>
            <div className="flex flex-wrap gap-3">
              <Button href="#work" variant="cream">Lorem ipsum <span aria-hidden="true">→</span></Button>
              <Button to="/about" variant="ghost">Meet Treena</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center"><LogoLockup plate="Prove it." /></div>
        </div>
      </section>

      {/* 2. Strip */}
      <div className="uc-plate-band">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center uc-slab text-lg sm:text-2xl" style={{ color: "var(--color-cream)" }}>{LOREM}</p>
      </div>

      {/* 3. Apps */}
      <AppShowcase />

      {/* 4. Method */}
      <section id="method" className="uc-iron-2 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="uc-display" style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)" }}>The Unconvinced. Method</h2>
          <p className="mt-2 text-lg" style={{ color: "var(--color-text-2)" }}>{LOREM}</p>
          <ol className="mt-8 grid gap-7" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {METHOD.map((t, i) => (
              <li key={t} className="flex flex-col gap-2">
                <span className="uc-step">{String(i + 1).padStart(2, "0")}</span>
                <strong className="uc-ui text-lg">{t}</strong>
                <span className="text-[15px] uc-muted">{LOREM}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Resume */}
      <Resume />

      {/* 6. Museum / Lab / About + Hal merch */}
      <section className="uc-iron-2" style={{ borderTop: "1px solid var(--color-line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            ["/museum", "The Failure Museum"],
            ["/lab", "Unconvinced. Lab"],
            ["/about", "About Treena"],
            [null, "Hal merch"],
          ].map(([to, t]) => (
            <div key={t} className="flex flex-col gap-2 items-start">
              <h3 className="uc-ui font-bold text-xl">{t}</h3>
              <p className="uc-muted">{LOREM}</p>
              {to ? <Link to={to} className="uc-btn uc-btn-ghost mt-1">Open <span aria-hidden="true">→</span></Link>
                  : <span className="uc-btn uc-btn-ghost mt-1" aria-disabled="true">Coming soon</span>}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
