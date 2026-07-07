import { useState, type FormEvent } from "react";
import { services } from "@/lib/spa-data";
import { Check } from "lucide-react";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Frontend-only booking form — log to console per spec.
    console.log("[Anaya Spa] Booking request:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-ivory p-10 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold">
          <Check size={26} />
        </div>
        <h3 className="font-serif text-2xl text-jade-deep">Your request is received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          A member of our concierge team will confirm your appointment within 2 hours. Please check
          your inbox for a gentle confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
      <Field label="First name" name="firstName" required />
      <Field label="Last name" name="lastName" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" required />

      <div className={compact ? "" : "md:col-span-2"}>
        <label className="eyebrow mb-2 block">Preferred service</label>
        <select
          name="service"
          required
          defaultValue=""
          className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
        >
          <option value="" disabled>
            Select a treatment
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Not sure">Not sure — recommend for me</option>
        </select>
      </div>

      <Field label="Preferred date" name="date" type="date" required />
      <Field label="Preferred time" name="time" type="time" required />

      <div className={compact ? "" : "md:col-span-2"}>
        <label className="eyebrow mb-2 block">Notes for our therapists</label>
        <textarea
          name="notes"
          rows={4}
          placeholder="Any preferences, sensitivities, or a special occasion we should know about?"
          className="w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
        />
      </div>

      <div className={compact ? "" : "md:col-span-2"}>
        <button type="submit" className="btn-primary w-full">
          Request Appointment
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          This is a request — you will receive a confirmation call within 2 hours.
        </p>
      </div>
    </form>
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
