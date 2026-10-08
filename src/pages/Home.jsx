import { useEffect, useState } from "react";
import "../home.css";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";
import { EMAIL } from "../brand.jsx";

const NAV = [
  ["#method", "Method"],
  ["/apps", "Work"],
  ["/museum", "Failure Museum"],
  ["/lab", "Lab"],
  ["/about", "About"],
];

const STEPS = [
  { label: "Payment accepted", time: "10:24:17", detail: "Processor returned 200. Charge ID logged." },
  { label: "Order created", time: "10:24:19", detail: "Order row written once. Totals match the cart." },
  { label: "Customer notified", time: "10:24:22", detail: "Confirmation email queued and delivered." },
  { label: "Duplicate charge detected", time: "10:24:23", bad: true, detail: "A retry after timeout charged the card a second time. The UI still shows one order." },
];

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", className: "ux-ico", "aria-hidden": true };
const QUESTIONS = [
  ["Data integrity", "Did every transaction actually reconcile?",
    <svg {...svg}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>],
  ["AI behavior", "Does it know when it doesn't know?",
    <svg {...svg}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>],
  ["Security", "What happens when someone deliberately abuses it?",
    <svg {...svg}><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>],
  ["Failure states", "What happens on retry, timeout, duplicate submission or partial completion?",
    <svg {...svg}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></svg>],
];

const METHOD = [
  ["Understand", "Map what the system claims to do."],
  ["Challenge", "Create adversarial tests and edge cases."],
  ["Measure", "Define expected outcomes and pass/fail criteria."],
  ["Trace", "Find where data or AI behavior diverges."],
  ["Retest", "Use AI to accelerate remediation, then test again."],
  ["Report", "Document findings, severity and remaining risk."],
];

const Lens = ({ scale }) => (
  <div className="ux-mag" style={{ zoom: scale }} aria-hidden="true">
    <div className="ux-lens"><div className="ux-glass"><span className="ux-q">?</span></div></div>
  </div>
);

const Word = ({ scale }) => (
  <div className="ux-word" style={{ zoom: scale }} aria-hidden="true">
    <span className="ux-un">UN</span><span className="ux-cv">CONVINCED</span>
  </div>
);

const NavLink = ({ to, ...p }) => (to.startsWith("#") ? <a href={to} {...p} /> : <Link to={to} {...p} />);

