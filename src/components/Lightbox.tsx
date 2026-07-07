import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, images.length, onClose, onIndexChange]);

  if (index === null) return null;
  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-jade-deep/95 p-6 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory hover:border-gold hover:text-gold"
      >
        <X size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index - 1 + images.length) % images.length);
        }}
        aria-label="Previous"
        className="absolute left-6 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory hover:border-gold hover:text-gold"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((index + 1) % images.length);
        }}
        aria-label="Next"
        className="absolute right-6 grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory hover:border-gold hover:text-gold"
      >
        <ChevronRight size={20} />
      </button>
      <img
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-luxe fade-up"
      />
    </div>
  );
}
