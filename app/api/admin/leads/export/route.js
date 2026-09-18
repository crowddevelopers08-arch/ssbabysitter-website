import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildLeadWhere, parseLeadFilters } from "@/lib/leadQuery";
import { leadStatus } from "@/lib/leadStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COLUMNS = [
  ["Received", (lead) => lead.createdAt.toISOString()],
  ["Name", (lead) => lead.name],
  ["Phone", (lead) => lead.phone],
  ["Email", (lead) => lead.email ?? ""],
  ["Requirement", (lead) => lead.description ?? ""],
  ["Status", (lead) => leadStatus(lead.status).label],
  ["Notes", (lead) => lead.notes ?? ""],
  ["Source", (lead) => lead.source],
  ["Page", (lead) => lead.pageUrl ?? ""],
];

function csvCell(value) {
  const text = String(value ?? "");
  // Stop spreadsheets treating a lead's text as a formula
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

/** GET /api/admin/leads/export — the current filtered view as a CSV download. */
export async function GET(request) {
  const filters = parseLeadFilters(Object.fromEntries(request.nextUrl.searchParams));
  const leads = await prisma.lead.findMany({
    where: buildLeadWhere(filters),
    orderBy: { createdAt: "desc" },
    take: 5000,
  });

  const rows = [
    COLUMNS.map(([header]) => csvCell(header)).join(","),
    ...leads.map((lead) => COLUMNS.map(([, read]) => csvCell(read(lead))).join(",")),
  ];

  const filename = `ssbabysitter-leads-${new Date().toISOString().slice(0, 10)}.csv`;

  // The BOM makes Excel open UTF-8 correctly on Windows
  return new NextResponse(`﻿${rows.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
