"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal animation. The element starts hidden and animates in
 * the first time it scrolls into view.
 *
 * <Reveal variant="fade-up" delay={120}>…</Reveal>
 * Use `as` to render a specific tag (li, article, h2…) so layouts stay intact.
 */
const variants = {
  "fade-up": ["opacity-0 translate-y-8", "opacity-100 translate-none"],
  "fade-down": ["opacity-0 -translate-y-8", "opacity-100 translate-none"],
  "from-left": ["opacity-0 -translate-x-12", "opacity-100 translate-none"],
  "from-right": ["opacity-0 translate-x-12", "opacity-100 translate-none"],
  "zoom-in": ["opacity-0 scale-90", "opacity-100 scale-none"],
  "zoom-out": ["opacity-0 scale-110", "opacity-100 scale-none"],
  "blur-in": ["opacity-0 [filter:blur(14px)] scale-[1.02]", "opacity-100 [filter:blur(0)] scale-none"],
  "flip-up": [
    "opacity-0 [transform:perspective(900px)_rotateX(22deg)_translateY(32px)]",
    "opacity-100 [transform:perspective(900px)_rotateX(0deg)_translateY(0)]",
  ],
  "tilt-in": ["opacity-0 translate-y-10 -rotate-3", "opacity-100 translate-none rotate-none"],
  "wipe-right": ["[clip-path:inset(0_100%_0_0)]", "[clip-path:inset(0_0%_0_0)]"],
  "wipe-left": ["[clip-path:inset(0_0_0_100%)]", "[clip-path:inset(0_0_0_0%)]"],
  "wipe-up": ["[clip-path:inset(100%_0_0_0)]", "[clip-path:inset(0%_0_0_0)]"],
  "draw-down": ["scale-y-0", "scale-y-100"],
};

// Clip-path variants start with zero visible area, so the browser never reports them
// as "in view". For these we watch the parent element instead.
const clipVariants = new Set(["wipe-right", "wipe-left", "wipe-up"]);

export default function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  duration = 900,
  className = "",
  children,
  ...props
}) {
  const ref = useRef(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = clipVariants.has(variant) ? element.parentElement ?? element : element;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [variant]);

  const [hiddenClasses, shownClasses] = variants[variant];

  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${isShown ? delay : 0}ms` }}
      className={`transition-all ease-smooth ${isShown ? shownClasses : hiddenClasses} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
