import Link from "next/link";
import { CheckCircleIcon, InboxIcon, TrendUpIcon, UsersIcon } from "@/components/ui/Icons";

function StatCard({ label, value, hint, icon, tone, href }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-extrabold tabular-nums text-ink">{value.toLocaleString("en-IN")}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </>
  );

  const className = "block rounded-2xl border border-ink/5 bg-white p-4 shadow-card sm:p-5";

  return href ? (
    <Link href={href} className={`${className} transition-shadow hover:shadow-card-hover`}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

export default function StatCards({ stats }) {
  const conversion = stats.total ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <section aria-label="Summary" className="mb-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total leads"
          value={stats.total}
          hint="All time"
          icon={<UsersIcon className="h-5 w-5" />}
          tone="bg-azure/10 text-azure"
          href="/admin"
        />
        <StatCard
          label="Waiting for a call"
          value={stats.fresh}
          hint="Status: New"
          icon={<InboxIcon className="h-5 w-5" />}
          tone="bg-brand/10 text-brand"
          href="/admin?status=NEW"
        />
        <StatCard
          label="Last 7 days"
          value={stats.thisWeek}
          hint="New enquiries this week"
          icon={<TrendUpIcon className="h-5 w-5" />}
          tone="bg-sun/10 text-sun"
          href="/admin?range=7d"
        />
        <StatCard
          label="Converted"
          value={stats.converted}
          hint={`${conversion}% of all leads`}
          icon={<CheckCircleIcon className="h-5 w-5" />}
          tone="bg-leaf/10 text-leaf"
          href="/admin?status=CONVERTED"
        />
      </div>
    </section>
  );
}
