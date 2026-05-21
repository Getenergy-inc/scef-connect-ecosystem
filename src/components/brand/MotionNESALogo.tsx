import { useEffect, useRef, useState } from "react";
import nesaLogo from "@/assets/nesa-africa-logo.jpg";
import { cn } from "@/lib/utils";

interface MotionNESALogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
}

/**
 * NESA-Africa brand logo with a premium award-style entrance.
 * - Soft fade + scale 0.94 → 1 on viewport enter.
 * - One-shot gold shimmer arc sweeping across the mark on entrance.
 * - Subtle gold glow ring around the circular logo.
 * - Soft lift + light tilt on hover (max scale 1.03). No spinning.
 * - Respects prefers-reduced-motion.
 * - The logo image itself is never recolored, distorted, or restyled.
 */
export const MotionNESALogo = ({
  className,
  imgClassName,
  alt = "NESA-Africa official program logo",
}: MotionNESALogoProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in-view={inView ? "true" : "false"}
      className={cn(
        "group relative inline-flex items-center justify-center [perspective:800px]",
        // Hover lift + subtle tilt (motion-safe only)
        "transition-[transform,filter] duration-500 ease-out",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.03]",
        "motion-safe:hover:[transform:translateY(-2px)_scale(1.03)_rotateX(2deg)_rotateY(-2deg)]",
        "motion-safe:hover:[filter:drop-shadow(0_10px_18px_hsl(45_92%_42%/0.25))]",
        // Entrance fade/scale
        "motion-safe:opacity-0 motion-safe:scale-[0.94]",
        "motion-safe:data-[in-view=true]:opacity-100 motion-safe:data-[in-view=true]:scale-100",
        "motion-safe:[transition:opacity_1.2s_ease-out,transform_1.2s_ease-out]",
        className
      )}
    >
      {/* Subtle gold glow ring — sits behind the logo, never on top */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[6%] rounded-full",
          "shadow-[0_0_24px_2px_hsl(45_92%_42%/0.18)]",
          "opacity-0 motion-safe:group-data-[in-view=true]:opacity-100",
          "transition-opacity duration-700"
        )}
      />

      {/* Logo image — untouched */}
      <img
        src={nesaLogo}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          "relative z-10 max-h-full max-w-full object-contain select-none",
          imgClassName
        )}
      />

      {/* One-shot gold shimmer arc across the mark */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-full",
          "opacity-0 motion-safe:group-data-[in-view=true]:animate-[nesa-shimmer_1800ms_ease-out_400ms_1_forwards]"
        )}
        style={{
          WebkitMaskImage: "radial-gradient(circle, #000 60%, transparent 72%)",
          maskImage: "radial-gradient(circle, #000 60%, transparent 72%)",
        }}
      >
        <span
          className="absolute top-0 -left-1/2 h-full w-1/2 rotate-12"
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, hsl(45 92% 65% / 0) 30%, hsl(45 92% 70% / 0.55) 50%, hsl(45 92% 65% / 0) 70%, transparent 100%)",
            animation: "nesa-shimmer-sweep 1800ms ease-out 400ms 1 forwards",
          }}
        />
      </span>

      <style>{`
        @keyframes nesa-shimmer {
          0% { opacity: 0; }
          15% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes nesa-shimmer-sweep {
          0% { transform: translateX(0) rotate(12deg); }
          100% { transform: translateX(320%) rotate(12deg); }
        }
      `}</style>
    </div>
  );
};

export default MotionNESALogo;
