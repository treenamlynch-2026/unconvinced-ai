import { useState } from "react";
import ContactForm from "./ContactForm.jsx";
import { slugify, getDoc, listDocs } from "./content.js";

const live = (section, slug) => Boolean(getDoc(section, slug));

/* ============================================================
   unconvinced.ai — landing page
   Images: drop files into /public/images/ with the names below.
   Missing images render a labeled placeholder, so layout holds.
   VERIFY: every value marked VERIFY must be real before launch.
   ============================================================ */

const C = {
  navy: "#0B1F2A",
  navy2: "#102C3A",
  teal: "#27C4D8",
  tealDark: "#0F5A6A",
  paper: "#F6F4EF",
  ink: "#16222B",
  muted: "#55636D",
  red: "#D3302F",
  green: "#1E9E5A",
  line: "#DDE2E5",
};

const IMG = {
  heroRobot: "/images/robot-magnifier.png",
  pressRobot: "/images/robot-press-tablet.png",
  report: "/images/unconvinced-report.png",
  headshot: "/images/treena.jpg",
  mug: "/images/mug.png",
};

const NAV = ["Method", "Case Studies", "Failure Museum", "Lab", "About"];

const PILLARS = [
  { t: "Data integrity", q: "Did every transaction actually reconcile?", icon: "db" },
  { t: "AI behavior", q: "Does it know when it doesn't know?", icon: "brain" },
  { t: "Security", q: "What happens when someone deliberately abuses it?", icon: "shield" },
  { t: "Failure states", q: "What happens on retry, timeout, duplicate submission or partial completion?", icon: "gear" },
];

const METHOD = [
  { n: "01", t: "Understand", d: "Map what the system claims to do." },
  { n: "02", t: "Attack", d: "Create adversarial, edge-case and failure-state tests." },
  { n: "03", t: "Measure", d: "Define expected outcomes and pass/fail criteria." },
  { n: "04", t: "Trace", d: "Find where data or AI behavior diverges." },
  { n: "05", t: "Fix + retest", d: "Use AI to accelerate remediation, then attack it again." },
  { n: "06", t: "Report", d: "Document findings, severity and remaining risk." },
];

const CASE_STATS = []; // add only numbers from the real audit
const hasStats = CASE_STATS.length > 0;

// VERIFY: use real incidents (with sources) or keep the "illustrative" label.
const MUSEUM = [
  { slug: "double-charge", q: "It charged the customer twice.", d: "Everything returned HTTP 200." },
  { slug: "phantom-citation", q: "The AI cited a source that didn't contain the claim.", d: "" },
  { slug: "duplicate-retry", q: "The retry succeeded. So did the original request.", d: "" },
];

const LAB = [
  "Hallucination evaluation",
  "Prompt injection testing",
  "Agent permissions",
  "Grounded generation",
  "Transaction integrity",
  "AI-generated code",
  "Structured vs. unstructured data",
  "Failure-state testing",
];

/* ---------- small pieces ---------- */

function Img({ src, alt, className = "", style }) {
  const [bad, setBad] = useState(false);
  if (bad && !import.meta.env.DEV) return null;
  if (bad)
    return (
      <div
        className={`flex items-center justify-center text-center text-xs p-3 ${className}`}
        style={{ border: `2px dashed ${C.teal}`, color: C.teal, ...style }}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  return <img src={src} alt={alt} className={className} style={style} onError={() => setBad(true)} />;
}

function Btn({ children, variant = "solid", href = "#" }) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      className="inline-block px-5 py-3 rounded font-bold text-sm tracking-wide uc-focus"
      style={{
        background: solid ? C.tealDark : "transparent",
        color: solid ? "#fff" : C.teal,
        border: `2px solid ${solid ? C.tealDark : C.teal}`,
      }}
    >
      {children}
    </a>
  );
}

