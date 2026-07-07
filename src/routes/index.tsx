import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import { services, gallery } from "@/lib/spa-data";
import { Testimonials } from "@/components/Testimonials";
import { ArrowRight, Award, Leaf, Sparkles, DoorClosed, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const perks = [
  {
    icon: Award,
    title: "Certified Therapists",
    body: "Every practitioner trained in Bali, Thailand, and by the CA Board.",
  },
  {
    icon: Leaf,
    title: "Organic Products",
    body: "House-blended botanicals — never sulfates, parabens, or synthetics.",
  },
  {
    icon: Sparkles,
    title: "Tranquil Ambiance",
    body: "Curated soundscape, dim candlelight, teak & stone throughout.",
  },
  {
    icon: DoorClosed,
    title: "Private Suites",
    body: "Each treatment room is a fully enclosed sanctuary — never a curtain.",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesGrid />
      <TestimonialsSection />
      <GalleryStrip />
      <WhyChoose />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Anaya Spa tropical pavilion at dusk"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-jade-deep/60 via-jade-deep/30 to-jade-deep/80" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center text-ivory">
        <div className="fade-up">
          <span className="gold-rule" />
          <span className="mx-4 text-[0.72rem] uppercase tracking-[0.35em] text-gold">
            Santa Monica, California
          </span>
          <span className="gold-rule" />
        </div>
        <h1
          className="fade-up mt-8 font-serif text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.15s" }}
        >
          Where ancient ritual
          <br />
          meets modern stillness.
        </h1>
        <p
          className="fade-up mt-8 max-w-xl text-base text-ivory/85 md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          A luxury wellness sanctuary channeling the resort spa traditions of Bali, Thailand, and
          Java — reimagined for the modern American guest.
        </p>
        <div
          className="fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <Link
            to="/book"
            className="btn-primary"
            style={{
              background: "var(--color-gold)",
              borderColor: "var(--color-gold)",
              color: "var(--color-jade-deep)",
            }}
          >
            Reserve Your Ritual <ArrowRight size={14} />
          </Link>
          <Link to="/services" className="btn-ghost">
            Explore Treatments
          </Link>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="h-14 w-px bg-gradient-to-b from-transparent via-ivory/60 to-transparent" />
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
        <div className="relative">
          <img
            src={about}
            alt="Orchid on smooth river stones"
            width={1200}
            height={1500}
            loading="lazy"
            className="rounded-2xl object-cover shadow-luxe"
          />
          <div className="absolute -bottom-8 -right-4 hidden rounded-2xl border border-border bg-ivory p-8 shadow-soft md:block">
            <div className="font-serif text-5xl text-jade-deep">14</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Years of Practice
            </div>
          </div>
        </div>
        <div>
          <div className="eyebrow">Our Story</div>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-jade-deep md:text-5xl">
            A love letter to the healing
            <br />
            traditions of the East.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Founded by Anaya Prasad after a decade studying in Ubud and Chiang Mai, our spa is built
            on a single conviction: true wellness is not a service — it is a ritual, a pause, an
            offering.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every therapist is trained in the source lineage. Every oil is hand-blended. Every suite
            is a private pavilion. What emerges is a sanctuary that feels a world away, five minutes
            from the Pacific.
          </p>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-jade-deep transition hover:text-gold"
          >
            Read our story <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Signature Rituals</div>
          <h2 className="mt-4 font-serif text-4xl text-jade-deep md:text-5xl">
            Treatments crafted like heirlooms.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Six defining rituals, each rooted in a specific tradition and perfected over years of
            practice.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services"
              hash={s.slug}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-2xl text-jade-deep">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.2em]">
                  <span className="text-muted-foreground">{s.duration}</span>
                  <span className="text-gold">{s.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="eyebrow">Guest Reflections</div>
          <h2 className="mt-4 font-serif text-4xl text-jade-deep md:text-5xl">
            Words from our sanctuary.
          </h2>
        </div>
        <div className="mt-16">
          <Testimonials />
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  const strip = gallery.slice(0, 5);
  return (
    <section className="bg-jade-deep py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Inside the Sanctuary</div>
            <h2 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">
              Bamboo, orchid,
              <br />
              candle, and stone.
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-sm uppercase tracking-[0.22em] text-gold transition hover:text-ivory"
          >
            Full Gallery <ArrowRight size={14} className="ml-1 inline" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-5">
          {strip.map((g, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                style={{ aspectRatio: i === 0 ? "1 / 1" : "1 / 1" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Why Anaya</div>
          <h2 className="mt-4 font-serif text-4xl text-jade-deep md:text-5xl">
            The considered details.
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-8 transition hover:border-gold hover:shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-jade-deep/5 text-jade-deep">
                <p.icon size={22} />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-jade-deep">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("[Anaya Spa] Newsletter signup:", data);
    setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="eyebrow">Quiet Missives</div>
        <h2 className="mt-4 font-serif text-4xl text-jade-deep md:text-5xl">
          Seasonal rituals, delivered gently.
        </h2>
        <p className="mt-5 text-muted-foreground">
          One thoughtful email a month — new treatments, member offers, and reflections from our
          practice. Never noise.
        </p>

        {done ? (
          <p className="mt-10 font-serif text-2xl text-gold">
            Thank you — welcome to the sanctuary.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-md gap-2">
            <div className="relative flex-1">
              <Mail
                className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full rounded-full border border-input bg-card py-3 pr-4 pl-11 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
