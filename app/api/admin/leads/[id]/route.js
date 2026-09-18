import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { LEAD_STATUS_VALUES } from "@/lib/leadStatus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTES_LIMIT = 2000;

/** PATCH /api/admin/leads/:id — update the follow-up status and/or the team's notes. */
export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const data = {};

  if (body.status !== undefined) {
    if (!LEAD_STATUS_VALUES.includes(body.status)) {
      return NextResponse.json({ error: `Unknown status "${body.status}"` }, { status: 422 });
    }
    data.status = body.status;
  }

  if (body.notes !== undefined) {
    const notes = String(body.notes).trim();
    if (notes.length > NOTES_LIMIT) {
      return NextResponse.json({ error: `Notes are limited to ${NOTES_LIMIT} characters` }, { status: 422 });
    }
    data.notes = notes || null;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    if (error?.code === "P2025") return NextResponse.json({ error: "That lead no longer exists" }, { status: 404 });
    console.error("[admin] could not update lead:", error);
    return NextResponse.json({ error: "Could not save the change" }, { status: 500 });
  }
}

/** DELETE /api/admin/leads/:id — remove a lead (spam, duplicates, erasure requests). */
export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error?.code === "P2025") return NextResponse.json({ error: "That lead no longer exists" }, { status: 404 });
    console.error("[admin] could not delete lead:", error);
    return NextResponse.json({ error: "Could not delete the lead" }, { status: 500 });
  }
}
