import { Layout, EMAIL } from "../brand.jsx";
import ContactForm, { FORM_READY } from "../ContactForm.jsx";

export default function Contact() {
  return (
    <Layout title="Contact">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        <h1 className="uc-display uc-caps" style={{ fontSize: "var(--text-display-s)" }}>Think your AI system works? Prove it.</h1>
        <p className="mt-4 text-lg">
          Tell us what AI built and what worries you about it. Email{" "}
          <a href={`mailto:${EMAIL}`} className="font-bold underline" style={{ color: "var(--color-teal-2)" }}>{EMAIL}</a>.
        </p>
        {FORM_READY ? (
          <ContactForm />
        ) : (
          <p className="mt-8 py-3 text-sm uc-muted" style={{ borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
            The online form isn't connected yet, so email is the way to reach us for now.
          </p>
        )}
      </section>
    </Layout>
  );
}
