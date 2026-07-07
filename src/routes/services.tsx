import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/lib/spa-data";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Treatments — Anaya Spa" },
      {
        name: "description",
        content:
          "Signature spa rituals: Thai and Balinese massage, botanical facials, hot stone therapy, body scrubs, and private couples suites in Santa Monica.",
      },
      { property: "og:title", content: "Signature Rituals — Anaya Spa" },
      {
        property: "og:description",
        content: "Six defining spa treatments rooted in the lineage of Southeast Asian wellness.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="bg-background pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="eyebrow">Signature Rituals</div>
          <h1 className="mt-4 font-serif text-5xl text-jade-deep md:text-7xl">
            Six rituals. One sanctuary.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Each treatment is delivered in a fully private suite, begins with a welcome tea
            ceremony, and closes with a quiet moment in the relaxation lounge.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-24">
            {services.map((s, i) => (
              <article
                id={s.slug}
                key={s.slug}
                className={`grid scroll-mt-32 gap-10 md:grid-cols-2 md:items-center md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-2xl shadow-luxe">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="eyebrow">Ritual · {String(i + 1).padStart(2, "0")}</div>
                  <h2 className="mt-3 font-serif text-4xl text-jade-deep md:text-5xl">{s.name}</h2>
                  <p className="mt-3 font-serif text-xl italic text-gold">{s.tagline}</p>
                  <p className="mt-6 leading-relaxed text-muted-foreground">{s.description}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-gold" />
                      <span className="text-muted-foreground">{s.duration}</span>
                    </div>
                    <div className="text-lg font-serif text-jade-deep">{s.price}</div>
                    <Link to="/book" className="btn-primary ml-auto">
                      Book
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
