import { useState } from "react";
import { Layout, LogoLockup, Button, HAL_URL } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS, PROJECTS } from "../apps.js";

const Icon = ({ d }) => (
  <svg className="uc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const SERVICES = [
  {
    t: "Build it.",
    d: "Full-stack apps and business systems: C#, SQL, JavaScript, React, NetSuite / SuiteScript. AI does the typing. I own the architecture and the result.",
    i: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" /></>,
  },
  {
    t: "Poke it.",
    d: "You built it with AI. I try to break it: data integrity, hallucinations, security, retries, timeouts, duplicate charges. You get findings with evidence, not opinions.",
    i: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /><path d="M11 8.5v3" /><path d="M11 13.6v.1" /></>,
  },
  {
    t: "Support it.",
    d: "Keep production systems honest: integrations, payment reconciliation, the failure nobody can explain at 2 a.m.",
    i: <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  },
];

const QUESTIONS = [
  ["Data integrity", "Did every transaction actually reconcile?"],
  ["AI behavior", "Does it know when it doesn't know?"],
  ["Security", "What happens when someone deliberately abuses it?"],
  ["Failure states", "What happens on retry, timeout, duplicate submission or partial completion?"],
];

const METHOD = [
  ["Understand", "Map what the system claims to do."],
  ["Attack", "Write adversarial, edge-case and failure-state tests."],
  ["Measure", "Define expected outcomes and pass/fail criteria."],
  ["Trace", "Find where the data or the AI diverges."],
  ["Fix + retest", "Use AI to speed up the fix, then attack it again."],
  ["Report", "Findings, severity and remaining risk, in plain English."],
];

const LOG = [
  { label: "Payment accepted", time: "10:24:17", detail: "Processor returned 200. Charge ID logged." },
  { label: "Order created", time: "10:24:19", detail: "Order row written once. Totals match the cart." },
  { label: "Customer notified", time: "10:24:22", detail: "Confirmation email queued and delivered." },
  { label: "Duplicate charge detected", time: "10:24:23", bad: true, detail: "A retry after a timeout charged the card a second time. The UI still shows one order. Every test passed." },
];

