import { redirect } from "next/navigation";
import AdminDashboard from "@/components/pages/admin/AdminDashboard";
import SetupNotice from "@/components/pages/admin/SetupNotice";
import prisma from "@/lib/prisma";
import { formatDateTime, timeAgo } from "@/lib/formatDate";
import { formatPhone } from "@/lib/leadValidation";
import { PAGE_SIZE, buildLeadWhere, leadQueryString, parseLeadFilters } from "@/lib/leadQuery";

export const dynamic = "force-dynamic";

async function loadDashboard(filters) {
  const where = buildLeadWhere(filters);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [leads, matching, total, thisWeek, byStatus] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const statusCounts = Object.fromEntries(byStatus.map((row) => [row.status, row._count._all]));
  const now = Date.now();

  return {
    // Plain, pre-formatted objects — client components get strings, not Dates
    leads: leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      phoneDisplay: formatPhone(lead.phone),
      email: lead.email,
      description: lead.description,
      status: lead.status,
      notes: lead.notes ?? "",
      source: lead.source,
      pageUrl: lead.pageUrl,
      receivedAt: formatDateTime(lead.createdAt),
      receivedAgo: timeAgo(lead.createdAt, now),
    })),
    matching,
    stats: {
      total,
      thisWeek,
      fresh: statusCounts.NEW ?? 0,
      converted: statusCounts.CONVERTED ?? 0,
    },
    statusCounts,
  };
}

export default async function AdminPage({ searchParams }) {
  if (!process.env.DATABASE_URL) {
    return <SetupNotice title="Database not connected" detail="Add DATABASE_URL (your Neon connection string) to the server environment." />;
  }

  const filters = parseLeadFilters(await searchParams);

  let data;
  try {
    data = await loadDashboard(filters);
  } catch (error) {
    console.error("[admin] could not load leads:", error);
    return (
      <SetupNotice
        title="Couldn't load leads"
        detail="The database didn't respond. Check DATABASE_URL, and that migrations have been run (npm run db:migrate)."
      />
    );
  }

  const pageCount = Math.max(1, Math.ceil(data.matching / PAGE_SIZE));
  // e.g. the last lead on page 3 was deleted — land on the new last page instead of an empty one
  if (filters.page > pageCount) redirect(`/admin${leadQueryString(filters, { page: pageCount })}`);

  return <AdminDashboard {...data} filters={filters} pageCount={pageCount} />;
}
