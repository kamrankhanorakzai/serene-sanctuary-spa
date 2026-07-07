import { createFileRoute, Link } from "@tanstack/react-router";
import about from "@/assets/about.jpg";
import pool from "@/assets/pool.jpg";
import candles from "@/assets/candles.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Anaya Spa" },
      {
        name: "description",
        content:
          "Founded by Anaya Prasad after a decade studying traditional wellness in Bali and Chiang Mai. Meet the practice and philosophy behind Anaya Spa.",
      },
      { property: "og:title", content: "Our Story — Anaya Spa" },
      {
        property: "og:description",
        content: "The philosophy and practice behind Anaya Spa in Santa Monica.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative flex h-[60svh] min-h-[420px] items-center justify-center overflow-hidden">
        <img
          src={candles}
          alt="Candle-lit lounge"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-jade-deep/70" />
        <div className="relative z-10 px-6 text-center text-ivory fade-up">
          <div className="eyebrow">Our Story</div>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl">A ten-year pilgrimage.</h1>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <img
              src={about}
              alt="Founder still life"
              loading="lazy"
              className="rounded-2xl shadow-luxe"
            />
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow">Founder</div>
            <h2 className="mt-4 font-serif text-4xl text-jade-deep md:text-5xl">Anaya Prasad</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Raised between Mumbai and San Francisco, Anaya first encountered traditional Balinese
              massage during a gap year in Ubud in 2011. What began as curiosity became a decade of
              formal study — training with master healers in Bali, Chiang Mai, and Kerala.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              She opened Anaya Spa in 2019 with a simple intention: to bring the slow, sacred pace
              of the eastern resort spa to guests at home in California, without a single detail
              lost in translation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="eyebrow">Our Philosophy</div>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-jade-deep md:text-5xl">
            &ldquo;Slowness is the luxury.
            <br />
            Ritual is the medicine.&rdquo;
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 text-left md:grid-cols-3">
            {[
              {
                t: "Lineage",
                b: "Every technique is learned from source-country masters, not weekend certifications.",
              },
              {
                t: "Purity",
                b: "Oils, scrubs, and serums are hand-blended in-house from organic single-origin ingredients.",
              },
              {
                t: "Sanctuary",
                b: "Fully private suites — never curtained rooms — with dedicated bath, robe, and lounge.",
              },
            ].map((v) => (
              <div key={v.t} className="border-l border-gold/50 pl-6">
                <h3 className="font-serif text-2xl text-jade-deep">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src={pool}
          alt="Sunset lotus pool"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-jade-deep/75" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center text-ivory md:py-32">
          <h2 className="font-serif text-4xl md:text-5xl">Ready to begin?</h2>
          <p className="mt-5 text-ivory/80">
            Reserve your first ritual and receive a complimentary herbal welcome tea.
          </p>
          <Link
            to="/book"
            className="btn-primary mt-8"
            style={{
              background: "var(--color-gold)",
              borderColor: "var(--color-gold)",
              color: "var(--color-jade-deep)",
            }}
          >
            Reserve Your Ritual
          </Link>
        </div>
      </section>
    </>
  );
}
