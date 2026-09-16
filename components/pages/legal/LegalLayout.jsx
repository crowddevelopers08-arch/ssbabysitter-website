import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRightIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { contact } from "@/lib/siteData";

/**
 * Shared shell for the policy pages (privacy, terms).
 *
 * `sections` is a list of { id, title, blocks }, where each block is either a
 * plain string (paragraph), { list: [...] } or { note: "..." } for a highlighted callout.
 * The list of sections also drives the sticky "On this page" index on the left.
 */

function Block({ block, blockIndex }) {
  const delay = 120 + blockIndex * 60;

  if (typeof block === "string") {
    return (
      <Reveal as="p" variant="fade-up" delay={delay} className="text-[17px] leading-relaxed text-graphite">
        {block}
      </Reveal>
    );
  }

  if (block.note) {
    return (
      <Reveal
        variant="fade-up"
        delay={delay}
        className="rounded-2xl border border-sun/20 bg-sand p-5 text-[17px] leading-relaxed text-graphite sm:p-6"
      >
        {block.note}
      </Reveal>
    );
  }

  return (
    <ul className="space-y-3">
      {block.list.map((item, index) => (
        <Reveal
          as="li"
          key={item}
          variant="from-left"
          delay={delay + index * 70}
          duration={700}
          className="flex gap-3 text-[17px] leading-relaxed text-graphite"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span>{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export default function LegalLayout({ title, subtitle, image, breadcrumbs, updatedAt, intro, sections }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={image} breadcrumbs={breadcrumbs} />

      <section className="bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          {/* Sticky index */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="fade-up" className="rounded-3xl border border-ink/5 bg-sand p-5 shadow-card sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Last updated</p>
                <p className="mt-1 font-bold text-ink">{updatedAt}</p>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">On this page</p>
                <ol className="mt-3 space-y-1">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold text-graphite transition-colors hover:bg-white hover:text-brand"
                      >
                        <span className="text-muted transition-colors group-hover:text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal variant="fade-up" delay={200} className="mt-4 rounded-3xl bg-ink p-5 text-white sm:mt-6 sm:p-6">
                <p className="text-lg font-bold">Questions about this page?</p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">
                  Our team is happy to explain anything here in plain language.
                </p>
                <ul className="mt-4 space-y-3 text-[15px]">
                  <li>
                    <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand-soft">
                      <PhoneIcon className="h-4 w-4 shrink-0 text-brand-soft" />
                      {contact.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 break-all transition-colors hover:text-brand-soft"
                    >
                      <MailIcon className="h-4 w-4 shrink-0 text-brand-soft" />
                      {contact.email}
                    </a>
                  </li>
                </ul>
                <Button href={contact.whatsappHref} variant="light" size="sm" className="mt-5 w-full">
                  <WhatsAppIcon className="h-4 w-4 text-leaf" />
                  Message us on WhatsApp
                </Button>
              </Reveal>
            </div>
          </aside>

          {/* Policy body */}
          <div className="lg:col-span-8">
            {intro && (
              <Reveal
                variant="fade-up"
                className="rounded-3xl border border-ink/5 bg-blush p-6 text-[17px] leading-relaxed text-graphite shadow-card sm:p-8"
              >
                {intro}
              </Reveal>
            )}

            <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">
              {sections.map((section, sectionIndex) => (
                <article key={section.id} id={section.id} className="scroll-mt-28">
                  <Reveal variant="from-left" className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-extrabold text-brand">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-extrabold leading-tight tracking-tight text-ink">
                      {section.title}
                    </h2>
                  </Reveal>

                  <div className="mt-4 space-y-4 sm:mt-5 sm:space-y-5">
                    {section.blocks.map((block, blockIndex) => (
                      <Block key={blockIndex} block={block} blockIndex={blockIndex} />
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <Reveal
              variant="fade-up"
              className="mt-10 flex flex-col gap-4 rounded-3xl border border-ink/5 bg-sky p-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <p className="text-lg font-bold leading-snug text-ink">
                Ready to find a background-verified babysitter in Chennai?
              </p>
              <Button href="/contact" className="shrink-0">
                Enquire Now
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
