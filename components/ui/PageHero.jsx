import Image from "next/image";
import Link from "next/link";

/**
 * Split banner at the top of every inner page: text on the left, framed photo on the right.
 * `breadcrumbs` is a list of { label, href }; the last item is the current page.
 * Animates on page load with pure CSS (text rises in sequence, photo frame opens).
 */
export default function PageHero({ title, subtitle, image, breadcrumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="pointer-events-none absolute -right-40 -top-40 h-112 w-112 animate-float rounded-full bg-azure/10 blur-3xl [animation-duration:10s]" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-5 py-8 sm:px-8 sm:py-12 md:grid md:grid-cols-2 md:items-center md:gap-10 md:py-16 lg:gap-16 lg:py-20">
        {/* On phones this wrapper dissolves so the photo can sit between the heading and the subtitle */}
        <div className="contents md:block">
          {breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="order-1 mb-4 animate-fade-up sm:mb-6 md:order-none">
              <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-4 py-1.5 text-[13px] font-medium text-muted">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.label} className="flex items-center gap-2">
                      {isLast ? (
                        <span className="font-semibold text-brand" aria-current="page">
                          {crumb.label}
                        </span>
                      ) : (
                        <>
                          <Link href={crumb.href} className="transition-colors hover:text-ink">
                            {crumb.label}
                          </Link>
                          <span className="text-line" aria-hidden>
                            /
                          </span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <h1 className="order-2 animate-fade-up text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight text-ink [animation-delay:120ms] md:order-none">
            {title}
          </h1>

          {subtitle && (
            <p className="order-4 max-w-xl animate-fade-up text-lg leading-relaxed text-graphite [animation-delay:240ms] md:order-none md:mt-5 lg:text-xl">{subtitle}</p>
          )}

          <div className="order-5 mt-5 flex items-center gap-2 sm:mt-8 md:order-none" aria-hidden>
            <span className="h-1 w-12 origin-left animate-grow-x rounded-full bg-brand [animation-delay:450ms]" />
            <span className="h-1 w-6 origin-left animate-grow-x rounded-full bg-azure [animation-delay:600ms]" />
            <span className="h-1 w-3 origin-left animate-grow-x rounded-full bg-sun [animation-delay:750ms]" />
          </div>
        </div>

        <div className="relative order-3 mx-auto mb-6 mt-5 sm:mb-8 sm:mt-7 w-full max-w-xl md:order-none md:my-0 md:max-w-none">
          <div
            className="absolute -bottom-4 -right-4 h-full w-full animate-settle rounded-4xl bg-brand/10 [animation-delay:500ms] sm:-bottom-5 sm:-right-5"
            aria-hidden
          />
          <div className="relative aspect-16/11 animate-image-reveal overflow-hidden rounded-4xl shadow-float [animation-delay:100ms]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`animate-image-zoom object-cover [animation-delay:100ms] ${image.position ?? "object-center"}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
