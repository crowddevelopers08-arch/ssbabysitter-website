import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateLead } from "@/lib/leadValidation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Crude per-IP throttle. Serverless instances don't share it, so treat it as
// friction for casual bots rather than a real rate limiter.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentSubmissions = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  hits.push(now);
  recentSubmissions.set(ip, hits);

  // Keep the map from growing without bound on a long-lived instance
  if (recentSubmissions.size > 500) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) recentSubmissions.delete(key);
    }
  }

  return hits.length > RATE_LIMIT.max;
}

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

/** POST /api/leads — called by the website enquiry form. */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  // Honeypot: real visitors never see this field, bots fill everything in.
  // Answer as if it worked so the bot doesn't learn to avoid it.
  if (String(body?.company ?? "").trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "That's a few enquiries in a row — please call us instead and we'll help right away." },
      { status: 429 }
    );
  }

  const { errors, data } = validateLead(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the highlighted fields", fieldErrors: errors }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        source: String(body?.source ?? "").trim() || "website",
        pageUrl: String(body?.pageUrl ?? "").trim() || null,
      },
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[leads] could not save enquiry:", error);
    return NextResponse.json(
      { error: "We couldn't save your enquiry. Please call or WhatsApp us and we'll take the details." },
      { status: 500 }
    );
  }
}
