import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import EnquiryForm from "@/components/ui/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { contact, images } from "@/lib/siteData";

function ContactRow({ icon, label, delay = 0, children }) {
  return (
    <Reveal as="li" variant="from-left" delay={delay} className="flex gap-4 py-4 first:pt-0 last:pb-0 sm:py-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
        <div className="mt-1 font-semibold leading-relaxed text-ink">{children}</div>
      </div>
    </Reveal>
  );
}

// Animation: details card rises with its rows cascading in, hours panel drops in, map wipes upward.
export default function ContactPage() {
  const [urapakkam, annaNagar] = contact.offices;

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Find a babysitter near you — talk to our team today"
        image={images.contactHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      {/* Enquiry form */}
      <section className="bg-white py-12 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                variant="from-left"
                eyebrow="Send an Enquiry"
                title="Tell us what your family needs"
                subtitle="Share a few details and our team will call you back to understand your requirement and shortlist the right caregiver."
              />
              <Reveal variant="fade-up" delay={200} className="mt-6 rounded-3xl border border-ink/5 bg-sand p-5 sm:mt-8 sm:p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Prefer to talk?</p>
                <p className="mt-2 leading-relaxed text-graphite">
                  Call or message us on {contact.phoneDisplay} — we answer during working hours and can usually share
                  caregiver profiles the same day.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal
            variant="fade-up"
            className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:rounded-4xl sm:p-8 lg:col-span-7"
          >
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-blush py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            variant="flip-up"
            eyebrow="Get in Touch"
            title="Looking for sitter services near me?"
            subtitle="Reach out by call, text, or WhatsApp and our team will guide you to the right caregiver for your family. Once we understand your requirement, we'll share a few babysitter profiles to choose from — typically from within a 3 km radius of your home."
          />

          <div className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-12">
            {/* Details card */}
            <Reveal variant="fade-up" className="rounded-3xl border border-ink/5 bg-white p-6 shadow-card sm:rounded-4xl sm:p-7 md:p-9 lg:col-span-5">
              <ul className="divide-y divide-ink/5">
                <ContactRow label="Phone / WhatsApp" icon={<PhoneIcon />} delay={200}>
                  <a href={contact.phoneHref} className="transition-colors hover:text-brand">
                    {contact.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow label="Email" icon={<MailIcon />} delay={300}>
                  <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-brand">
                    {contact.email}
                  </a>
                </ContactRow>
                <ContactRow label={urapakkam.name} icon={<PinIcon />} delay={400}>
                  {urapakkam.address}
                </ContactRow>
                <ContactRow label={annaNagar.name} icon={<PinIcon />} delay={500}>
                  {annaNagar.address ?? "Anna Nagar, Chennai"}
                </ContactRow>
              </ul>

              <Reveal variant="fade-up" delay={600} className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button href={contact.whatsappHref}>
                  <WhatsAppIcon className="h-5 w-5" />
                  Book Now
                </Button>
                <Button href={contact.phoneHref} variant="outline">
                  <PhoneIcon className="h-4 w-4" />
                  {contact.phoneDisplay}
                </Button>
              </Reveal>
            </Reveal>

            {/* Hours + map */}
            <div className="grid gap-4 sm:gap-6 lg:col-span-7">
              <Reveal variant="fade-down" delay={250} className="flex flex-col gap-5 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:rounded-4xl sm:p-7 md:p-9">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-soft">
                  <ClockIcon className="h-7 w-7 animate-[spin_12s_linear_infinite]" />
                </span>
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60 sm:col-span-2">Hours</p>
                  {contact.hours.map((slot) => (
                    <div key={slot.days}>
                      <p className="text-white/70">{slot.days}</p>
                      <p className="text-lg font-bold">{slot.time}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal variant="wipe-up" delay={400} duration={1300} className="min-h-80 overflow-hidden rounded-4xl border border-ink/5 shadow-card">
                <iframe
                  title="SS Babysitter Urapakkam Office location"
                  src={contact.mapEmbedUrl}
                  className="h-full min-h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
