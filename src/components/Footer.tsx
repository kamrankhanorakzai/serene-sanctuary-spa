import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-jade-deep text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="font-serif text-3xl">
              Anaya <span className="text-gold">·</span> Spa
            </div>
            <p className="mt-4 max-w-xs text-sm text-ivory/70">
              A modern American sanctuary rooted in the timeless wellness rituals of Southeast Asia.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-ivory/70 transition hover:text-gold"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-ivory/70 transition hover:text-gold"
              >
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="YouTube" className="text-ivory/70 transition hover:text-gold">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Visit</div>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0 text-gold" />
                <span>412 Palm Grove Ave · Santa Monica, CA 90402</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                <span>(310) 555-0142</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-gold" />
                <span>hello@anayaspa.com</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Hours</div>
            <ul className="space-y-1.5 text-sm text-ivory/75">
              <li className="flex justify-between">
                <span>Mon – Thu</span>
                <span>10 – 8</span>
              </li>
              <li className="flex justify-between">
                <span>Fri – Sat</span>
                <span>9 – 9</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10 – 6</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-ivory/75">
              <li>
                <Link to="/services" className="transition hover:text-gold">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="transition hover:text-gold">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="transition hover:text-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-gold">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/book" className="transition hover:text-gold">
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-ivory/10">
          <div className="relative h-56 w-full bg-gradient-to-br from-jade to-jade-deep">
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,var(--color-gold)_0,transparent_40%),radial-gradient(circle_at_80%_70%,var(--color-gold-soft)_0,transparent_40%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-ivory/10 px-6 py-3 text-xs uppercase tracking-[0.28em] text-ivory/80 backdrop-blur-sm">
                <MapPin size={14} className="mr-2 inline text-gold" />
                Map — Santa Monica, CA
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Anaya Spa. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy
            </a>
            <a href="#" className="hover:text-gold">
              Terms
            </a>
            <a href="#" className="hover:text-gold">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
