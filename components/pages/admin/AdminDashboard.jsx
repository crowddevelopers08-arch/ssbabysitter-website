import Link from "next/link";
import LeadCard from "./LeadCard";
import LeadFilters from "./LeadFilters";
import StatCards from "./StatCards";
import { DownloadIcon, InboxIcon } from "@/components/ui/Icons";
import { PAGE_SIZE, hasActiveFilters, leadQueryString } from "@/lib/leadQuery";

function Header({ filters }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/admin" className="flex items-baseline gap-2">
          <span className="font-script text-2xl italic text-brand">SS Babysitter</span>
          <span className="hidden text-sm font-bold uppercase tracking-[0.16em] text-muted sm:inline">Leads</span>
        </Link>

        {/* Plain link so the browser handles the download; carries the current filters */}
        <a
          href={`/api/admin/leads/export${leadQueryString(filters, { page: 1 })}`}
          className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <DownloadIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Export CSV</span>
        </a>
      </div>
    </header>
  );
}

function Pagination({ filters, pageCount, matching, shown }) {
  if (pageCount <= 1) return null;

  const first = (filters.page - 1) * PAGE_SIZE + 1;
  const linkClass =
    "rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand";
  const disabledClass = "rounded-xl border border-ink/5 px-4 py-2 text-sm font-semibold text-muted/50";

  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-muted">
        Showing <span className="font-bold text-ink">{first}</span>–
        <span className="font-bold text-ink">{first + shown - 1}</span> of{" "}
        <span className="font-bold text-ink">{matching}</span>
      </p>
      <div className="flex items-center gap-2">
        {filters.page > 1 ? (
          <Link href={`/admin${leadQueryString(filters, { page: filters.page - 1 })}`} className={linkClass} scroll={false}>
            ← Newer
          </Link>
        ) : (
          <span className={disabledClass}>← Newer</span>
        )}
        <span className="px-2 text-sm text-muted">
          Page {filters.page} of {pageCount}
        </span>
        {filters.page < pageCount ? (
          <Link href={`/admin${leadQueryString(filters, { page: filters.page + 1 })}`} className={linkClass} scroll={false}>
            Older →
          </Link>
        ) : (
          <span className={disabledClass}>Older →</span>
        )}
      </div>
    </nav>
  );
}

function EmptyState({ hasFilters, total }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-ink/10 bg-white px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <InboxIcon className="h-7 w-7" />
      </span>
      {hasFilters ? (
        <>
          <p className="mt-4 text-lg font-bold text-ink">No leads match these filters</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Try a different search or date range, or use <span className="font-semibold">Clear filters</span> above
            to see all {total} leads.
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 text-lg font-bold text-ink">No leads yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Enquiries from the website&apos;s contact form will appear here as soon as they come in.
          </p>
        </>
      )}
    </div>
  );
}

export default function AdminDashboard({ leads, matching, stats, statusCounts, filters, pageCount }) {
  const hasFilters = hasActiveFilters(filters);

  return (
    <>
      <Header filters={filters} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Leads</h1>
          <p className="mt-1 text-sm text-muted">Every enquiry from the website, newest first.</p>
        </div>

        <StatCards stats={stats} />

        <LeadFilters filters={filters} statusCounts={statusCounts} total={stats.total} />

        <p className="mb-3 text-sm text-muted" aria-live="polite">
          {hasFilters ? (
            <>
              <span className="font-bold text-ink">{matching}</span> of {stats.total} leads match
            </>
          ) : (
            <>
              <span className="font-bold text-ink">{stats.total}</span> {stats.total === 1 ? "lead" : "leads"} in total
            </>
          )}
        </p>

        {leads.length === 0 ? (
          <EmptyState hasFilters={hasFilters} total={stats.total} />
        ) : (
          <ul className="space-y-3">
            {leads.map((lead) => (
              <li key={lead.id}>
                <LeadCard lead={lead} />
              </li>
            ))}
          </ul>
        )}

        <Pagination filters={filters} pageCount={pageCount} matching={matching} shown={leads.length} />
      </main>
    </>
  );
}
