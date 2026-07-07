import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { gallery } from "@/lib/spa-data";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Anaya Spa" },
      {
        name: "description",
        content:
          "Bamboo, orchids, candles, and stone. A visual walk through Anaya Spa's private pavilions and treatment suites.",
      },
      { property: "og:title", content: "Gallery — Anaya Spa" },
      {
        property: "og:description",
        content: "Inside the sanctuary — a visual journey through Anaya Spa.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <section className="bg-background pt-40 pb-14 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="eyebrow">The Sanctuary</div>
          <h1 className="mt-4 font-serif text-5xl text-jade-deep md:text-7xl">Gallery</h1>
          <p className="mt-6 text-muted-foreground">
            A visual walk through our private pavilions, treatment suites, and the little details
            that make Anaya feel a world away.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-2xl"
                aria-label={`Open ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={gallery.map((g) => ({ src: g.src, alt: g.alt }))}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
