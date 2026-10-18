import { useEffect, useState } from "react";

// Resume as a riveted "case file". Only confirmed facts are filled in; sourced from the resume PDF
// until the real resume content is supplied. Download button turns on once the PDF exists.
export const RESUME_PDF = "/Treena_Lynch_Resume.pdf";

const STATS = [
  ["20+", "years building and supporting production software"],
  ["10M+", "transactions a year captured and balanced"],
  ["4", "iOS apps built with AI (2 live, 2 in review)"],
];

const SKILLS = ["C#", "SQL", "JavaScript", "HTML/CSS", "SuiteScript / NetSuite", "ChatGPT", "Claude", "Prompt & context engineering", "AI output validation", "Edge-case testing", "Log analysis", "Sandbox & deployment validation"];

const TIMELINE = [
  ["2025 – Present", "Founder, Independent Developer", "Unconvinced.", "Ships iOS apps built with AI: Snapshot Puzzle and The Cut Card are live; Congress Trade Detective and Calm Coloring Book are in review. Tests what the AI built before users do."],
  ["2021 – 2025", "Business Systems / NetSuite Developer", "Cologix", "SuiteScripts for business operations; production issue diagnosis through log analysis and validation; sandbox and deployment testing."],
  ["2018 – 2021", "NetSuite Developer", "Huppins", "Scripts for pricing, inventory and operational workflows; troubleshooting, validation and enhancements."],
  ["2004 – 2018", "Programmer", "World Wide Group", "Two-year re-architecture of the legacy ticketing system: decoupled card processing from checkout (pending orders, batch charging via an admin app I built), per-step transaction status tracking (Authorizing → Captured), WCF payment service written for two processor versions, unified Cart/Order schema. 10M+ transactions a year. Rebuilt a failing POV system."],
];

function useExists(url) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    fetch(url, { method: "HEAD" }).then((r) => setOk(r.ok && !(r.headers.get("content-type") || "").includes("text/html"))).catch(() => {});
  }, [url]);
  return ok;
}

export default function Resume() {
  const hasPdf = useExists(RESUME_PDF);
  return (
    <section id="resume" className="uc-iron scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="uc-file">
          <span className="uc-rv" style={{ top: 12, left: 12 }} /><span className="uc-rv" style={{ top: 12, right: 12 }} />
          <span className="uc-rv" style={{ bottom: 12, left: 12 }} /><span className="uc-rv" style={{ bottom: 12, right: 12 }} />

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="uc-kicker">Case file · Résumé</p>
              <h2 className="uc-display mt-2" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}>Treena Lynch</h2>
              <p className="uc-slab text-xl mt-1" style={{ color: "var(--color-text-2)" }}>Full-Stack Systems Developer · AI Integration &amp; Automation · AI-Assisted Development · Spokane, WA</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-px mt-8" style={{ background: "var(--color-line)" }}>
            {STATS.map(([n, l]) => (
              <div key={l} className="p-5" style={{ background: "var(--color-iron-2)" }}>
                <div className="uc-display" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "var(--color-rust-hi)" }}>{n}</div>
                <div className="uc-ui text-sm uc-muted mt-1">{l}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 mt-10">
            <ol className="uc-timeline">
              {TIMELINE.map(([y, role, co, d], i) => (
                <li key={i}>
                  <span className="uc-ui text-xs font-bold tracking-widest" style={{ color: "var(--color-steel)" }}>{y}</span>
                  <h3 className="uc-ui font-bold text-lg mt-1">{role} <span className="uc-muted font-normal">· {co}</span></h3>
                  <p className="mt-1 text-[15px]" style={{ color: "var(--color-text-2)" }}>{d}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="uc-ui font-bold uppercase tracking-widest text-xs uc-muted">Tools of the trade</h3>
                <ul className="flex flex-wrap gap-2 mt-3">
                  {SKILLS.map((s) => <li key={s} className="uc-chip">{s}</li>)}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                {hasPdf ? (
                  <a href={RESUME_PDF} className="uc-btn uc-btn-rust" download>Download résumé (PDF) <span aria-hidden="true">↓</span></a>
                ) : (
                  <span className="uc-btn uc-btn-ghost" aria-disabled="true">Résumé PDF · coming soon</span>
                )}
                <a href="/contact" className="uc-btn uc-btn-ghost">Hire me</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
