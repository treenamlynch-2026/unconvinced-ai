import { usePath } from "./router.jsx";
import Home from "./pages/Home.jsx";
import Apps from "./pages/Apps.jsx";
import AppDetail from "./pages/AppDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import DocPage from "./DocPage.jsx";
import { SECTIONS } from "./content.js";

export default function App() {
  const path = usePath();
  if (path === "/apps") return <Apps />;
  const app = path.match(/^\/apps\/([a-z0-9-]+)$/);
  if (app) return <AppDetail slug={app[1]} />;
  if (path === "/about") return <About />;
  if (path === "/contact") return <Contact />;
  const m = path.match(/^\/([a-z]+)(?:\/([a-z0-9-]+))?$/);
  if (m && SECTIONS[m[1]]) return <DocPage key={path} section={m[1]} slug={m[2]} />;
  return <Home />;
}
