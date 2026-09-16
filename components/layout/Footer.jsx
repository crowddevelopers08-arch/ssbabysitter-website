import Link from "next/link";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { contact, legalLinks, navLinks } from "@/lib/siteData";
import { ArrowRightIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";

// Flatten "Services" so its sub-pages appear as quick links too
const quickLinks = navLinks.flatMap((link) => (link.children ? [link, ...link.children] : [link]));

function FooterTitle({ children }) {
  return <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-white sm:mb-5">{children}</h3>;
}

// Animation: CTA band scales up into place, footer columns rise one after another.
export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      {/* Call-to-action band */}
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-16">
        <Reveal
          variant="zoom-in"
          duration={1000}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand to-brand-soft px-5 py-7 sm:px-8 sm:py-9 md:px-12 md:py-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 animate-[spin_40s_linear_infinite] rounded-full border-40 border-dashed border-white/10" />
          <div className="relative flex flex-col gap-6 sm:gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-tight tracking-tight text-white">
                Find a babysitter near me — talk to our team today
              </h2>
              <p className="mt-3 text-white/85">Reach out by call, text, or WhatsApp.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 whitespace-nowrap sm:flex-row">
              <Button href={contact.whatsappHref} variant="light">
                <WhatsAppIcon className="h-5 w-5 text-leaf" />
                Book Now
              </Button>
              <Button href={contact.phoneHref} variant="ghostLight">
                <PhoneIcon className="h-4 w-4" />
                {contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:gap-10 sm:px-8 sm:py-14 md:gap-12 md:py-16 lg:grid-cols-12">
        {/* Brand */}
        <Reveal variant="fade-up" className="lg:col-span-3">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs leading-relaxed sm:mt-6">
            Reliable babysitting services and baby care taker support, near you in Chennai.
          </p>
          <Link href="/contact" className="group mt-4 inline-flex sm:mt-6 items-center gap-2 font-semibold text-white transition-colors hover:text-brand-soft">
            Enquire Now
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Quick links */}
        <Reveal variant="fade-up" delay={120} className="lg:col-span-2">
          <FooterTitle>Quick Links</FooterTitle>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Hours */}
        <Reveal variant="fade-up" delay={240} className="lg:col-span-3">
          <FooterTitle>Our Hours</FooterTitle>
          <ul className="space-y-4">
            {contact.hours.map((slot) => (
              <li key={slot.days} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="block text-sm text-white/60">{slot.days}</span>
                <span className="font-semibold text-white">{slot.time}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Contact */}
        <Reveal variant="fade-up" delay={360} className="lg:col-span-4">
          <FooterTitle>Get in Touch</FooterTitle>
          <ul className="space-y-4">
            {contact.offices.map((office) => (
              <li key={office.name} className="flex gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />
                <span>
                  <span className="block font-semibold text-white">{office.name}</span>
                  {office.address && <span className="text-sm leading-relaxed">{office.address}</span>}
                </span>
              </li>
            ))}
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand-soft" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-white lg:break-normal">
                <MailIcon className="h-4 w-4 shrink-0 text-brand-soft" />
                {contact.email}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} SS Babysitter, Chennai</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
