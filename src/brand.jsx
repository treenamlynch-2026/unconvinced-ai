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
  const cls = `uc-btn ${variant === "solid" ? "uc-btn-solid" : "uc-btn-ghost"}`;
  return href ? <a href={href} className={cls}>{children}</a> : <Link to={to} className={cls}>{children}</Link>;
}

const NAV = [
  ["/", "Home"],
  ["/apps", "Apps"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function Layout({ title, children }) {
  const path = usePath();
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.title = title ? `${title} | Unconvinced.` : "Unconvinced. | Prove it.";
  }, [title]);
  useEffect(() => setMenu(false), [path]);

  const active = (to) => (to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`));
  const links = (cls) =>
    NAV.map(([to, label]) => (
      <Link key={to} to={to} className={cls} aria-current={active(to) ? "page" : undefined}>
        {label}
      </Link>
    ));

  return (
    <div className="uc-page min-h-screen flex flex-col">
      <a href="#main" className="uc-skip">Skip to content</a>
      <header className="uc-header sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="uc-focus" aria-label="Unconvinced. home">
            <Wordmark className="text-3xl" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 font-semibold" aria-label="Primary">
            {links("uc-nav uc-focus")}
          </nav>
          <button
            type="button"
            className="md:hidden uc-focus uc-menu-btn"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
        {menu && (
          <nav id="mobile-nav" className="md:hidden px-4 pb-4 flex flex-col gap-1 font-semibold" aria-label="Mobile">
            {links("uc-nav uc-focus py-2")}
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">{children}</main>

      <footer className="uc-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-10 flex flex-col sm:flex-row gap-6 sm:items-end justify-between">
          <div>
            <Wordmark className="text-2xl" />
            <p className="uc-display uc-tagline text-base">Prove it.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" aria-label="Footer">
            {links("uc-focus hover:underline")}
            <a href={`mailto:${EMAIL}`} className="uc-focus hover:underline">{EMAIL}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export const Eyebrow = ({ children }) => <p className="uc-eyebrow">{children}</p>;
