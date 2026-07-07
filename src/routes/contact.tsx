import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anaya Spa" },
      {
        name: "description",
        content:
          "Reach the Anaya Spa concierge — Santa Monica, CA. Phone, email, hours, and directions to our sanctuary.",
      },
      { property: "og:title", content: "Contact — Anaya Spa" },
      { property: "og:description", content: "Get in touch with the Anaya Spa concierge." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("[Anaya Spa] Contact form:", data);
    setSent(true);
  };

  return (
    <>
      <section className="bg-background pt-40 pb-14 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-4 font-serif text-5xl text-jade-deep md:text-7xl">Say hello.</h1>
          <p className="mt-6 text-muted-foreground">
            Our concierge team responds within two hours during business hours.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card p-8 md:col-span-2">
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: "Visit",
                  body: "412 Palm Grove Ave\nSanta Monica, CA 90402",
                },
                { icon: Phone, title: "Call", body: "(310) 555-0142" },
                { icon: Mail, title: "Email", body: "hello@anayaspa.com" },
                {
                  icon: Clock,
                  title: "Hours",
                  body: "Mon – Thu · 10 – 8\nFri – Sat · 9 – 9\nSunday · 10 – 6",
                },
              ].map((c) => (
                <div key={c.title} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade-deep/5 text-jade-deep">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <div className="eyebrow">{c.title}</div>
                    <div className="mt-1 whitespace-pre-line text-sm text-jade-deep">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 md:col-span-3 md:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h3 className="font-serif text-3xl text-jade-deep">Thank you.</h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Your message is in gentle hands. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <div className="md:col-span-2">
                  <Field label="Subject" name="subject" required />
                </div>
                <div className="md:col-span-2">
                  <label className="eyebrow mb-2 block">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
