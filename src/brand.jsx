import { useEffect, useState } from "react";
import { Link, usePath } from "./router.jsx";

export const EMAIL = "inquiry@unconvinced.ai";

// Rusted square dot, sized to the stroke weight of Barlow Condensed 800.
export const RustDot = () => <span className="uc-dot" aria-hidden="true" />;

export function Wordmark({ className = "" }) {
  return (
    <span className={`uc-display uc-wordmark ${className}`}>
      Unconvinced<RustDot />
      <span className="sr-only">.</span>
    </span>
  );
}

// Riveted logo plate with the "Prove it." tagline.
export function LogoPlate({ className = "" }) {
  return (
    <div className={`uc-plate ${className}`}>
      <span className="uc-rivet" style={{ top: 8, left: 8 }} />
      <span className="uc-rivet" style={{ top: 8, right: 8 }} />
      <span className="uc-rivet" style={{ bottom: 8, left: 8 }} />
      <span className="uc-rivet" style={{ bottom: 8, right: 8 }} />
      <Wordmark className="text-4xl sm:text-5xl" />
      <p className="uc-display uc-tagline mt-1 text-lg sm:text-xl">Prove it.</p>
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
  const cls = variant === "block" ? "uc-btn-block" : `uc-btn ${variant === "solid" ? "uc-btn-solid" : "uc-btn-ghost"}`;
  return href ? <a href={href} className={cls}>{children}</a> : <Link to={to} className={cls}>{children}</Link>;
}

const NAV = [
  ["/", "Home"],
  ["/apps", "Apps"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

// N6 masthead + Ft5 statement footer. Four short links fit one row down to 320px, so no menu toggle.
export function Layout({ title, children }) {
  const path = usePath();
  useEffect(() => {
    document.title = title ? `${title} | Unconvinced.` : "Unconvinced. | Prove it.";
  }, [title]);

  const active = (to) => (to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`));
  const links = () =>
    NAV.map(([to, label]) => (
      <Link key={to} to={to} aria-current={active(to) ? "page" : undefined}>{label}</Link>
    ));

  return (
    <div className="uc-page min-h-screen flex flex-col">
      <a href="#main" className="uc-skip">Skip to content</a>
      <header className="uc-mast">
        <p className="uc-mast-line">Independent AI assurance</p>
        <Link to="/" aria-label="Unconvinced. home" className="inline-block mt-1">
          <Wordmark className="text-5xl sm:text-6xl" />
        </Link>
        <nav className="uc-mast-nav" aria-label="Primary">{links()}</nav>
        <div className="uc-rule-double" aria-hidden="true" />
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="uc-foot uc-bleed-paper2">
        <div className="max-w-6xl mx-auto">
          <p className="uc-display uc-foot-line">We don't trust confidence. We collect evidence.</p>
          <div className="uc-foot-meta">
            <span><Wordmark className="text-2xl" /> <span className="uc-display uc-tagline text-lg ml-2">Prove it.</span></span>
            <nav aria-label="Footer">
              {links()}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