function Icon({ name }) {
  const p = { fill: "none", stroke: C.tealDark, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    db: (
      <>
        <ellipse cx="24" cy="10" rx="13" ry="5" {...p} />
        <path d="M11 10v28c0 2.8 5.8 5 13 5s13-2.2 13-5V10M11 19c0 2.8 5.8 5 13 5s13-2.2 13-5M11 28c0 2.8 5.8 5 13 5s13-2.2 13-5" {...p} />
      </>
    ),
    brain: (
      <path d="M18 8a6 6 0 0 0-6 6 6 6 0 0 0-4 10 6 6 0 0 0 4 10 6 6 0 0 0 12 2V10a6 6 0 0 0-6-2zM30 8a6 6 0 0 1 6 6 6 6 0 0 1 4 10 6 6 0 0 1-4 10 6 6 0 0 1-12 2M18 18h6M24 26h6M18 32h4" {...p} />
    ),
    shield: (
      <>
        <path d="M24 5l15 6v11c0 10-6.5 17-15 21C15.5 39 9 32 9 22V11z" {...p} />
        <path d="M17 24l5 5 9-11" {...p} />
      </>
    ),
    gear: (
      <>
        <circle cx="24" cy="24" r="6" {...p} />
        <path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.6 10.6l4.2 4.2M33.2 33.2l4.2 4.2M10.6 37.4l4.2-4.2M33.2 14.8l4.2-4.2" {...p} />
        <circle cx="24" cy="24" r="13" {...p} />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="10" fill={C.green} />
    <path d="M5.5 10.5l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const XMark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="none" stroke={C.red} strokeWidth="2" />
    <path d="M6.5 6.5l7 7M13.5 6.5l-7 7" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Underline = ({ color = C.teal, w = 160 }) => (
  <svg width={w} height="10" viewBox="0 0 160 10" preserveAspectRatio="none" aria-hidden="true" className="block">
    <path d="M2 7 C 40 2, 100 2, 158 6" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ---------- page ---------- */

export default function Landing() {
  const [menu, setMenu] = useState(false);

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: "'Barlow', system-ui, sans-serif" }}>
      <style>{`
        .uc-display { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; font-weight: 800; letter-spacing: -0.01em; line-height: 1.02; }
        .uc-hand { font-family: 'Caveat', 'Comic Sans MS', cursive; }
        .uc-focus:focus-visible { outline: 3px solid ${C.teal}; outline-offset: 3px; }
        .uc-paper { background: #FBFAF6; box-shadow: 0 6px 18px rgba(0,0,0,.18); }
        @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-20" style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <a href="#" className="uc-focus">
            <div className="uc-display text-3xl" style={{ color: C.navy }}>
              UNCONVINCED<span style={{ color: C.teal }}>.AI</span>
            </div>
            <div className="text-xs font-semibold" style={{ color: C.muted, letterSpacing: ".08em" }}>
              AI assurance for business systems
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="uc-focus hover:underline">
                {n}
              </a>
            ))}
            <Btn href="#contact">Test your system</Btn>
          </nav>
          <button
            className="md:hidden uc-focus px-3 py-2 rounded font-bold text-sm"
            style={{ border: `2px solid ${C.navy}` }}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            Menu
          </button>
        </div>
        {menu && (
          <nav className="md:hidden px-5 pb-4 flex flex-col gap-3 font-semibold" aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="uc-focus" onClick={() => setMenu(false)}>
                {n}
              </a>
            ))}
            <Btn href="#contact">Test your system</Btn>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section style={{ background: `linear-gradient(110deg, ${C.navy} 45%, ${C.navy2})` }} className="text-white">
        <div className="max-w-6xl mx-auto px-5 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="uc-display text-5xl md:text-6xl">
              Your company
              <br />
              built it with AI.
              <br />
              <span style={{ color: C.teal }}>But can you trust it?</span>
            </h1>
            <p className="mt-5 text-xl font-bold" style={{ color: C.teal }}>
              AI assurance for business systems
            </p>
            <p className="mt-2 text-lg max-w-lg" style={{ color: "#D5E0E5" }}>
              Independent testing of AI-built software for data integrity, hallucinations, security weaknesses, failure
              states and production readiness.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn href="#method">See what we test</Btn>
              <Btn variant="ghost" href="#contact">Give us something to break</Btn>
            </div>
            <p className="uc-hand text-3xl mt-7">
              They say it's production-ready. We're Unconvinced.
            </p>
            <Underline w={260} />
          </div>

          <div className="relative flex justify-center">
            <Img src={IMG.heroRobot} alt="Robot inspecting with a magnifying glass" className="w-full max-w-md" style={{ minHeight: 320 }} />
            <div
              className="uc-paper uc-hand absolute hidden lg:block text-2xl px-5 py-4"
              style={{ top: 0, right: -20, color: C.ink, transform: "rotate(-4deg)" }}
            >
              Looks right
              <br />≠ is right
              <Underline color={C.red} w={90} />
            </div>
          </div>
        </div>
      </section>

      {/* FAILURES + PILLARS */}
      <section className="max-w-6xl mx-auto px-5 py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <h2 className="uc-display text-4xl" style={{ color: C.navy }}>
            The dangerous failures aren't always crashes.
          </h2>
          <p className="mt-3" style={{ color: C.muted }}>
            A system can look perfect while quietly producing the wrong result.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <ul className="bg-white rounded" style={{ border: `1px solid ${C.line}`, minWidth: 220 }}>
              {["Payment accepted", "Order created", "Customer notified", "Dashboard updated"].map((s, i) => (
                <li key={s} className="flex items-center gap-3 px-4 py-3" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
                  <Check /> {s}
                </li>
              ))}
            </ul>
            <div className="uc-paper uc-hand text-3xl px-5 py-5 flex items-start gap-3" style={{ transform: "rotate(-3deg)" }}>
              <XMark size={34} />
              <div>
                Except the ledger is wrong.
                <Underline color={C.red} w={120} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="uc-display text-4xl" style={{ color: C.navy }}>
            Looks right isn't the same as is right.
          </h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {PILLARS.map((p) => (
              <div key={p.t} className="bg-white rounded p-4 text-center" style={{ border: `1px solid ${C.line}` }}>
                <div className="flex justify-center">
                  <Icon name={p.icon} />
                </div>
                <h3 className="mt-2 font-bold">{p.t}</h3>
                <p className="mt-1 text-sm" style={{ color: C.muted }}>
                  {p.q}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center">
            We don't ask whether the demo works. <strong>We ask what happens when reality does.</strong>
          </p>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="text-white" style={{ background: C.navy }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid lg:grid-cols-4 gap-10 items-center">
          <div className="lg:col-span-3">
            <h2 className="uc-display text-4xl">The Unconvinced Method</h2>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#D5E0E5" }}>
              We don't trust confidence. We collect evidence.
            </p>
            <ol className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {METHOD.map((m) => (
                <li key={m.n}>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold"
                    style={{ border: `2px solid ${C.teal}`, color: C.teal }}
                  >
                    {m.n}
                  </div>
                  <h3 className="mt-3 font-bold text-lg">{m.t}</h3>
                  <p className="mt-1 text-sm" style={{ color: "#C3D1D8" }}>
                    {m.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <Img src={IMG.report} alt="The Unconvinced Report folder" className="w-full max-w-xs mx-auto" style={{ minHeight: 240 }} />
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case-studies" className={`max-w-6xl mx-auto px-5 py-14 grid gap-10 items-center ${hasStats ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
        <div>
          <p className="font-bold" style={{ color: C.tealDark }}>
            Case study
          </p>
          <h2 className="uc-display text-4xl mt-1" style={{ color: C.navy }}>
            Congress Trade Detective
          </h2>
          <p className="mt-3 text-lg">I built this with AI. Now it's in App Store review.</p>
          <p className="mt-3 text-sm" style={{ color: C.muted }}>
            An iOS app that tracks stock trades by members of Congress and overlays the news of the time. AI did much of
            the build. It is currently in App Store review.
          </p>
          {live("cases", "congress-trade-detective") ? (
            <div className="mt-6"><Btn href="/cases/congress-trade-detective">See the full case study</Btn></div>
          ) : (
            <p className="mt-6 text-sm font-bold" style={{ color: C.tealDark }}>Full write-up coming soon.</p>
          )}
        </div>
        {hasStats && (<dl className="bg-white rounded" style={{ border: `1px solid ${C.line}` }}>
          {CASE_STATS.map((s, i) => (
            <div key={s.l} className="px-5 py-4" style={{ borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <dd className="uc-display text-4xl" style={{ color: C.tealDark }}>
                {s.v}
              </dd>
              <dt className="text-sm" style={{ color: C.muted }}>
                {s.l}
              </dt>
            </div>
          ))}
        </dl>)}
        <Img src={IMG.pressRobot} alt="Robot reporter holding the Congress Trade Detective app" className="w-full" style={{ minHeight: 280 }} />
      </section>

      {/* MUSEUM / LAB / ABOUT */}
      <section className="bg-white" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-5 py-14 grid lg:grid-cols-3 gap-10">
          <div id="failure-museum">
            <h2 className="uc-display text-3xl" style={{ color: C.navy }}>
              The Failure Museum
            </h2>
            <p className="text-sm" style={{ color: C.muted }}>
              Failure patterns we test for.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {MUSEUM.map((m) => (
                <article key={m.q} className="rounded p-4" style={{ border: `1px solid ${C.line}` }}>
                  <div className="flex items-center justify-between"><XMark /><span className="text-xs uppercase tracking-wide" style={{ color: C.muted }}>Illustrative pattern</span></div>
                  <p className="mt-2 font-bold">“{m.q}”</p>
                  {m.d && (
                    <p className="text-sm mt-1" style={{ color: C.muted }}>
                      {m.d}
                    </p>
                  )}
                  {live("museum", m.slug) && (
                    <a href={`/museum/${m.slug}`} className="uc-focus inline-block mt-3 text-sm font-bold" style={{ color: C.tealDark }}>
                      Read case
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div id="lab">
            <h2 className="uc-display text-3xl" style={{ color: C.navy }}>
              Unconvinced Lab
            </h2>
            <p className="text-sm" style={{ color: C.muted }}>
              Ongoing investigations and technical write-ups.
            </p>
            <ul className="mt-5 space-y-2">
              {LAB.map((l) => (
                <li key={l}>
                  {live("lab", slugify(l))
                    ? <a href={`/lab/${slugify(l)}`} className="uc-focus hover:underline">{l}</a>
                    : <span>{l}</span>}
                </li>
              ))}
            </ul>
            {listDocs("lab").length > 0 && (
              <a href="/lab" className="uc-focus inline-block mt-4 text-sm font-bold" style={{ color: C.tealDark }}>
                View all articles
              </a>
            )}
          </div>

          <div id="about">
            <h2 className="uc-display text-3xl" style={{ color: C.navy }}>
              About Treena
            </h2>
            <p className="text-sm" style={{ color: C.muted }}>
              Founder, AI assurance engineer
            </p>
            <div className="mt-5 flex gap-4 items-start">
              <Img src={IMG.headshot} alt="Treena Lynch headshot" className="w-28 h-28 rounded-full object-cover flex-shrink-0" />
              <div className="text-sm space-y-3">
                <p>
                  Two decades building and supporting business systems where “mostly correct” wasn't correct enough,
                  including a payment pipeline that balanced 10M+ transactions a year.
                </p>
                <p>AI changed how software gets built. It didn't change what production software owes the business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="text-white text-center" style={{ background: C.navy }}>
        <div className="max-w-6xl mx-auto px-5 py-16 grid md:grid-cols-4 items-center gap-8">
          <Img src={IMG.mug} alt="Mug: good systems prove themselves" className="hidden md:block w-full max-w-[180px] mx-auto" style={{ minHeight: 160 }} />
          <div className="md:col-span-2">
            <p className="text-2xl font-bold">Think your AI system works?</p>
            <p className="uc-hand text-3xl" style={{ color: C.teal }}>
              Good.
            </p>
            <p className="uc-display text-6xl" style={{ color: C.teal }}>
              Prove it.
            </p>
            <ContactForm />
          </div>
          <div className="hidden md:flex flex-col gap-2 items-center uc-display text-2xl">
            <span className="px-4 py-1 rotate-[-3deg]" style={{ background: "#7BC96F", color: C.navy }}>PASS</span>
            <span className="px-4 py-1" style={{ background: "#F2C94C", color: C.navy }}>INVESTIGATE</span>
            <span className="px-4 py-1 rotate-[2deg]" style={{ background: C.red }}>FAIL</span>
          </div>
        </div>
        <footer className="pb-8">
          <div className="uc-display text-2xl">
            UNCONVINCED<span style={{ color: C.teal }}>.AI</span>
          </div>
          <div className="text-xs" style={{ color: "#9FB2BC" }}>
            AI assurance for business systems
          </div>
          <a href="mailto:inquiry@unconvinced.ai" className="text-xs underline" style={{ color: "#9FB2BC" }}>inquiry@unconvinced.ai</a>
        </footer>
      </section>
    </div>
  );
}
