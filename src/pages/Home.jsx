import { useState } from "react";
import { Layout, LogoLockup, Button } from "../brand.jsx";
import { Link } from "../router.jsx";

// Layout = Iris's page mockup, section for section. Copy is placeholder until real copy is set.
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const Ico = ({ children }) => (
  <svg className="uc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const CARDS = [
  ["Data integrity", <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>],
  ["AI behavior", <><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>],
  ["Security", <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>],
  ["Failure states", <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>],
];

const STEPS = [
  ["Step one", "10:24:17"],
  ["Step two", "10:24:19"],
  ["Step three", "10:24:22"],
  ["Step four", "10:24:23", true],
];

const METHOD = ["Understand", "Challenge", "Measure", "Trace", "Retest", "Report"];

function Demo() {
  const [open, setOpen] = useState(3);
  return (
    <div className="uc-card" style={{ padding: 0, gap: 0, overflow: "hidden" }}>
      <div className="flex justify-between items-center px-4 py-3 text-sm uc-ui" style={{ borderBottom: "1px solid var(--color-line)" }}>
        <strong>Interactive demo</strong><span className="uc-muted">Lorem ipsum</span>
      </div>
      <div className="uc-log">
        {STEPS.map(([label, time, bad], i) => (
          <button key={label} type="button" className={bad ? "bad" : ""} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="flex items-center gap-3 text-[15px]">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-none" style={{ background: bad ? "var(--color-rust)" : "var(--color-steel-2)" }}>{bad ? "!" : "✓"}</span>
              <span className="flex-1" style={{ fontWeight: bad ? 700 : 400 }}>{label}</span>
              <span className="font-mono text-[13px] uc-muted">{time}</span>
              <span aria-hidden="true" className="uc-muted">{open === i ? "▴" : "▾"}</span>
            </span>
            {open === i && <span className="pl-9 text-sm" style={{ color: "var(--color-text-2)" }}>{LOREM}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

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

      {/* 3. Looks right + demo | four cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <h2 className="uc-display" style={{ fontSize: "clamp(2.25rem, 5vw, 3rem)" }}>Looks right.<br />Until you check.</h2>
          <p className="text-lg" style={{ color: "var(--color-text-2)" }}>{LOREM}</p>
          <Demo />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map(([t, icon]) => (
            <div key={t} className="uc-card">
              <div className="flex items-center gap-3"><Ico>{icon}</Ico><h3 className="uc-ui font-bold text-xl">{t}</h3></div>
              <p style={{ color: "var(--color-text-2)" }}>{LOREM}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* 5. Featured work */}
      <section id="work" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-center scroll-mt-20">
        <div className="flex flex-col gap-4 items-start">
          <p className="uc-kicker">Featured work</p>
          <h2 className="uc-display" style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)" }}>Congress Trade Detective</h2>
          <p className="text-lg" style={{ color: "var(--color-text-2)" }}>{LOREM}</p>
          <Button href="/apps/congress-trade-detective/" variant="rust">Explore this project <span aria-hidden="true">→</span></Button>
        </div>
        <div className="uc-card">
          <div className="flex flex-wrap justify-between gap-3 text-sm uc-ui" style={{ borderBottom: "1px solid var(--color-line)" }}>
            <div className="flex gap-5">
              <span className="font-bold pb-2" style={{ borderBottom: "3px solid var(--color-steel)" }}>Disclosures</span>
              <span className="uc-muted">News</span><span className="uc-muted">Evidence</span>
            </div>
          </div>
          <div className="overflow-x-auto rounded" style={{ border: "1px solid var(--color-line)" }}>
            <div className="grid grid-cols-5 gap-2 px-3 py-2 text-[13px] font-semibold uc-ui min-w-[480px]" style={{ background: "var(--color-iron-3)" }}>
              <span>Date</span><span>Politician</span><span>Asset</span><span>Transaction</span><span>Source</span>
            </div>
            <p className="px-3 py-8 text-center text-sm uc-muted min-w-[480px]">{LOREM}</p>
          </div>
        </div>
      </section>

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
