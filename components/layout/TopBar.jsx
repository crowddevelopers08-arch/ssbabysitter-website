import { contact } from "@/lib/siteData";
import { ClockIcon, MailIcon, PinIcon } from "@/components/ui/Icons";

// Slim dark utility bar above the header (desktop only).
export default function TopBar() {
  const [weekdays, sunday] = contact.hours;

  return (
    <div className="hidden animate-slide-down bg-ink text-[13px] text-white/75 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2.5 sm:px-8">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <PinIcon className="h-3.5 w-3.5 text-brand-soft" />
            No. 10, 1st Floor, Swamy Nagar, Urapakkam
          </span>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
            <MailIcon className="h-3.5 w-3.5 text-brand-soft" />
            {contact.email}
          </a>
        </div>
        <span className="hidden items-center gap-2 lg:flex">
          <ClockIcon className="h-3.5 w-3.5 text-brand-soft" />
          Mon – Sat: {weekdays.time}
          <span className="text-white/30">•</span>
          {sunday.days}: {sunday.time}
        </span>
      </div>
    </div>
  );
}
