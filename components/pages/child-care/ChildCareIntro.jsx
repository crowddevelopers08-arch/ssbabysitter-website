import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon, HeartIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

const careTasks = ["Feeding", "Bathing", "Massaging", "Laundering their clothes", "Meaningful engagement"];

// Animation: photo tilts upright into place, badge pops, care tasks cascade in, habit box zooms.
export default function ChildCareIntro() {
  return (
    <section className="overflow-hidden bg-white py-12 sm:py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col px-5 sm:px-8 md:grid md:grid-cols-12 md:items-center md:gap-10 lg:gap-16">
        <div className="relative order-2 mx-auto mb-2 mt-6 w-full sm:mt-8 max-w-md md:order-none md:col-span-5 md:my-0 md:max-w-none">
          <Reveal variant="tilt-in" duration={1100} className="relative aspect-4/5 overflow-hidden rounded-[2.5rem] shadow-float">
            <Image
              src={images.childCareIntro.src}
              alt={images.childCareIntro.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={`object-cover transition-transform duration-1000 ease-smooth hover:scale-105 ${images.childCareIntro.position ?? "object-center"}`}
            />
          </Reveal>
          <Reveal
            variant="zoom-in"
            delay={600}
            duration={700}
            className="absolute -right-3 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-float sm:-right-8 md:-right-4 lg:bottom-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
              <HeartIcon className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold leading-snug text-ink">
              Bonding &amp;
              <br />
              safeguarding
            </span>
          </Reveal>
        </div>

        <div className="contents md:col-span-7 md:block">
          <SectionHeading className="order-1 md:order-none" variant="fade-down" eyebrow="Child Care" title="Professional child care in Chennai for every age" />
          <Reveal as="p" variant="fade-up" delay={250} className="order-3 mt-5 text-[17px] sm:mt-6 leading-relaxed text-graphite md:order-none">
            Babies and growing children are needy in the best way, and our child care covers everything that comes with it —
            feeding, bathing, massaging, laundering their clothes, and keeping them meaningfully engaged. Above all, it&apos;s
            about bonding with and safeguarding your child, from a caretaker you and your family can trust.
          </Reveal>

          <ul className="order-4 mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3 md:order-none">
            {careTasks.map((task, index) => (
              <Reveal as="li" key={task} variant="from-right" delay={300 + index * 90} duration={700} className="flex items-center gap-3 font-semibold text-ink">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {task}
              </Reveal>
            ))}
          </ul>

          <Reveal variant="zoom-in" delay={450} className="order-5 mt-7 flex flex-col gap-3 rounded-2xl border border-sun/25 bg-sun/5 p-5 sm:mt-10 sm:gap-4 sm:p-6 sm:flex-row sm:items-center md:order-none">
            <span className="w-fit shrink-0 rounded-xl bg-sun px-4 py-2 text-center text-white">
              <span className="block text-2xl font-extrabold leading-none">1</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Month</span>
            </span>
            <p className="font-medium leading-relaxed text-graphite">
              We also offer <strong className="font-bold text-ink">1-month personal-habit training</strong> for families who
              want to build a specific routine or habit with their child.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
