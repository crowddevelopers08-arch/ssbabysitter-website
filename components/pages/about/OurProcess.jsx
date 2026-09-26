import SectionHeading from "@/components/ui/SectionHeading";
import { BuildingIcon, ChatIcon, HeartIcon, UsersIcon } from "@/components/ui/Icons";

const steps = [
  {
    title: "Tell Us What You Need",
    text: "Reach out from anywhere in Chennai; our team understands your requirement and guides you personally",
    icon: ChatIcon,
  },
  {
    title: "Visit Our Office",
    text: "Meet us in person at Anna Nagar or Urapakkam",
    icon: BuildingIcon,
  },
  {
    title: "Meet Your Caregiver",
    text: "We match you with a suitable babysitter, typically from within a 3 km radius of your home",
    icon: UsersIcon,
  },
  {
    title: "Ongoing Support",
    text: "A 1-week trial, replacements when needed, and continued support after placement",
    icon: HeartIcon,
  },
];

export default function OurProcess() {
  return (
    <section className="bg-blush py-12 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:gap-14 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading animate={false} eyebrow="Support Across Chennai" title="Our Process" />
          </div>
        </div>

        <ol className="relative lg:col-span-7">
          {steps.map(({ title, text, icon: Icon }, index) => (
            <li key={title} className="relative flex gap-4 pb-5 last:pb-0 sm:gap-7 sm:pb-6">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <span className="absolute bottom-0 left-6 top-14 w-px bg-linear-to-b from-brand/40 to-brand/5 sm:left-7 sm:top-16" aria-hidden />
              )}

              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-card ring-1 ring-ink/5 sm:h-14 sm:w-14">
                <Icon className="h-6 w-6" />
              </span>

              <div className="min-w-0 flex-1 rounded-2xl border border-ink/5 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-graphite">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
