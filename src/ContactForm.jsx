import { useState } from "react";

// Web3Forms public access key (designed to be visible in client code; not a secret).
const ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_KEY";
const FALLBACK = "inquiry@unconvinced.ai";
// The form renders only once a real key is set; until then the Contact page shows email only.
export const FORM_READY = !ACCESS_KEY.startsWith("REPLACE");

const field = "uc-field mt-1 font-normal";
const empty = { name: "", email: "", company: "", message: "", website: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();

    // Honeypot: bots fill the hidden field. Pretend success, send nothing.
    if (form.website) {
      setStatus({ state: "sent", msg: "Received. We'll reply from inquiry@unconvinced.ai." });
      return;
    }
    if (ACCESS_KEY.startsWith("REPLACE")) {
      setStatus({ state: "error", msg: `The form isn't connected yet. Please email ${FALLBACK}.` });
      return;
    }

    setStatus({ state: "sending", msg: "" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Unconvinced.ai inquiry from ${form.name}`,
          from_name: "Unconvinced.ai website",
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || "Submission failed.");
      setStatus({ state: "sent", msg: "Received. We'll reply from inquiry@unconvinced.ai." });
      setForm(empty);
    } catch {
      setStatus({ state: "error", msg: `Something went wrong. Please try again or email ${FALLBACK}.` });
    }
  }

  if (status.state === "sent")
    return <p className="mt-6 text-lg font-semibold" role="status">{status.msg}</p>;

  return (
    <form onSubmit={submit} className="mt-8 grid gap-3 text-left max-w-xl">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm font-semibold">Name
          <input className={field} value={form.name} onChange={set("name")} required maxLength={100} autoComplete="name" />
        </label>
        <label className="text-sm font-semibold">Email
          <input className={field} type="email" value={form.email} onChange={set("email")} required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <label className="text-sm font-semibold">Company (optional)
        <input className={field} value={form.company} onChange={set("company")} maxLength={150} autoComplete="organization" />
      </label>
      <label className="text-sm font-semibold">What did AI build, and what worries you about it?
        <textarea className={field} rows={4} value={form.message} onChange={set("message")} required maxLength={5000} />
      </label>
      {/* Honeypot: hidden from people, filled by bots */}
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {status.state === "error" && <p className="text-sm font-semibold text-[#9a4520]" role="alert">{status.msg}</p>}
      <button type="submit" disabled={status.state === "sending"}
        className="justify-self-start mt-2 uc-btn uc-btn-solid disabled:opacity-60">
        {status.state === "sending" ? "Sending…" : "Put it to the test"}
      </button>
    </form>
  );
}
