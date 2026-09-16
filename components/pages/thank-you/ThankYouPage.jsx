import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChatIcon,
  ClockIcon,
  PhoneIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { contact, images } from "@/lib/siteData";

const nextSteps = [
  {
    title: "We review your requirement",
    text: "Our team reads through what you've told us — the age of your child or the care your elder needs, your locality and your preferred timings.",
    icon: ChatIcon,
  },
  {
    title: "We call you back",
    text: "Expect a call or WhatsApp message from us within our working hours, usually the same day, to understand the finer details.",
    icon: PhoneIcon,
  },
  {
    title: "We share caregiver profiles",
    text: "We shortlist background-verified caregivers for you to choose from, typically from within a 3 km radius of your home.",
    icon: UsersIcon,
  },
];

const exploreLinks = [
  { label: "Child Care Services", href: "/services/child-care" },
  { label: "Elderly Care Services", href: "/services/elderly-care" },
  { label: "About SS Babysitter", href: "/about" },
];

// Animation: the tick pops in, the confirmation copy rises behind it,
// then the next-step cards cascade up as you scroll.
export default function ThankYouPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand">
        <div className="pointer-events-none absolute -left-40 -top-40 h-112 w-112 animate-float rounded-full bg-leaf/10 blur-3xl [animation-duration:11s]" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-112 w-112 animate-float rounded-full bg-brand/10 blur-3xl [animation-duration:9s] [animation-delay:1s]" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-5 py-12 sm:px-8 sm:py-16 md:grid md:grid-cols-2 md:items-center md:gap-12 md:py-20 lg:gap-16 lg:py-24">
          <div className="contents md:block">
            <span className="order-1 flex h-16 w-16 animate-pop-in items-center justify-center rounded-3xl bg-leaf text-white shadow-float sm:h-20 sm:w-20">
              <CheckCircleIcon className="h-9 w-9 sm:h-10 sm:w-10" />
            </span>

            <p className="order-2 mt-6 animate-fade-up text-xs font-bold uppercase tracking-[0.22em] text-brand [animation-delay:120ms]">
              Enquiry received
            </p>

            <h1 className="order-3 mt-3 animate-fade-up text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-ink [animation-delay:200ms]">
              Thank you — we&apos;ve got your details
            </h1>

            <p className="order-5 mt-4 max-w-xl animate-fade-up text-lg leading-relaxed text-graphite [animation-delay:320ms] sm:mt-5 lg:text-xl">
              Someone from our team will reach out shortly to understand exactly what your family needs. In a hurry?
              Message us on WhatsApp and we&apos;ll pick it up right away.
            </p>

            <div className="order-6 mt-6 flex animate-fade-up flex-col gap-3 [animation-delay:440ms] sm:mt-8 sm:flex-row">
              <Button href={contact.whatsappHref}>
                <WhatsAppIcon className="h-5 w-5" />
                Message us on WhatsApp
              </Button>
              <Button href={contact.phoneHref} variant="outline">
                <PhoneIcon className="h-4 w-4" />
                {contact.phoneDisplay}
              </Button>
            </div>

            <div className="order-7 mt-6 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted [animation-delay:560ms] sm:mt-8">
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-azure" />
                {contact.hours[0].days}, {contact.hours[0].time}
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-azure" />
                {contact.hours[1].days}, {contact.hours[1].time}
              </span>
            </div>
          </div>

          <div className="relative order-4 mx-auto mb-6 mt-7 w-full max-w-xl md:order-none md:my-0 md:max-w-none">
            <div
              className="absolute -bottom-4 -right-4 h-full w-full animate-settle rounded-4xl bg-leaf/10 [animation-delay:500ms] sm:-bottom-5 sm:-right-5"
              aria-hidden
            />
            <div className="relative aspect-16/11 animate-image-reveal overflow-hidden rounded-4xl shadow-float [animation-delay:200ms]">
              <Image
                src={images.thankYouHero.src}
                alt={images.thankYouHero.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`animate-image-zoom object-cover [animation-delay:200ms] ${images.thankYouHero.position ?? "object-center"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-white py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            variant="flip-up"
            eyebrow="What Happens Next"
            title="Here's how we take it forward"
            subtitle="No forms to chase and no waiting in the dark — this is exactly what the next few hours look like."
          />

          <ol className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {nextSteps.map(({ title, text, icon: Icon }, index) => (
              <Reveal
                as="li"
                key={title}
                variant="fade-up"
                delay={index * 140}
                className="group relative overflow-hidden rounded-3xl border border-ink/5 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7"
              >
                <span className="pointer-events-none absolute -right-4 -top-3 text-7xl font-extrabold text-ink/[0.04]" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 text-xl font-bold text-ink">{title}</h3>
                <p className="relative mt-2 leading-relaxed text-graphite">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Meanwhile */}
      <section className="bg-blush py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                variant="from-left"
                eyebrow="While You Wait"
                title="Have a look around"
                subtitle="A little more about who we are and how we work, so you know exactly who you're inviting into your home."
              />
            </div>

            <ul className="grid gap-3 lg:col-span-6">
              {exploreLinks.map((link, index) => (
                <Reveal as="li" key={link.href} variant="from-right" delay={index * 120}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-ink/5 bg-white px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:px-6 sm:py-5"
                  >
                    <span className="text-lg font-bold text-ink transition-colors group-hover:text-brand">{link.label}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
