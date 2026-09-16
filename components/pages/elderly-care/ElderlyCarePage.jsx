import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ActivityIcon, HomeIcon, PillIcon, ShieldCheckIcon, UsersIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

// NOTE: Elderly care scope is still pending confirmation with Saravanan
// (live-in vs. hourly, medical qualifications, trial/replacement policy).
const included = [
  { label: "Daily living support", icon: HomeIcon, accent: "bg-azure/10 text-azure" },
  { label: "Mobility assistance", icon: ActivityIcon, accent: "bg-sun/10 text-sun" },
  { label: "Medication reminders", icon: PillIcon, accent: "bg-aqua/10 text-aqua" },
  { label: "Companionship", icon: UsersIcon, accent: "bg-brand/10 text-brand" },
];

// Animation: photo comes into focus from a blur, badge rises, included tiles slide in from the right.
export default function ElderlyCarePage() {
  return (
    <>
      <PageHero
        title="Elderly Care Services in Chennai"
        subtitle="Compassionate, background-verified care for your loved ones"
        image={images.elderlyHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Elderly Care", href: "/services/elderly-care" },
        ]}
      />

      <section className="overflow-hidden bg-sky py-12 sm:py-20 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col px-5 sm:px-8 md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
          <div className="relative order-2 mx-auto mb-2 mt-6 w-full sm:mt-8 max-w-md md:order-none md:col-span-5 md:my-0 md:max-w-none">
            <Reveal variant="blur-in" duration={1300} className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-float">
              <Image
                src={images.elderlyCareSecondary.src}
                alt={images.elderlyCareSecondary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className={`object-cover ${images.elderlyCareSecondary.position ?? "object-center"}`}
              />
            </Reveal>
            <Reveal
              variant="fade-up"
              delay={600}
              className="absolute -right-3 bottom-6 flex max-w-64 items-center gap-3 rounded-2xl bg-white p-4 shadow-float sm:-right-8 md:-right-4 lg:bottom-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-azure text-white">
                <ShieldCheckIcon className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold leading-snug text-ink">Same screening and background-verification process</span>
            </Reveal>
          </div>

          <div className="contents md:col-span-7 md:block">
            <SectionHeading className="order-1 md:order-none" variant="fade-up" eyebrow="Elderly Care" title="Trusted elderly care and geriatric caretaker services" />
            <Reveal as="p" variant="fade-up" delay={250} className="order-3 mt-5 text-[17px] sm:mt-6 leading-relaxed text-graphite md:order-none">
              Beyond baby care, SS Babysitter extends the same screening and background-verification process to elderly care in
              Chennai. Our caretakers can assist with daily routines, mobility support, medication reminders, companionship, and
              basic care — matched to your family&apos;s schedule, near you.
            </Reveal>

            <Reveal as="h3" variant="fade-up" delay={300} className="order-4 mt-7 text-sm sm:mt-10 font-bold uppercase tracking-[0.18em] text-muted md:order-none">
              What&apos;s included
            </Reveal>
            <ul className="order-5 mt-4 grid gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-2 md:order-none md:grid-cols-1 lg:grid-cols-2">
              {included.map(({ label, icon: Icon, accent }, index) => (
                <Reveal as="li" key={label} variant="from-right" delay={350 + index * 120}>
                  <div className="group flex h-full items-center gap-4 rounded-2xl border border-ink/5 bg-white p-4 shadow-card transition-all sm:p-5 duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-smooth group-hover:scale-110 ${accent}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-bold text-ink">{label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="fade-up" delay={500} className="order-6 mt-7 sm:mt-10 md:order-none">
              <Button href="/contact">Enquire Now</Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