export default function Home() {
  const [open, setOpen] = useState(3);
  const featured = APPS[0];

  useEffect(() => {
    document.title = "Unconvinced. | AI assurance for business systems";
  }, []);

  return (
    <div className="ux">
      <header className="ux-head">
        <div className="ux-wrap ux-head-in">
          <Link to="/" className="ux-brand" aria-label="Unconvinced home">
            <Lens scale={0.24} />
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Word scale={0.19} />
              <span className="ux-brand-sub">AI ASSURANCE FOR BUSINESS SYSTEMS</span>
            </span>
          </Link>
          <nav className="ux-nav" aria-label="Primary">
            {NAV.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          </nav>
          <Link to="/lab" className="ux-btn ux-btn-blue">Explore the lab <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <main id="main">
        <section className="ux-iron ux-hero">
          <div className="ux-wrap ux-hero-in">
            <div className="ux-hero-copy">
              <h1 className="ux-display">Your company built it with AI.<br /><span>But can you trust it?</span></h1>
              <div className="ux-hero-sub">
                <strong style={{ color: "#fff" }}>AI assurance for business systems.</strong>
                <span>Investigate the behavior. Follow the data. Test the result.</span>
              </div>
              <div className="ux-row">
                <Link to="/museum" className="ux-btn ux-btn-cream">Explore the evidence <span aria-hidden="true">→</span></Link>
                <Link to="/about" className="ux-btn ux-btn-ghost">Meet Treena</Link>
              </div>
            </div>
            <div className="ux-hero-art">
              <img src="/images/hal.png" alt="Hal, the Unconvinced robot investigator, waving" width="594" height="566" />
              <div className="ux-sig ux-slab"><b>Hal</b><span>Special Investigator</span></div>
            </div>
          </div>
        </section>

        <p className="ux-strip ux-slab" style={{ margin: 0 }}>Every finding has a source. Every test has an outcome.</p>

        <section className="ux-paper">
          <div className="ux-wrap ux-sec ux-split">
            <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 className="ux-display" style={{ fontSize: 48 }}>Looks right.<br />Until you check.</h2>
              <p className="ux-lede">A system can look perfect while quietly producing the wrong result.</p>
              <div className="ux-card ux-demo">
                <div className="ux-demo-head"><strong>Interactive demo</strong><span>Test a transaction flow</span></div>
                {STEPS.map((s, i) => (
                  <button key={s.label} type="button" className={`ux-step${s.bad ? " bad" : ""}`} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                    <span className="ux-step-row">
                      <span className="ux-dot" aria-hidden="true">{s.bad ? "!" : "✓"}</span>
                      <span className="ux-step-label">{s.label}</span>
                      <span className="ux-time">{s.time}</span>
                      <span aria-hidden="true" style={{ color: "var(--ux-muted)" }}>{open === i ? "▴" : "▾"}</span>
                    </span>
                    {open === i && <span className="ux-step-detail">{s.detail}</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="ux-grid" style={{ flex: "1 1 520px" }}>
              {QUESTIONS.map(([title, body, icon]) => (
                <div key={title} className="ux-card">
                  <div className="ux-card-top">{icon}<h3>{title}</h3></div>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="ux-iron">
          <div className="ux-wrap ux-sec" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 className="ux-display" style={{ fontSize: 44, color: "#f6ead0" }}>The Unconvinced Method</h2>
              <p style={{ margin: 0, fontSize: 19, color: "#e2d6bd" }}>We don't trust confidence. We collect evidence.</p>
            </div>
            <ol className="ux-method">
              {METHOD.map(([t, d], i) => (
                <li key={t}>
                  <span className="ux-num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="work" className="ux-paper">
          <div className="ux-wrap ux-sec ux-split" style={{ gap: 40, alignItems: "center" }}>
            <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <div className="ux-kicker">FEATURED WORK</div>
              <h2 className="ux-display" style={{ fontSize: 44 }}>{featured.name}</h2>
              <p className="ux-lede">{featured.summary} I built AI into it to prove my own system wrong.</p>
              <Link to={`/apps/${featured.slug}`} className="ux-btn ux-btn-blue">Explore this project <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ux-card" style={{ flex: "1 1 560px", minWidth: 0, gap: 16 }}>
              <div className="ux-tabs">
                <div style={{ display: "flex", gap: 22 }}><b>Disclosures</b><span>News</span><span>Evidence</span></div>
                <span>Sources &amp; freshness →</span>
              </div>
              <div className="ux-row" style={{ gap: 10 }}>
                <label style={{ flex: "1 1 220px", display: "flex" }}>
                  <span className="ux-sr">Search disclosures</span>
                  <input type="search" className="ux-field" placeholder="Search disclosures…" style={{ flex: 1 }} />
                </label>
                <select className="ux-field" aria-label="Year"><option>All years</option></select>
                <select className="ux-field" aria-label="Type"><option>All types</option></select>
              </div>
              <div className="ux-table">
                <div className="ux-table-h"><span>Date</span><span>Politician</span><span>Asset</span><span>Transaction</span><span>Source</span></div>
                <div className="ux-table-empty"><strong>Source connection pending</strong><span>No live records yet. This is a project under active development.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="ux-trio">
          <div className="ux-wrap ux-trio-in">
            <div>
              <h3>The Failure Museum</h3>
              <p>Real examples. Real consequences. What actually goes wrong.</p>
              <Link to="/museum" className="ux-btn ux-btn-line">Open the cases <span aria-hidden="true">→</span></Link>
            </div>
            <div>
              <h3>Unconvinced Lab</h3>
              <p>Ongoing investigations and technical write-ups.</p>
              <Link to="/lab" className="ux-btn ux-btn-line">Visit the lab <span aria-hidden="true">→</span></Link>
            </div>
            <div>
              <h3>About Treena</h3>
              <p>I investigate where business systems stop behaving as promised.</p>
              <Link to="/about" className="ux-btn ux-btn-line">Meet the founder <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="ux-iron ux-foot">
        <div className="ux-wrap ux-foot-in">
          <h2 className="ux-display" style={{ fontSize: 36, color: "#f6ead0" }}>Think it works? Show the evidence.</h2>
          <Link to="/contact" className="ux-btn ux-btn-cream">Get in touch <span aria-hidden="true">→</span></Link>
          <hr />
          <Word scale={0.24} />
          <span className="ux-slab" style={{ fontSize: 16, letterSpacing: 1, color: "#e2d6bd" }}>Investigations that matter.</span>
          <nav className="ux-foot-nav" aria-label="Footer">
            {NAV.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
