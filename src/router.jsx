import { useEffect, useState } from "react";

// Minimal pushState router. Hosting serves index.html for unknown paths
// (404.html copy on GitHub Pages, single-page-application on Cloudflare).
const current = () => window.location.pathname.replace(/\/+$/, "") || "/";

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(current);
  useEffect(() => {
    const on = () => setPath(current());
    window.addEventListener("popstate", on);
    return () => window.removeEventListener("popstate", on);
  }, []);
  return path;
}

export function Link({ to, onClick, ...props }) {
  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}
