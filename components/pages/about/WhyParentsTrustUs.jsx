import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { contact, trustIcons } from "@/lib/siteData";
import { PhoneIcon } from "@/components/ui/Icons";

const trustPoints = [
  { icon: trustIcons.languages, title: "Multilingual caregivers", text: "English, Telugu, Malayalam and more" },
  { icon: trustIcons.reliability, title: "Verified, background-checked", text: "Local babysitting services" },
  { icon: trustIcons.money, title: "Affordable, transparent", text: "Service charges" },
  { icon: trustIcons.guarantee, title: "Replacement guarantee", text: "If a match isn't right" },
];

// Animation: heading comes into focus from a blur, tiles rise in a wave with icons popping.
export default function WhyParentsTrustUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-12 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-float rounded-full bg-brand/20 blur-3xl [animation-duration:12s]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 animate-float rounded-full bg-azure/15 blur-3xl [animation-delay:-5s] [animation-duration:14s]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading variant="blur-in" tone="dark" eyebrow="Built on Trust" title="Why Parents Trust Us" />
          <Reveal variant="fade-up" delay={300} className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/contact">Talk to Our Team</Button>
            <Button href={contact.phoneHref} variant="ghostLight">
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </Button>
          </Reveal>
        </div>

        <Reveal variant="fade-up" duration={700} className="mt-8 grid gap-px overflow-hidden sm:mt-14 rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => (
            <Reveal
              key={point.icon}
              variant="fade-up"
              delay={150 + index * 130}
              className="group bg-ink p-6 hover:bg-[#333] sm:p-8"
            >
              <Reveal
                as="span"
                variant="zoom-in"
                delay={350 + index * 130}
                duration={700}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white"
              >
                <Image src={point.icon} alt="" width={40} height={40} className="transition-transform duration-500 ease-smooth group-hover:-rotate-8 group-hover:scale-110" />
              </Reveal>
              <h3 className="mt-5 text-lg font-bold text-white sm:mt-7">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-white/65">{point.text}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
