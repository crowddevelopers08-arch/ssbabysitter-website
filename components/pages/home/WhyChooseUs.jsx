import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRightIcon, BuildingIcon, GiftIcon, LanguagesIcon, PinIcon, UsersIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

// Smaller feature cards (the "All Over Chennai" card is the large highlighted one)
const features = [
  {
    title: "Two Physical Offices",
    text: "Meet our team face-to-face in Anna Nagar or Urapakkam",
    icon: BuildingIcon,
    iconClass: "bg-azure/10 text-azure",
    tags: ["Anna Nagar", "Urapakkam"],
  },
  {
    title: "Daycare Partnerships",
    text: "Trusted by creches such as Casagrand Creche",
    icon: UsersIcon,
    iconClass: "bg-aqua/10 text-aqua",
    tags: ["Casagrand Creche"],
  },
  {
    title: "Free 1-Week Trial",
    text: "With every babysitter placement, plus replacements when needed",
    icon: GiftIcon,
    iconClass: "bg-sun/10 text-sun",
  },
  {
    title: "Multilingual Caregivers",
    text: "Background-checked and screened",
    icon: LanguagesIcon,
    iconClass: "bg-leaf/10 text-leaf",
  },
];

// Animation: highlight photo card wipes open, feature cards flip up in sequence.
export default function WhyChooseUs() {
  return (
    <section className="bg-sky py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading variant="blur-in" eyebrow="SS Babysitter" title="Why Chennai Families Choose Us" />
          <Reveal variant="from-right" delay={300} className="shrink-0 self-start lg:self-auto">
            <Button href="/contact" variant="dark">
              Get Started
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Highlight card */}
          <Reveal
            as="article"
            variant="wipe-right"
            duration={1200}
            className="group relative isolate flex min-h-112 flex-col sm:min-h-96 justify-between overflow-hidden rounded-3xl bg-brand p-8 text-white md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <Image
              src={images.allOverChennai.src}
              alt={images.allOverChennai.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className={`-z-20 object-cover transition-transform duration-700 group-hover:scale-105 ${images.allOverChennai.position ?? "object-center"}`}
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-brand from-10% via-brand/60 via-40% to-transparent to-75%" aria-hidden />

            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <PinIcon className="h-7 w-7" />
            </span>
            <div className="relative mt-24 sm:mt-40">
              <h3 className="text-3xl font-extrabold tracking-tight">All Over Chennai</h3>
              <p className="mt-3 text-lg leading-relaxed text-white/85">
                Sitter services near me, wherever you live in the city
              </p>
            </div>
          </Reveal>

          {features.map(({ title, text, icon: Icon, iconClass, tags }, index) => (
            <Reveal key={title} variant="flip-up" delay={250 + index * 120}>
              <article className="group h-full rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-110 ${iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowRightIcon className="h-5 w-5 -rotate-45 text-line transition-colors group-hover:text-brand" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{text}</p>
                {tags && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-sand px-3 py-1 text-xs font-semibold text-graphite">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
