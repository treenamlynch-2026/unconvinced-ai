import { Layout, LogoPlate, Button, Eyebrow } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";

const PILLARS = [
  { t: "Data integrity", q: "Did every transaction actually reconcile?" },
  { t: "AI behavior", q: "Does it know when it doesn't know?" },
  { t: "Security", q: "What happens when someone deliberately abuses it?" },
  { t: "Failure states", q: "What happens on retry, timeout, duplicate submission or partial completion?" },
];

const METHOD = [
  { n: "01", t: "Understand", d: "Map what the system claims to do." },
  { n: "02", t: "Attack", d: "Create adversarial, edge-case and failure-state tests." },
  { n: "03", t: "Measure", d: "Define expected outcomes and pass/fail criteria." },
  { n: "04", t: "Trace", d: "Find where data or AI behavior diverges." },
  { n: "05", t: "Fix + retest", d: "Use AI to accelerate remediation, then attack it again." },
  { n: "06", t: "Report", d: "Document findings, severity and remaining risk." },
];

export default function Home() {
  const featured = APPS[0];
  return (
    <Layout>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 pt-14 pb-16 grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3">
          <Eyebrow>AI assurance for business systems</Eyebrow>
          <h1 className="uc-display text-5xl sm:text-6xl mt-3">It passed every test it wrote for itself.</h1>
          <p className="mt-5 text-xl sm:text-2xl font-semibold" style={{ color: "var(--steel)" }}>
            Your company built it with AI. <span style={{ color: "var(--teal-2)" }}>But can you trust it?</span>
          </p>
          <p className="mt-4 text-lg max-w-xl" style={{ color: "var(--muted)" }}>
            Independent testing of AI-built software for data integrity, hallucinations, security weaknesses, failure
            states and production readiness.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/contact">Give us something to break</Button>
            <Button to="/apps" variant="ghost">See the apps</Button>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-end">
          <LogoPlate />
        </div>
      </section>

      <div className="uc-rule" />

      {/* PILLARS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
        <h2 className="uc-display text-4xl">Looks right isn't the same as is right.</h2>
        <p className="mt-2 max-w-2xl" style={{ color: "var(--muted)" }}>
          The dangerous failures aren't always crashes. A system can look perfect while quietly producing the wrong result.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((p) => (
            <div key={p.t} className="uc-card p-5">
              <h3 className="font-bold text-lg">{p.t}</h3>
              <p className="mt-1" style={{ color: "var(--muted)" }}>{p.q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METHOD */}
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
          <Eyebrow>The Unconvinced Method</Eyebrow>
          <h2 className="uc-display text-4xl mt-2">We don't trust confidence. We collect evidence.</h2>
          <ol className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {METHOD.map((m) => (
              <li key={m.n}>
                <span className="uc-display text-2xl" style={{ color: "var(--rust)" }}>{m.n}</span>
                <h3 className="mt-1 font-bold text-lg">{m.t}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURED APP */}
      {featured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-5 py-14">
          <Eyebrow>Featured app</Eyebrow>
          <div className="uc-card mt-3 p-6 sm:p-8 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h2 className="uc-display text-4xl">{featured.name}</h2>
              <p className="mt-2 text-lg">{featured.summary}</p>
              <p className="mt-3 text-sm font-semibold" style={{ color: "var(--muted)" }}>
                {featured.platform} · <span style={{ color: "var(--rust)" }}>{featured.status}</span>
              </p>
            </div>
            <div className="md:justify-self-end">
              <Button to={`/apps/${featured.slug}`}>View app details</Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-5 pb-16">
        <div className="uc-card p-8 text-center">
          <p className="text-2xl font-bold">Think your AI system works?</p>
          <p className="uc-hand text-3xl" style={{ color: "var(--teal-2)" }}>Good.</p>
          <p className="uc-display text-5xl" style={{ color: "var(--rust)" }}>Prove it.</p>
          <div className="mt-6"><Link to="/contact" className="uc-btn uc-btn-solid">Get in touch</Link></div>
        </div>
      </section>
    </Layout>
  );
}
