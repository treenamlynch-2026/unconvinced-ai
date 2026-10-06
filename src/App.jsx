import Landing from "./Landing.jsx";
import DocPage from "./DocPage.jsx";
import { SECTIONS } from "./content.js";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");
  const m = path.match(/^\/([a-z]+)(?:\/([a-z0-9-]+))?$/);
  if (m && SECTIONS[m[1]]) return <DocPage section={m[1]} slug={m[2]} />;
  return <Landing />;
}
