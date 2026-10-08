import { Layout, LogoPlate, Button } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS } from "../apps.js";

const QUESTIONS = [
  ["Data integrity", "Did every transaction actually reconcile?"],
  ["AI behavior", "Does it know when it doesn't know?"],
  ["Security", "What happens when someone deliberately abuses it?"],
  ["Failure states", "What happens on retry, timeout, duplicate submission or partial completion?"],
];

const METHOD = [
  ["Understand", "Map what the system claims to do."],
  ["Attack", "Create adversarial, edge-case and failure-state tests."],
  ["Measure", "Define expected outcomes and pass/fail criteria."],
  ["Trace", "Find where data or AI behavior diverges."],
  ["Fix + retest", "Use AI to accelerate remediation, then attack it again."],
  ["Report", "Document findings, severity and remaining risk."],
];

export default function Home() {
  const featured = APPS[0];
  return (
    <Layout>
      {/* Declaration */}
      <section className="uc-bleed-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-[minmax(0,1fr)_auto] gap-12 items-end">
          <h1 className="uc-display uc-caps uc-tilt" style={{ fontSize: "var(--text-display)" }}>
            It passed every test it wrote <span className="uc-hl">for itself.</span>
          </h1>
          <LogoPlate className="justify-self-start lg:justify-self-end" />
        </div>
      </section>

      {/* Claims */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10">
        <div className="space-y-6">
          <p className="uc-claim font-semibold">
            Your company built it with AI. <span style={{ color: "var(--color-teal-2)" }}>But can you trust it?</span>
          </p>
          <p className="uc-claim">Looks right isn't the same as is right.</p>
          <p className="uc-claim">The dangerous failures aren't always crashes. A system can look perfect while quietly producing the wrong result.</p>
        </div>
        <p className="uc-muted md:pt-3 max-w-sm">
          Independent testing of AI-built software for data integrity, hallucinations, security weaknesses, failure states
          and production readiness. We don't ask whether the demo works. We ask what happens when reality does.
        </p>
      </section>

      {/* Inspection sheet: the questions, as a ruled list */}
      <section className="uc-bleed-paper2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="uc-display text-4xl sm:text-5xl">Four questions every system has to answer.</h2>
          <ol className="uc-sheet mt-8">
            {QUESTIONS.map(([t, q]) => (
              <li key={t} className="grid sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-1 sm:gap-6 py-5">
                <span className="uc-ui font-bold">{t}</span>
                <span className="text-lg">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Method as one sentence of verbs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <h2 className="uc-display uc-caps" style={{ fontSize: "var(--text-display-s)" }}>
          {METHOD.map(([t], i) => (
            <span key={t}>
              {t}
              {i < METHOD.length - 1 && <span style={{ color: "var(--color-rust)" }}> / </span>}
            </span>
          ))}
        </h2>
        <dl className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 max-w-5xl">
          {METHOD.map(([t, d]) => (
            <div key={t}>
              <dt className="uc-ui font-bold">{t}</dt>
              <dd className="uc-muted mt-1">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured app */}
      {featured && (
        <section className="uc-bleed-ink">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-end">
            <div>
              <p className="uc-ui text-sm" style={{ color: "var(--color-on-ink-2)" }}>
                Built with AI · {featured.platform} · {featured.status}
              </p>
              <h2 className="uc-display text-5xl sm:text-6xl mt-2">{featured.name}</h2>
              <p className="mt-3 text-lg max-w-xl" style={{ color: "var(--color-on-ink-2)" }}>{featured.summary}</p>
            </div>
            <Link to={`/apps/${featured.slug}`} className="uc-link md:justify-self-end" style={{ color: "var(--color-on-ink)" }}>
              App details <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Call to act, set far down */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-28">
        <p className="uc-claim">Think your AI system works?</p>
        <p className="uc-hand text-4xl mt-1" style={{ color: "var(--color-teal-2)" }}>Good.</p>
        <div className="mt-6"><Button to="/contact" variant="block">Prove it.</Button></div>
      </section>
    </Layout>
  );
}
