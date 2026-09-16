import Reveal from "./Reveal";

/**
 * Section title: small eyebrow label, bold heading and optional intro text.
 * tone="dark" is for headings placed on the dark ink background.
 * `variant` sets how the heading animates in (see Reveal).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  variant = "fade-up",
  animate = true,
  as: Tag = "h2",
  className = "",
}) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  // Static version (no scroll animation)
  if (!animate) {
    return (
      <div className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
        {eyebrow && (
          <p className={`mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] sm:mb-4 ${isDark ? "text-brand-soft" : "text-brand"}`}>
            <span className="h-px w-8 bg-current" aria-hidden />
            {eyebrow}
          </p>
        )}
        <Tag className={`text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight ${isDark ? "text-white" : "text-ink"}`}>
          {title}
        </Tag>
        {subtitle && <p className={`mt-3 text-[17px] leading-relaxed sm:mt-5 ${isDark ? "text-white/70" : "text-graphite"}`}>{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <Reveal
          as="p"
          variant="fade-up"
          duration={700}
          className={`mb-3 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] sm:mb-4 ${isDark ? "text-brand-soft" : "text-brand"}`}
        >
          <Reveal as="span" variant="wipe-right" delay={250} duration={800} className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </Reveal>
      )}

      <Reveal
        as={Tag}
        variant={variant}
        delay={120}
        className={`text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold leading-[1.12] tracking-tight ${isDark ? "text-white" : "text-ink"}`}
      >
        {title}
      </Reveal>

      {subtitle && (
        <Reveal as="p" variant="fade-up" delay={240} className={`mt-3 text-[17px] leading-relaxed sm:mt-5 ${isDark ? "text-white/70" : "text-graphite"}`}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
