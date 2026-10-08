import { Layout, Eyebrow, EMAIL } from "../brand.jsx";
import ContactForm, { FORM_READY } from "../ContactForm.jsx";

export default function Contact() {
  return (
    <Layout title="Contact">
      <section className="max-w-3xl mx-auto px-4 sm:px-5 py-14">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="uc-display text-5xl mt-2">Think your AI system works? Prove it.</h1>
        <p className="mt-4 text-lg">
          Tell us what AI built and what worries you about it. Email{" "}
          <a href={`mailto:${EMAIL}`} className="font-bold underline" style={{ color: "var(--teal-2)" }}>{EMAIL}</a>.
        </p>
        {FORM_READY ? (
          <ContactForm />
        ) : (
          <p className="mt-6 uc-card p-4 text-sm" style={{ color: "var(--muted)" }}>
            The online form isn't connected yet, so email is the way to reach us for now.
          </p>
        )}
      </section>
    </Layout>
  );
}
