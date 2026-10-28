import { useEffect, useState } from "react";
import { Layout, LogoLockup, Button } from "../brand.jsx";
import { Link } from "../router.jsx";
import { APPS, MERCH } from "../apps.js";
import Resume from "../Resume.jsx";


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

// Hal merch: one row per character, tee + crewneck photo cards.
function Merch() {
  return (
    <section id="merch" className="uc-iron-2" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="uc-display text-3xl">Hal merch</h2>
          <p className="uc-muted">For anyone whose first response is ‘I have questions.’</p>
        </div>
        {MERCH.map((c) => (
          <div key={c.character} className="flex flex-col gap-3">
            <h3 className="uc-ui font-bold text-xl">{c.character}</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {c.items.map((it) => (
                <figure key={it.kind} className="uc-card" style={{ padding: 0, overflow: "hidden" }}>
                  <img src={it.img} alt={`${c.character} ${it.kind.toLowerCase()}`} loading="lazy" width="800" height="800" className="w-full h-auto block" style={{ aspectRatio: "1 / 1", objectFit: "cover" }} />
                  <figcaption className="flex items-center justify-between gap-3 flex-wrap" style={{ padding: "1rem 1.25rem" }}>
                    <span className="flex flex-col">
                      <span className="uc-ui font-bold">{c.character} {it.kind}</span>
                      <span className="uc-muted text-sm">{it.price}</span>
                    </span>
                    {it.buy
                      ? <a href={it.buy} target="_blank" rel="noopener" className="uc-btn uc-btn-rust">Buy <span aria-hidden="true">→</span></a>
                      : <span className="uc-btn uc-btn-ghost" aria-disabled="true">Coming soon</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// The Room: Treena's open-source app where one human directs Claude and Iris in one shared chat.
const ROOM_REPO = "https://github.com/treenamlynch-2026/the-room";
const ROOM_FEATURES = [
  ["Route every message", "Send to Claude, Iris or both with @claude, @iris, @both. Parallel replies never see each other until the next turn."],
  ["Cross-review", "One click asks the other AI to review or implement a reply, optionally on its deeper model."],
  ["Project Brain", "Canon rules, Decisions and pinned files ride along on every call, with an authority order for conflicts."],
  ["Shared approvals", "Treena, Claude and Iris can each approve messages, log Decisions and add Canon. The human can remove anything."],
  ["Real files", "Text, images, PDFs and video (frames + transcript) go to both models."],
  ["Yours, locally", "Runs on 127.0.0.1 with your own API keys. Conversations and keys stay on your machine."],
];
// Real screenshot of The Room. When the screen-recorded clip arrives, swap this figure to a muted, looping <video>.
const ROOM_SHOT = "/media/the-room-screenshot.webp";

function TheRoom() {
  return (
    <section id="the-room" className="uc-iron scroll-mt-20" style={{ borderTop: "1px solid var(--color-line)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col gap-4">
          <p className="uc-kicker">Open source · Free on GitHub</p>
          <h2 className="uc-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.25rem)" }}>The Room</h2>
          <p className="text-lg" style={{ color: "var(--color-text-2)" }}>
            One human, two AIs, one conversation. I built The Room so I can direct Claude (Anthropic) and Iris
            (an OpenAI GPT model) at the same time, in one shared project, with one set of rules they both follow.
            It's how I run my own builds: one AI builds, the other pokes holes, and I decide.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "SQLite", "Anthropic API", "OpenAI API", "MIT license"].map((t) => <span key={t} className="uc-chip">{t}</span>)}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button href={ROOM_REPO} variant="rust">Get it on GitHub <span aria-hidden="true">→</span></Button>
          </div>
          <p className="text-sm uc-muted">Independent project. Not affiliated with or endorsed by Anthropic or OpenAI. Bring your own API keys.</p>
        </div>

        <div className="flex flex-col gap-6">
          <figure className="uc-card" style={{ padding: 0, overflow: "hidden" }}>
            <img src={ROOM_SHOT} alt="The Room in split view: Iris and Claude answering side by side, with the Project Brain panel on the right" loading="lazy" width="1568" height="732"
              style={{ display: "block", width: "100%", height: "auto" }} />
            <figcaption className="text-xs uc-muted px-4 py-2">The real thing: I ask who owns adding The Room to this site; Iris and Claude split the work and log it as a Decision.</figcaption>
          </figure>
          <ul className="grid sm:grid-cols-2 gap-5">
            {ROOM_FEATURES.map(([t, d]) => (
              <li key={t} className="flex flex-col gap-1">
                <strong className="uc-ui">{t}</strong>
                <span className="text-[15px] uc-muted">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const METHOD = [
  ["Understand", "Start with the people, the workflow, and the problem worth solving."],
  ["Challenge", "Ask the awkward questions. Try the inputs nobody planned for."],
  ["Measure", "Define what working means, then check the result against it."],
  ["Trace", "Follow the logs and the data to find where things went sideways."],
  ["Retest", "Fix the problem, repeat the test, and check what else changed."],
  ["Report", "Explain what works, what needs attention, and what comes next."],
];

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
            <p className="text-lg" style={{ color: "var(--color-text-2)" }}>I’m Treena, a full-stack systems developer who builds apps, connects AI to real workflows, and tests what comes out. Available for freelance AI integration, automation, development, and support.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="#work" variant="cream">See my work <span aria-hidden="true">→</span></Button>
              <Button to="/about" variant="ghost">Meet Treena</Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center"><img src="/images/unconvinced-logo.png" alt="Unconvinced. — Build it? Poke it? Support it?" width="415" height="224" className="w-full max-w-[440px] h-auto" /></div>
        </div>
      </section>

      {/* 2. Strip */}
      <div className="uc-plate-band">
        <p className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center uc-slab text-lg sm:text-2xl" style={{ color: "var(--color-cream)" }}>20+ years solving business problems. Still curious. Still checking the results.</p>
      </div>

      {/* 3. Apps */}
      <AppShowcase />

      {/* 3b. The Room */}
      <TheRoom />

      {/* 4. Method */}
      <section id="method" className="uc-iron-2 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="uc-display" style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)" }}>The Unconvinced. Method</h2>
          <p className="mt-2 text-lg" style={{ color: "var(--color-text-2)" }}>AI helps me build faster. Experience tells me where to look twice.</p>
          <ol className="mt-8 grid gap-7" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {METHOD.map(([t, description], i) => (
              <li key={t} className="flex flex-col gap-2">
                <span className="uc-step">{String(i + 1).padStart(2, "0")}</span>
                <strong className="uc-ui text-lg">{t}</strong>
                <span className="text-[15px] uc-muted">{description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Resume */}
      <Resume />

      {/* 6. Hal merch */}
      <Merch />

      {/* 7. About */}
      <section className="uc-iron-2" style={{ borderTop: "1px solid var(--color-line)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            ["/about", "About Treena", "The developer behind the apps: practical experience, a curious mind, and a habit of asking why."],
          ].map(([to, t, description]) => (
            <div key={t} className="flex flex-col gap-2 items-start">
              <h3 className="uc-ui font-bold text-xl">{t}</h3>
              <p className="uc-muted">{description}</p>
              {to ? <Link to={to} className="uc-btn uc-btn-ghost mt-1">Open <span aria-hidden="true">→</span></Link>
                  : <span className="uc-btn uc-btn-ghost mt-1" aria-disabled="true">Coming soon</span>}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
