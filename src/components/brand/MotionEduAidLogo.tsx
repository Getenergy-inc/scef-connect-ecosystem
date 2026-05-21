import { useEffect, useRef, useState } from "react";
import eduaidLogo from "@/assets/eduaid-africa-logo.jpg";
import { cn } from "@/lib/utils";

interface MotionEduAidLogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
  /** Show accent line sweep under the logo on entrance. Default true. */
  withAccentLine?: boolean;
}

/**
 * EduAid-Africa brand logo with a subtle institutional entrance animation.
 * - Soft fade + slight rise + gentle scale (0.96 → 1) on viewport enter.
 * - Optional thin green accent line sweep beneath the mark.
 * - Soft lift + shadow on hover (max scale 1.03).
 * - Respects prefers-reduced-motion (renders static).
 * - The logo image itself is never recolored, distorted, or restyled.
 */
export const MotionEduAidLogo = ({
  className,
  imgClassName,
  alt = "EduAid-Africa official program logo",
  withAccentLine = true,
}: MotionEduAidLogoProps) => {
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
        "group relative inline-flex items-center justify-center",
        // Hover lift (disabled under reduced motion via CSS)
        "transition-[transform,box-shadow] duration-300 ease-out",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.03]",
        "motion-safe:hover:[filter:drop-shadow(0_6px_14px_hsl(145_63%_35%/0.18))]",
        // Entrance
        "motion-safe:opacity-0 motion-safe:translate-y-2 motion-safe:scale-[0.96]",
        "motion-safe:data-[in-view=true]:opacity-100 motion-safe:data-[in-view=true]:translate-y-0 motion-safe:data-[in-view=true]:scale-100",
        "motion-safe:[transition:opacity_1s_ease-out,transform_1s_ease-out]",
        className
      )}
    >
      <img
        src={eduaidLogo}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          "max-h-full max-w-full object-contain select-none",
          imgClassName
        )}
      />

      {withAccentLine && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-[12%] right-[12%] bottom-[6%] h-[2px] rounded-full",
            "bg-[hsl(145_63%_35%)]/70",
            // Sweep in once on entrance
            "origin-left scale-x-0",
            "motion-safe:group-data-[in-view=true]:animate-[eduaid-accent_900ms_ease-out_250ms_forwards]"
          )}
        />
      )}

      <style>{`
        @keyframes eduaid-accent {
          0% { transform: scaleX(0); opacity: 0; }
          60% { opacity: 1; }
          100% { transform: scaleX(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default MotionEduAidLogo;
