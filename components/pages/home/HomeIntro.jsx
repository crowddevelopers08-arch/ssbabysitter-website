import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { QuoteIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

// Animation: photos wipe upward one after another, copy slides in from the right.
export default function HomeIntro() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col px-5 sm:px-8 md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-20">
        {/* Staggered photos */}
        <div className="order-2 mx-auto mt-6 grid sm:mt-8 w-full max-w-xl grid-cols-5 gap-3 sm:gap-4 md:order-none md:mt-0 md:max-w-none">
          <Reveal variant="wipe-up" duration={1200} className="relative col-span-3 aspect-3/4 overflow-hidden rounded-3xl shadow-card">
            <Image
              src={images.homeIntro.src}
              alt={images.homeIntro.alt}
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              className={`object-cover transition-transform duration-700 ease-smooth hover:scale-105 ${images.homeIntro.position ?? "object-center"}`}
            />
          </Reveal>
          <div className="col-span-2 flex flex-col gap-3 pt-10 sm:gap-4 sm:pt-16">
            <Reveal variant="wipe-up" delay={220} duration={1200} className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-card">
              <Image
                src={images.homeIntroSmall.src}
                alt={images.homeIntroSmall.alt}
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                className={`object-cover transition-transform duration-700 ease-smooth hover:scale-105 ${images.homeIntroSmall.position ?? "object-center"}`}
              />
            </Reveal>
            <Reveal variant="zoom-in" delay={450} className="rounded-3xl bg-azure p-4 text-white sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">Anna Nagar · Urapakkam</p>
              <p className="mt-2 text-sm font-extrabold leading-tight sm:text-lg">Meet our team face-to-face</p>
            </Reveal>
          </div>
        </div>

        {/* Copy (dissolves on phones so the photos sit under the heading) */}
        <div className="contents md:block">
          <SectionHeading className="order-1 md:order-none" variant="from-right" eyebrow="Babysitting Services" title="Background-verified baby care takers across Chennai" />
          <div className="order-3 mt-5 space-y-4 sm:mt-6 sm:space-y-5 text-[17px] leading-relaxed text-graphite md:order-none">
            <Reveal as="p" variant="from-right" delay={200}>
              When you need a <strong className="font-semibold text-ink">baby sitter in Chennai</strong> you can actually rely
              on, SS Babysitter connects families with background-verified, trained caregivers across the city. As a
              professional nanny agency with two physical offices — in Anna Nagar and Urapakkam — we&apos;ve built a trusted
              network of babysitters in Chennai, matched to your home, your schedule, and your child&apos;s needs.
            </Reveal>
            <Reveal as="p" variant="from-right" delay={320}>
              Whether you need a full-time baby care taker in Chennai, occasional support, or specialised care for a child
              with additional needs, our babysitting services are built around trust, safety, and consistency.
            </Reveal>
          </div>

          <Reveal as="figure" variant="blur-in" delay={450} className="order-4 mt-6 flex gap-4 rounded-2xl border border-brand/10 bg-blush p-5 sm:mt-8 sm:p-6 md:order-none">
            <QuoteIcon className="h-8 w-8 shrink-0 text-brand" />
            <blockquote className="text-lg font-bold leading-snug text-ink">
              No apps, no strangers — just verified caregivers and a team you can meet in person.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
