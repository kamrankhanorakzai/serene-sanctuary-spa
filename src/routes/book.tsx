import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/BookingForm";
import couples from "@/assets/couples.jpg";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Your Ritual — Anaya Spa" },
      {
        name: "description",
        content:
          "Reserve your spa treatment at Anaya Spa in Santa Monica. Request an appointment and our concierge will confirm within 2 hours.",
      },
      { property: "og:title", content: "Book Your Ritual — Anaya Spa" },
      { property: "og:description", content: "Request your appointment at Anaya Spa." },
    ],
  }),
  component: Book,
});

function Book() {
  return (
    <>
      <section className="relative flex min-h-[42svh] items-center justify-center overflow-hidden pt-32 pb-14">
        <img
          src={couples}
          alt="Private spa pavilion"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-jade-deep/75" />
        <div className="relative z-10 px-6 text-center text-ivory fade-up">
          <div className="eyebrow">Reservations</div>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl">Book your ritual.</h1>
          <p className="mx-auto mt-4 max-w-lg text-ivory/85">
            Share a few details and our concierge will confirm your appointment within two hours.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft md:p-12">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
