import { createFileRoute, Link } from "@tanstack/react-router";
import { packages, services } from "@/lib/spa-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Packages & Pricing — Anaya Spa" },
      {
        name: "description",
        content:
          "Half-day retreats, full-day sanctuaries, and couples escapes. Transparent pricing for every Anaya Spa ritual and curated package.",
      },
      { property: "og:title", content: "Packages & Pricing — Anaya Spa" },
      { property: "og:description", content: "Curated spa packages and à la carte pricing." },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <>
      <section className="bg-background pt-40 pb-14 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="eyebrow">Packages</div>
          <h1 className="mt-4 font-serif text-5xl text-jade-deep md:text-7xl">Curated retreats.</h1>
          <p className="mt-6 text-muted-foreground">
            Full-day sanctuaries and half-day retreats — a considered sequence of rituals,
            refreshment, and quiet.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-10 transition ${
                  p.featured
                    ? "border-gold bg-jade-deep text-ivory shadow-luxe md:-translate-y-4"
                    : "border-border bg-card"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-jade-deep">
                    Most loved
                  </div>
                )}
                <h3
                  className={`font-serif text-3xl ${p.featured ? "text-ivory" : "text-jade-deep"}`}
                >
                  {p.name}
                </h3>
                <div
                  className={`mt-1 text-xs uppercase tracking-[0.22em] ${p.featured ? "text-gold" : "text-muted-foreground"}`}
                >
                  {p.duration}
                </div>
                <div
                  className={`mt-8 font-serif text-6xl ${p.featured ? "text-gold" : "text-jade-deep"}`}
                >
                  {p.price}
                </div>
                <ul
                  className={`mt-8 space-y-3 text-sm ${p.featured ? "text-ivory/85" : "text-muted-foreground"}`}
                >
                  {p.inclusions.map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${p.featured ? "text-gold" : "text-jade-deep"}`}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  className={`btn-primary mt-10 ${p.featured ? "" : ""}`}
                  style={
                    p.featured
                      ? {
                          background: "var(--color-gold)",
                          borderColor: "var(--color-gold)",
                          color: "var(--color-jade-deep)",
                        }
                      : undefined
                  }
                >
                  Reserve
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <div className="text-center">
              <div className="eyebrow">À la carte</div>
              <h2 className="mt-3 font-serif text-4xl text-jade-deep md:text-5xl">
                Individual treatments
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
              {services.map((s) => (
                <div
                  key={s.slug}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 p-6 md:p-8"
                >
                  <div className="min-w-0">
                    <div className="font-serif text-xl text-jade-deep">{s.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {s.duration}
                    </div>
                  </div>
                  <div className="font-serif text-xl text-gold shrink-0">{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
