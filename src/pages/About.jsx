import { Layout, Eyebrow, Img, Button } from "../brand.jsx";

export default function About() {
  return (
    <Layout title="About">
      <section className="max-w-3xl mx-auto px-4 sm:px-5 py-14">
        <Eyebrow>About</Eyebrow>
        <h1 className="uc-display text-5xl mt-2">Treena Lynch</h1>
        <p className="mt-1 font-semibold" style={{ color: "var(--muted)" }}>Founder, AI assurance engineer</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-6 items-start">
          <Img src="/images/treena.jpg" alt="Treena Lynch headshot" className="w-32 h-32 rounded-full object-cover flex-shrink-0" />
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              OPM: other people's money. It was the mantra at World Wide Group, the events and training organization
              where I spent fifteen years on the back-end systems. I built the website back end and owned the native
              Android app. Payments and bookings from the app ran through that same back end, so every front end worked
              from one set of numbers.
            </p>
            <p>
              Accounting, ticketing, web, hotel API and event planners all had to reconcile, correctly and on time. In my
              last six years there, that meant a payment pipeline handling roughly $10 million a year.
            </p>
            <p>AI changed how software gets built. It didn't change what production software owes the business.</p>
            <p className="uc-hand text-3xl" style={{ color: "var(--teal-2)", transform: "rotate(-2deg)" }}>
              Same process. Different lipstick.
            </p>
          </div>
        </div>
        <div className="mt-10"><Button to="/contact">Get in touch</Button></div>
      </section>
    </Layout>
  );
}
