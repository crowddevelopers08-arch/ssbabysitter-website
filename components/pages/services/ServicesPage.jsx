import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon, HeartIcon, UsersIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

const services = [
  {
    title: "Child Care",
    href: "/services/child-care",
    image: images.servicesChildCard,
    icon: HeartIcon,
    accent: "bg-brand/10 text-brand",
    text: "From newborn support to school-age supervision, our babysitters in Chennai cover feeding, hygiene, engagement, and bonding — for every age and stage.",
    tags: ["Feeding", "Hygiene", "Engagement", "Bonding"],
  },
  {
    title: "Elderly Care",
    href: "/services/elderly-care",
    image: images.servicesElderlyCard,
    icon: UsersIcon,
    accent: "bg-azure/10 text-azure",
    text: "Compassionate, background-verified support for ageing family members — daily assistance, companionship, and peace of mind for the whole household.",
    tags: ["Daily assistance", "Companionship", "Peace of mind"],
  },
];

// Animation: each row rises in; its photo slides in from its own side while the text slides from the other.
export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Two caregiving services, one trusted local team"
        image={images.servicesHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="overflow-hidden bg-sky py-12 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            variant="zoom-in"
            eyebrow="Our Services"
            title="Child Care & Elderly Care in Chennai"
            subtitle="SS Babysitter offers two core caregiving services in Chennai, each matched to background-verified, trained professionals near you."
          />

          <div className="mt-8 space-y-6 sm:mt-16 sm:space-y-10 md:space-y-16">
            {services.map(({ title, href, image, icon: Icon, accent, text, tags }, index) => (
              <Reveal
                as="article"
                key={href}
                variant="fade-up"
                duration={1000}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white p-3 shadow-card hover:shadow-card-hover sm:p-4 md:grid md:grid-cols-2 md:items-center md:gap-8 md:rounded-[2.5rem] md:p-5 lg:gap-14"
              >
                <Reveal
                  variant={index % 2 === 1 ? "from-right" : "from-left"}
                  delay={200}
                  duration={1100}
                  className={`relative order-3 my-4 aspect-4/3 sm:my-5 overflow-hidden rounded-2xl sm:rounded-4xl md:my-0 md:aspect-auto md:h-full md:min-h-80 lg:aspect-4/3 lg:h-auto ${index % 2 === 1 ? "md:order-2" : "md:order-none"}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-1000 ease-smooth group-hover:scale-105 ${image.position ?? "object-center"}`}
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink backdrop-blur">
                    0{index + 1}
                  </span>
                </Reveal>

                <Reveal variant={index % 2 === 1 ? "from-left" : "from-right"} delay={350} className="contents md:block md:px-2 md:py-4 lg:px-6">
                  <span className={`order-1 mx-3 mt-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-110 md:order-none md:mx-0 md:mt-0 ${accent}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="order-2 mx-3 mt-5 text-3xl font-extrabold tracking-tight text-ink md:order-none md:mx-0 md:mt-6 lg:text-4xl">{title}</h3>
                  <p className="order-4 mx-3 text-[17px] leading-relaxed text-graphite md:order-none md:mx-0 md:mt-4">{text}</p>
                  <ul className="order-5 mx-3 mt-5 flex flex-wrap gap-2 sm:mt-6 md:order-none md:mx-0">
                    {tags.map((tag, tagIndex) => (
                      <Reveal
                        as="li"
                        key={tag}
                        variant="zoom-in"
                        delay={550 + tagIndex * 90}
                        duration={600}
                        className="rounded-lg bg-sand px-3 py-1.5 text-sm font-semibold text-graphite"
                      >
                        {tag}
                      </Reveal>
                    ))}
                  </ul>
                  <Button href={href} variant="dark" className="order-6 mx-3 mb-3 mt-6 self-start sm:mb-4 sm:mt-8 md:order-none md:mx-0 md:mb-0">
                    {title}
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Reveal>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
