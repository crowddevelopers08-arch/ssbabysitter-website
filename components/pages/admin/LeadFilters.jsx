"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { SearchIcon } from "@/components/ui/Icons";
import { DATE_RANGES, hasActiveFilters, leadQueryString } from "@/lib/leadQuery";
import { LEAD_STATUSES } from "@/lib/leadStatus";

const SEARCH_DELAY_MS = 350;

/**
 * Search box, date range and status chips. Filters live in the URL, so a
 * filtered view can be bookmarked or shared with a teammate.
 */
export default function LeadFilters({ filters, statusCounts, total }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(filters.q);

  // Latest filters without re-arming the search timer on every navigation
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const apply = (changes) => {
    // Any filter change starts again from page 1
    const next = leadQueryString(filtersRef.current, { ...changes, page: 1 });
    startTransition(() => router.replace(`${pathname}${next}`, { scroll: false }));
  };

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === filtersRef.current.q) return undefined;

    const timer = setTimeout(() => apply({ q: trimmed }), SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
    // `apply` reads from refs, so only a change to the typed text should re-arm the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const clearAll = () => {
    setQuery("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  };

  const chips = [
    { value: "", label: "All", count: total, dot: "bg-ink/30" },
    ...LEAD_STATUSES.map((status) => ({ ...status, count: statusCounts[status.value] ?? 0 })),
  ];

  return (
    <section aria-label="Filter leads" className="mb-4 rounded-2xl border border-ink/5 bg-white p-3 shadow-card sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search leads</span>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              // Enter searches straight away instead of waiting for the pause
              if (event.key === "Enter") {
                event.preventDefault();
                apply({ q: query.trim() });
              }
            }}
            placeholder="Search name, phone, email or requirement"
            className="w-full rounded-xl bg-mist py-2.5 pl-10 pr-4 text-[15px] text-ink outline-none transition-all placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand/50"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="sr-only">Date range</span>
          <select
            value={filters.range}
            onChange={(event) => apply({ range: event.target.value })}
            className="w-full cursor-pointer rounded-xl bg-mist px-3 py-2.5 text-[15px] font-semibold text-ink outline-none focus:ring-2 focus:ring-brand/50 sm:w-auto"
          >
            {DATE_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {chips.map((chip) => {
          const active = filters.status === chip.value;
          return (
            <button
              key={chip.value || "all"}
              type="button"
              onClick={() => apply({ status: chip.value })}
              aria-pressed={active}
              title={chip.hint}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active ? "bg-ink text-white" : "bg-mist text-graphite hover:bg-ink/10"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${active ? "bg-white" : chip.dot}`} aria-hidden />
              {chip.label}
              <span className={`tabular-nums ${active ? "text-white/70" : "text-muted"}`}>{chip.count}</span>
            </button>
          );
        })}

        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto shrink-0 px-2 text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            Clear filters
          </button>
        )}

        {isPending && (
          <span className="shrink-0 text-xs font-semibold text-muted" role="status">
            Loading…
          </span>
        )}
      </div>
    </section>
  );
}
