import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ClockIcon, LayersIcon, MoonIcon, SunIcon } from "@/components/ui/Icons";

const shifts = [
  { label: "10 hrs", icon: SunIcon },
  { label: "12 hrs", icon: SunIcon },
  { label: "Night shift", icon: MoonIcon },
  { label: "Double shift", icon: LayersIcon },
];

// Animation: dark panel scales up into place, copy fades up, shift tiles flip up one by one.
export default function ShiftsAndTimings() {
  return (
    <section className="bg-white px-5 py-12 sm:px-8 sm:py-20 md:py-28">
      <Reveal
        variant="zoom-in"
        duration={1000}
        className="relative mx-auto grid max-w-7xl gap-6 overflow-hidden sm:gap-8 rounded-3xl bg-ink p-6 sm:p-10 md:rounded-[2.5rem] md:p-14 lg:grid-cols-12 lg:items-center"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-float rounded-full bg-brand/25 blur-3xl [animation-duration:10s]" />

        <Reveal variant="fade-up" delay={250} className="relative lg:col-span-5">
          <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-soft">
            <span className="h-px w-8 bg-current" aria-hidden />
            Shifts &amp; Timings
          </p>
          <h2 className="mt-4 text-[clamp(1.85rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-tight text-white">
            Families can choose the duration that suits them
          </h2>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 sm:mt-7 bg-white/5 px-5 py-4 sm:inline-flex">
            <ClockIcon className="h-8 w-8 animate-[spin_12s_linear_infinite] text-brand-soft" />
            <span>
              <span className="block text-2xl font-extrabold text-white">8 hrs</span>
              <span className="text-sm text-white/65">Our babysitters work a minimum 8-hour shift</span>
            </span>
          </div>

          <div className="mt-6 sm:mt-8">
            <Button href="/contact">Enquire Now</Button>
          </div>
        </Reveal>

        <ul className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          {shifts.map(({ label, icon: Icon }, index) => (
            <Reveal as="li" key={label} variant="flip-up" delay={400 + index * 130}>
              <div className="group h-full rounded-2xl bg-white p-4 transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-6 md:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-500 ease-smooth group-hover:rotate-12 group-hover:bg-brand group-hover:text-white sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 text-base font-extrabold text-ink sm:mt-6 sm:text-xl md:text-2xl">{label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
