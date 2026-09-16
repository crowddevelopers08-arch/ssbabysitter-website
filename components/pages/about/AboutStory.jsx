import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ShieldCheckIcon, UsersIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

const coverage = ["Infants", "Toddlers", "Kindergarteners", "School-going children", "Kids with special needs"];

// Animation: copy slides in from the left, chips pop in one by one, photo settles from a zoom,
// daycare banner opens from left to right.
export default function AboutStory() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
          <div className="contents md:col-span-6 md:block">
            <SectionHeading className="order-1 md:order-none" variant="from-left" eyebrow="About SS Babysitter" title="Professional Nanny Services in Chennai" />
            <div className="order-3 mt-5 space-y-4 sm:mt-6 sm:space-y-5 text-[17px] leading-relaxed text-graphite md:order-none">
              <Reveal as="p" variant="from-left" delay={200}>
                SS Babysitter is a professional nanny agency built specifically for Chennai families. We&apos;re not a side
                service bolted onto a general staffing company — babysitting in Chennai is the only business we run, backed
                by two physical offices, background-checked caregivers, and daycare centres who trust us with their own
                staffing.
              </Reveal>
              <Reveal as="p" variant="from-left" delay={320}>
                Every babysitter we place goes through screening and background verification, so you can bring a baby care
                taker into your home with real confidence — not just a profile on an app.
              </Reveal>
            </div>

            <Reveal variant="fade-up" delay={380} className="order-4 mt-6 rounded-2xl border border-sun/15 bg-sand p-5 sm:mt-8 sm:p-6 md:order-none">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <UsersIcon className="h-5 w-5 text-azure" />
                Our network covers
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coverage.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item}
                    variant="zoom-in"
                    delay={550 + index * 90}
                    duration={600}
                    className="rounded-lg border border-ink/5 bg-white px-3 py-1.5 text-sm font-semibold text-graphite"
                  >
                    {item}
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative order-2 mx-auto mb-8 mt-6 w-full sm:mt-8 max-w-xl md:order-none md:col-span-6 md:my-0 md:max-w-none">
            <Reveal variant="zoom-out" duration={1300} className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-float sm:aspect-4/3 md:aspect-4/5">
              <Image
                src={images.aboutStory.src}
                alt={images.aboutStory.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover ${images.aboutStory.position ?? "object-center"}`}
              />
            </Reveal>
            <Reveal
              variant="fade-up"
              delay={500}
              className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-float sm:left-auto sm:right-8 sm:max-w-xs md:-right-4 md:left-auto lg:right-8"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <ShieldCheckIcon className="h-6 w-6" />
              </span>
              <p className="font-bold leading-snug text-ink">Screening and background verification for every babysitter</p>
            </Reveal>
          </div>
        </div>

        {/* Daycare partnership highlight */}
        <Reveal
          variant="wipe-right"
          duration={1300}
          className="mt-12 grid overflow-hidden rounded-3xl bg-azure sm:mt-20 md:mt-24 md:rounded-[2.5rem] lg:grid-cols-2"
        >
          <div className="contents lg:flex lg:flex-col lg:justify-center lg:p-14">
            <p className="order-1 inline-flex items-center gap-3 px-6 pt-6 text-xs font-bold uppercase tracking-[0.22em] text-white/80 sm:px-10 sm:pt-10 md:px-14 md:pt-14 lg:order-none lg:p-0">
              <span className="h-px w-8 bg-current" aria-hidden />
              Daycare Partnerships
            </p>
            <p className="order-3 px-6 pb-6 pt-5 text-xl font-bold leading-snug text-white sm:px-10 sm:pb-10 sm:text-2xl md:px-14 md:pb-14 md:text-[1.75rem] lg:order-none lg:mt-5 lg:p-0">
              We also partner with daycare centres and creches across the city, including{" "}
              <span className="underline decoration-white/50 decoration-2 underline-offset-4">Casagrand Creche</span>, providing
              dependable, background-checked staffing they can count on every single day.
            </p>
          </div>
          <div className="relative order-2 mt-5 min-h-60 overflow-hidden sm:min-h-80 lg:order-none lg:mt-0 lg:min-h-full">
            <Image
              src={images.aboutDaycare.src}
              alt={images.aboutDaycare.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-transform duration-1000 ease-smooth hover:scale-105 ${images.aboutDaycare.position ?? "object-center"}`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