function Demo() {
  const [open, setOpen] = useState(3);
  return (
    <div className="uc-card" style={{ padding: 0, gap: 0, overflow: "hidden" }}>
      <div className="flex justify-between items-center px-4 py-3 text-sm uc-ui" style={{ borderBottom: "1px solid var(--color-line)" }}>
        <strong>Test log</strong><span className="uc-muted">Checkout flow · tap a step</span>
      </div>
      <div className="uc-log">
        {LOG.map((s, i) => (
          <button key={s.label} type="button" className={s.bad ? "bad" : ""} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="flex items-center gap-3 text-[15px]">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-none" style={{ background: s.bad ? "var(--color-rust)" : "var(--color-steel-2)" }}>
                {s.bad ? "!" : "✓"}
              </span>
              <span className="flex-1" style={{ fontWeight: s.bad ? 700 : 400 }}>{s.label}</span>
              <span className="font-mono text-[13px] uc-muted">{s.time}</span>
              <span aria-hidden="true" className="uc-muted">{open === i ? "▴" : "▾"}</span>
            </span>
            {open === i && <span className="pl-9 text-sm leading-relaxed" style={{ color: "var(--color-text-2)" }}>{s.detail}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="uc-iron overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-12 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <p className="uc-kicker">Treena Lynch · Independent developer</p>
            <h1 className="uc-display uc-caps" style={{ fontSize: "var(--text-display)" }}>
              Build it?<br />
              <span style={{ color: "var(--color-steel)" }}>Poke it?</span><br />
              Support it?
            </h1>
            <p className="uc-slab text-2xl sm:text-3xl" style={{ color: "var(--color-rust-hi)" }}>I can do that.</p>
            <p className="text-lg max-w-xl" style={{ color: "var(--color-text-2)" }}>
              20+ years building production systems: payments, ticketing, back ends that have to balance to the penny.
              Now I build with AI, then try to break what it built before your customers do.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button to="/contact" variant="rust">Hire me <span aria-hidden="true">→</span></Button>
              <Button href="#work" variant="ghost">See the work</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <LogoLockup plate="Prove it." />
          </div>
        </div>
      </section>

      {/* Plate strip */}
      <div className="uc-plate-band">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center uc-slab text-lg sm:text-2xl" style={{ color: "var(--color-cream)" }}>
          It passed every test it wrote for itself. That's the problem.
        </p>
      </div>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-20">
        <p className="uc-kicker">What I do</p>
        <h2 className="uc-display uc-caps mt-2" style={{ fontSize: "var(--text-display-s)" }}>Three jobs. One person.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.t} className="uc-card">
              <Icon d={s.i} />
              <h3 className="uc-display text-3xl">{s.t}</h3>
              <p style={{ color: "var(--color-text-2)" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Poke it: the proof */}
      <section className="uc-iron-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5">
            <p className="uc-kicker">Poke it</p>
            <h2 className="uc-display uc-caps" style={{ fontSize: "var(--text-display-s)" }}>Looks right.<br />Until you check.</h2>
            <p className="text-lg" style={{ color: "var(--color-text-2)" }}>
              The dangerous failures aren't crashes. A system can look perfect while it quietly produces the wrong result.
            </p>
            <Demo />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {QUESTIONS.map(([t, q]) => (
              <div key={t} className="uc-card">
                <span className="uc-stamp self-start" style={{ color: "var(--color-steel)" }}>{t}</span>
                <p className="uc-slab text-xl leading-snug">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <p className="uc-kicker">The method</p>
        <h2 className="uc-display uc-caps mt-2" style={{ fontSize: "var(--text-display-s)" }}>I don't trust confidence. I collect evidence.</h2>
        <ol className="mt-10 grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
          {METHOD.map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-3">
              <span className="uc-step">{String(i + 1).padStart(2, "0")}</span>
              <strong className="uc-ui text-lg">{t}</strong>
              <span className="text-[15px] uc-muted">{d}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Work */}
      <section id="work" className="uc-iron-2 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="uc-kicker">Shipped</p>
              <h2 className="uc-display uc-caps mt-2" style={{ fontSize: "var(--text-display-s)" }}>Things I built. Then poked.</h2>
            </div>
            <Link to="/apps" className="uc-link">All apps <span aria-hidden="true">→</span></Link>
          </div>
          <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {APPS.map((a) => (
              <a key={a.slug} href={a.page} className="uc-card">
                <div className="flex flex-wrap gap-2">
                  <span className="uc-stamp" style={{ color: "var(--color-steel)" }}>{a.platform}</span>
                  <span className="uc-stamp" style={{ color: "var(--color-rust-hi)" }}>{a.tag}</span>
                </div>
                <h3 className="uc-display text-3xl">{a.name}</h3>
                <p className="uc-muted">{a.summary}</p>
                <span className="uc-link mt-auto">Details <span aria-hidden="true">→</span></span>
              </a>
            ))}
            {PROJECTS.map((p) => (
              <div key={p.name} className="uc-card" style={{ borderColor: "var(--color-rust-lo)", gridColumn: "1 / -1" }}>
                <span className="uc-stamp self-start" style={{ color: "var(--color-cream)" }}>{p.tag}</span>
                <h3 className="uc-display text-3xl">{p.name}</h3>
                <p className="uc-muted">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hal + merch */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-[auto_minmax(0,1fr)] gap-10 items-center">
        <img src="/images/hal.webp" alt="Hal, the rusty Unconvinced robot, waving" width="594" height="566" className="w-56 sm:w-72 h-auto mx-auto" style={{ filter: "drop-shadow(0 14px 20px rgba(0,0,0,.6))" }} />
        <div className="flex flex-col gap-4">
          <p className="uc-kicker">Meet Hal</p>
          <h2 className="uc-display uc-caps" style={{ fontSize: "var(--text-display-s)" }}>The robot who isn't convinced either.</h2>
          <p className="text-lg" style={{ color: "var(--color-text-2)" }}>
            Hal is the mascot, the investigator and the star of his own YouTube channel. Hal merch is on the way.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={HAL_URL} variant="cream">Watch Hal on YouTube <span aria-hidden="true">→</span></Button>
            <span className="uc-btn uc-btn-ghost" aria-disabled="true">Hal merch · coming soon</span>
          </div>
        </div>
      </section>

      {/* Museum / Lab / About */}
      <section className="uc-iron-2" style={{ borderTop: "1px solid var(--color-line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {[
            ["/museum", "The Failure Museum", "What actually goes wrong in AI-built software, and how to catch it."],
            ["/lab", "The Lab", "Ongoing investigations and technical write-ups."],
            ["/about", "About Treena", "15 years on payment and ticketing back ends. Now building with AI."],
          ].map(([to, t, d]) => (
            <div key={to} className="flex flex-col gap-2 items-start">
              <h3 className="uc-display text-2xl">{t}</h3>
              <p className="uc-muted">{d}</p>
              <Link to={to} className="uc-link mt-1">Open <span aria-hidden="true">→</span></Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
