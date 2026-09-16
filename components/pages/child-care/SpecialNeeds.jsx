import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CheckCircleIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

const conditions = [
  "Anxiety disorder",
  "Visual impairment",
  "Asthma",
  "Hemophilia",
  "Hearing impairment",
  "Language disorders",
  "Food allergies",
  "Physical limitations",
  "Sleep disorders",
];

// Animation: heading slides from the left, photo wipes open from the right, condition tiles ripple in.
export default function SpecialNeeds() {
  return (
    <section className="bg-sky py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-end lg:gap-16">
          {/* Dissolves below lg so the photo sits between the heading and the intro text */}
          <div className="contents lg:block">
            <SectionHeading className="order-1 lg:order-none" variant="from-left" eyebrow="Every Child Is Unique" title="Special Needs Babysitting" />
            <Reveal as="p" variant="fade-up" delay={240} className="order-3 mt-5 max-w-2xl sm:mt-6 text-[17px] leading-relaxed text-graphite lg:order-none lg:mt-5">
              Every child is unique, and some need extra attention. Our Special Needs programme matches families with babysitters
              experienced in caring for children with conditions such as:
            </Reveal>
          </div>
          <Reveal variant="wipe-left" duration={1300} className="relative order-2 mt-6 aspect-video sm:mt-8 overflow-hidden rounded-4xl shadow-card lg:order-none lg:mt-0">
            <Image
              src={images.specialNeeds.src}
              alt={images.specialNeeds.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${images.specialNeeds.position ?? "object-center"}`}
            />
          </Reveal>
        </div>

        <ul className="mt-6 grid gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {conditions.map((condition, index) => (
            <Reveal
              as="li"
              key={condition}
              variant="zoom-in"
              delay={index * 80}
              duration={700}
              className="group flex items-center gap-3 rounded-2xl border border-ink/5 bg-white px-4 py-3 font-semibold text-ink shadow-card sm:px-5 sm:py-4 hover:border-azure/30 hover:shadow-card-hover"
            >
              <CheckCircleIcon className="h-5 w-5 shrink-0 text-azure transition-transform duration-500 ease-smooth group-hover:scale-125" />
              {condition}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
