import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRightIcon, CheckCircleIcon, PhoneIcon, PinIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import { contact, images } from "@/lib/siteData";

const highlights = ["Background-verified caregivers", "Free 1-week trial", "Two physical offices"];

// Hero animations run on page load with pure CSS, so nothing waits on JavaScript.
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 animate-float rounded-full bg-brand/10 blur-3xl [animation-duration:9s]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-float rounded-full bg-azure/15 blur-3xl [animation-delay:-4s] [animation-duration:11s]" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-5 py-7 sm:px-8 sm:py-10 md:py-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Copy: each line rises in one after another.
            On stacked layouts this wrapper dissolves (contents) so the photo can sit between the text and the buttons. */}
        <div className="contents lg:col-span-6 lg:block">
          <span className="order-1 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1.5 text-[13px] font-semibold text-brand shadow-sm lg:order-none">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            SS Babysitter · Chennai
          </span>

          <h1 className="order-2 mt-4 animate-fade-up sm:mt-5 text-[clamp(2.1rem,4.2vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-ink [animation-delay:120ms] lg:order-none">
            Chennai&apos;s Trusted <span className="text-brand">Professional Nanny</span> Agency
          </h1>

          <p className="order-3 mt-3 max-w-xl sm:mt-4 animate-fade-up text-lg leading-relaxed text-graphite [animation-delay:240ms] lg:order-none">
            Reliable babysitting services and baby care taker support, near you in Chennai
          </p>

          <div className="order-5 mt-6 flex animate-fade-up sm:mt-7 flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:flex-wrap lg:order-none">
            <Button href="/contact">
              Get Started — Find Your Babysitter Today
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button href={contact.phoneHref} variant="outline">
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </Button>
          </div>

          <ul className="order-6 mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-4 sm:mt-7 sm:gap-y-3 sm:pt-5 lg:order-none">
            {highlights.map((item, index) => (
              <li
                key={item}
                style={{ animationDelay: `${520 + index * 110}ms` }}
                className="flex animate-fade-up items-center gap-2 text-sm font-semibold text-ink"
              >
                <CheckCircleIcon className="h-5 w-5 text-leaf" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo opens like a curtain; badges pop in, then gently float */}
        <div className="relative order-4 mx-auto mt-6 w-full sm:mt-8 max-w-lg lg:order-none lg:col-span-6 lg:mt-0 lg:max-w-none lg:pl-8">
          <div className="relative aspect-7/8 animate-image-reveal overflow-hidden rounded-4xl shadow-float [animation-delay:150ms] sm:aspect-4/3 sm:rounded-[2.5rem] lg:aspect-square lg:max-h-[30rem] lg:w-full">
            <Image
              src={images.homeHero.src}
              alt={images.homeHero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className={`animate-image-zoom object-cover [animation-delay:150ms] ${images.homeHero.position ?? "object-center"}`}
            />
          </div>

          <div className="absolute -left-1 bottom-4 animate-pop-in [animation-delay:900ms] sm:-left-6 sm:bottom-8">
            <div className="flex max-w-52 animate-float items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-float [animation-delay:1.7s] sm:max-w-60 sm:gap-3 sm:rounded-2xl sm:p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-leaf/15 text-leaf sm:h-11 sm:w-11 sm:rounded-xl">
                <ShieldCheckIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </span>
              <span className="text-xs font-bold leading-snug text-ink sm:text-sm">Background-checked and screened</span>
            </div>
          </div>

          <div className="absolute -right-2 top-6 hidden animate-pop-in [animation-delay:1100ms] sm:-right-4 sm:block">
            <div className="animate-float rounded-2xl bg-ink p-4 text-white shadow-float [animation-delay:-3s] [animation-duration:7s]">
              <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                <PinIcon className="h-3.5 w-3.5 text-brand-soft" />
                Two Physical Offices
              </span>
              <span className="mt-1 block font-bold">Anna Nagar · Urapakkam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
