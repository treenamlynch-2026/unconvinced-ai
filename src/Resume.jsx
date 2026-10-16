import { useEffect, useState } from "react";

// Resume as a riveted "case file". Only confirmed facts are filled in; the rest is placeholder
// until the real resume content is supplied. Download button turns on once the PDF exists.
export const RESUME_PDF = "/Treena_Lynch_Resume.pdf";
const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const STATS = [
  ["20+", "years building production systems"],
  ["10M+", "transactions a year captured and balanced"],
  ["[#]", "placeholder stat"],
];

const SKILLS = ["C#", "SQL", "JavaScript", "React", "SuiteScript / NetSuite", "WCF", "Async payment processing", "AI-assisted development"];

const TIMELINE = [
  ["[Years]", "[Role]", "[Company]", LOREM],
  ["2004 – 2018", "[Role]", "World Wide Group", "Two-year redesign of the legacy ticketing system: third-party card processing moved into a WCF service with multi-stage async transaction states."],
  ["[Years]", "[Role]", "[Company]", LOREM],
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
              <p className="uc-slab text-xl mt-1" style={{ color: "var(--color-text-2)" }}>Full-stack systems developer · Spokane, WA</p>
            </div>
            <span className="uc-verified" aria-hidden="true">Verified</span>
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
