import { useEffect, useState } from "react";
import { Link, usePath } from "./router.jsx";

export const EMAIL = "inquiry@unconvinced.ai";
export const HAL_URL = "https://www.youtube.com/@ConvinceHal";

// Concept 2 rusted wordmark. The trailing period is part of the company name.
export function Wordmark({ size = "2rem", className = "" }) {
  return (
    <span className={`uc-word ${className}`} style={{ fontSize: size }} aria-label="Unconvinced.">
      <span className="un" aria-hidden="true">UN</span>
      <span className="cv" aria-hidden="true">CONVINCED</span>
      <span className="dot" aria-hidden="true">.</span>
    </span>
  );
}

// Concept 2 magnifier with the question mark. `scale` 1 = 200px.
export function Magnifier({ scale = 1, handle = true, className = "" }) {
  return (
    <span className={`inline-block ${className}`} style={{ width: 200 * scale, height: 200 * scale }} aria-hidden="true">
      <span className="uc-mag block" style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {handle && <span className="uc-mag-handle" />}
        <span className="uc-mag-lens"><span className="uc-mag-glass"><span className="uc-mag-q">?</span></span></span>
      </span>
    </span>
  );
}

// Primary lockup: magnifier over wordmark over riveted plate.
export function LogoLockup({ plate = "Prove it.", className = "" }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Magnifier scale={0.8} className="relative z-10 uc-lockup-mag" />
      <div className="uc-lockup-word">
        <Wordmark size="clamp(2.75rem, 12vw, 5.75rem)" />
      </div>
      <p className="uc-plate mt-3" style={{ fontSize: "clamp(1rem, 2.4vw, 1.6rem)" }}>{plate}</p>
    </div>
  );
}

export function Img({ src, alt, className = "", style }) {
  const [bad, setBad] = useState(false);
  if (bad && !import.meta.env.DEV) return null;
  if (bad)
    return (
      <div className={`flex items-center justify-center text-center text-xs p-3 uc-missing ${className}`} style={style} role="img" aria-label={alt}>
        {alt}
      </div>
    );
  return <img src={src} alt={alt} className={className} style={style} onError={() => setBad(true)} />;
}

export function Button({ to, href, children, variant = "solid" }) {
  const cls = variant === "block" ? "uc-btn-block" : `uc-btn uc-btn-${variant}`;
  return href ? <a href={href} className={cls}>{children}</a> : <Link to={to} className={cls}>{children}</Link>;
}

// Hal: runs across the screen once per visit, then perches bottom-right. Click = his YouTube channel.
function Hal() {
  const [run] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      if (sessionStorage.getItem("uc-hal-ran")) return false;
      sessionStorage.setItem("uc-hal-ran", "1");
    } catch { /* storage blocked: run anyway */ }
    return true;
  });
  const [state, setState] = useState(run ? "is-running" : "");
  useEffect(() => {
    if (!run) return;
    const t1 = setTimeout(() => setState("is-hello"), 3200);
    const t2 = setTimeout(() => setState(""), 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [run]);
  return (
    <a href={HAL_URL} target="_blank" rel="noopener" className={`uc-hal ${state}`} aria-label="Hal the Robot on YouTube (opens in a new tab)">
      <span className="uc-hal-tip">Hi, I'm Hal. Watch me →</span>
      <img src="/images/hal.webp" alt="" width="594" height="566" />
    </a>
  );
}

const NAV = [
  ["/#method", "Method"],
  ["/#work", "Work"],
  ["/#resume", "Résumé"],
  ["/lab", "Lab"],
  ["/about", "About"],
];

// Iris mockup: header (logo + tagline, nav, button) and iron footer.
export function Layout({ title, children }) {
  const path = usePath();
  useEffect(() => {
    document.title = title ? `${title} | Unconvinced.` : "Unconvinced. | Build it? Poke it? Support it?";
  }, [title]);

  const NavLink = ({ to, label }) =>
    to.includes("#") ? <a href={to}>{label}</a> : <Link to={to} aria-current={path === to ? "page" : undefined}>{label}</Link>;

  return (
    <div className="uc-page min-h-screen flex flex-col">
      <a href="#main" className="uc-skip">Skip to content</a>
      <header className="uc-mast">
        <div className="uc-mast-in">
          <Link to="/" aria-label="Unconvinced. home" className="flex items-center gap-2">
            <Magnifier scale={0.22} handle={false} />
            <span className="flex flex-col">
              <Wordmark size="1.75rem" />
              <span className="uc-ui text-[10px] font-bold tracking-[.18em]" style={{ color: "var(--color-muted)" }}>BUILD IT? POKE IT? SUPPORT IT?</span>
            </span>
          </Link>
          <nav className="uc-mast-nav" aria-label="Primary">
            {NAV.map(([to, label]) => <NavLink key={to} to={to} label={label} />)}
          </nav>
          <Button to="/contact" variant="rust">Contact <span aria-hidden="true">→</span></Button>
        </div>
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="uc-foot uc-iron">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center gap-5">
          <p className="uc-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}>Have a project, a stubborn bug, or a workflow that needs help?</p>
          <Button to="/contact" variant="cream">Contact <span aria-hidden="true">→</span></Button>
          <div className="w-full h-px my-3" style={{ background: "var(--color-line)" }} />
          <Wordmark size="2.25rem" />
          <p className="uc-slab uc-muted">Build it? Poke it? Support it? — I can do that!</p>
        </div>
      </footer>
      <Hal />
    </div>
  );
}
