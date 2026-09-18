import { LEAD_STATUS_VALUES } from "@/lib/leadStatus";

/**
 * Turns the dashboard's URL query into a Prisma `where` clause, so the lead
 * list and the CSV export can never drift apart.
 */

export const DATE_RANGES = [
  { value: "all", label: "All time", days: null },
  { value: "today", label: "Today", days: 1 },
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
];

export const PAGE_SIZE = 25;

function startOfRange(value) {
  const range = DATE_RANGES.find((option) => option.value === value);
  if (!range?.days) return null;

  const from = new Date();
  if (range.days === 1) from.setHours(0, 0, 0, 0);
  else from.setDate(from.getDate() - range.days);
  return from;
}

/** @param {Record<string, string|undefined>} searchParams */
export function parseLeadFilters(searchParams = {}) {
  const q = String(searchParams.q ?? "").trim().slice(0, 80);
  const status = LEAD_STATUS_VALUES.includes(searchParams.status) ? searchParams.status : "";
  const range = DATE_RANGES.some((option) => option.value === searchParams.range) ? searchParams.range : "all";
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1);

  return { q, status, range, page };
}

export function hasActiveFilters({ q, status, range }) {
  return Boolean(q || status || (range && range !== "all"));
}

/**
 * Query string for a filter state, e.g. "?status=NEW&page=2" (or "" for the defaults).
 * @param {object} filters  current state from parseLeadFilters
 * @param {object} changes  keys to override
 */
export function leadQueryString(filters, changes = {}) {
  const merged = { ...filters, ...changes };
  const params = new URLSearchParams();

  if (merged.q) params.set("q", merged.q);
  if (merged.status) params.set("status", merged.status);
  if (merged.range && merged.range !== "all") params.set("range", merged.range);
  if (merged.page > 1) params.set("page", String(merged.page));

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function buildLeadWhere({ q, status, range }) {
  const where = {};

  if (status) where.status = status;

  const from = startOfRange(range);
  if (from) where.createdAt = { gte: from };

  if (q) {
    // Phone is stored as +91XXXXXXXXXX, so a number-like search is matched on
    // its digits — "98845 02033" and "9884502033" find the same lead.
    const looksLikePhone = /^[\d\s+()-]+$/.test(q);
    const digits = q.replace(/\D/g, "");
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      ...(looksLikePhone && digits ? [{ phone: { contains: digits } }] : []),
    ];
  }

  return where;
}
