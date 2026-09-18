"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CheckIcon, CopyIcon, MailIcon, PhoneIcon, TrashIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { LEAD_STATUSES, leadStatus } from "@/lib/leadStatus";

const LONG_REQUIREMENT = 220;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Something went wrong");
  return payload;
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function ContactButton({ href, label, children, external }) {
  return (
    <a
      href={href}
      title={label}
      aria-label={label}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-graphite transition-colors hover:border-brand hover:text-brand"
    >
      {children}
    </a>
  );
}

export default function LeadCard({ lead }) {
  const router = useRouter();
  const [, startRefresh] = useTransition();

  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [savedNotes, setSavedNotes] = useState(lead.notes);
  const [busy, setBusy] = useState(null); // "status" | "notes" | "delete"
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const current = leadStatus(status);
  const notesDirty = notes.trim() !== savedNotes.trim();
  const isLong = (lead.description?.length ?? 0) > LONG_REQUIREMENT;

  const refresh = () => startRefresh(() => router.refresh());

  const showFlash = (message) => {
    setFlash(message);
    setTimeout(() => setFlash(null), 2000);
  };

  const changeStatus = async (next) => {
    const previous = status;
    setStatus(next); // optimistic — the pill changes colour immediately
    setBusy("status");
    setError(null);
    try {
      await request(`/api/admin/leads/${lead.id}`, { method: "PATCH", body: JSON.stringify({ status: next }) });
      showFlash(`Marked as ${leadStatus(next).label}`);
      refresh(); // update the counts on the chips and stat cards
    } catch (err) {
      setStatus(previous);
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const saveNotes = async () => {
    setBusy("notes");
    setError(null);
    try {
      await request(`/api/admin/leads/${lead.id}`, { method: "PATCH", body: JSON.stringify({ notes }) });
      setSavedNotes(notes.trim());
      setNotes(notes.trim());
      showFlash("Note saved");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(null);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete the lead from ${lead.name}? This can't be undone.`)) return;
    setBusy("delete");
    setError(null);
    try {
      await request(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
      refresh();
    } catch (err) {
      setError(err.message);
      setBusy(null);
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(lead.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (http, permissions) — the number is on screen anyway
    }
  };

  const whatsappHref = `https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi ${lead.name}, this is SS Babysitter following up on your enquiry.`
  )}`;

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-card transition-opacity sm:p-5 ${
        status === "NEW" ? "border-brand/20" : "border-ink/5"
      } ${busy === "delete" ? "pointer-events-none opacity-50" : ""}`}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_17rem] lg:gap-6">
        {/* Who and what */}
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${current.chip} ring-1`}
              aria-hidden
            >
              {initials(lead.name) || "?"}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-extrabold text-ink">{lead.name}</h2>
              <p className="text-xs text-muted">
                <time title={lead.receivedAt}>{lead.receivedAgo}</time>
                <span className="hidden sm:inline"> · {lead.receivedAt}</span>
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <a href={`tel:${lead.phone}`} className="font-bold tabular-nums text-ink hover:text-brand">
                {lead.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={copyPhone}
                title="Copy number"
                aria-label="Copy phone number"
                className="rounded-md p-1 text-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {copied ? <CheckIcon className="h-3.5 w-3.5 text-leaf" /> : <CopyIcon className="h-3.5 w-3.5" />}
              </button>
            </span>
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="min-w-0 break-all text-sm text-graphite hover:text-brand">
                {lead.email}
              </a>
            )}
          </div>

          {lead.description ? (
            <div className="mt-3 rounded-xl bg-sand px-3.5 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Requirement</p>
              <p className={`mt-1 whitespace-pre-line text-sm leading-relaxed text-graphite ${!expanded && isLong ? "line-clamp-3" : ""}`}>
                {lead.description}
              </p>
              {isLong && (
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  className="mt-1 text-xs font-bold text-brand hover:underline"
                >
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm italic text-muted">No requirement written.</p>
          )}

          {/* Team notes */}
          <div className="mt-3">
            <label htmlFor={`notes-${lead.id}`} className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              Team notes
            </label>
            <textarea
              id={`notes-${lead.id}`}
              rows={notes ? 2 : 1}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && notesDirty) saveNotes();
              }}
              placeholder="e.g. Called at 5pm, wants a full-time nanny from October"
              maxLength={2000}
              className="mt-1 w-full resize-y rounded-xl bg-mist px-3.5 py-2 text-sm text-ink outline-none transition-all placeholder:text-muted/60 focus:bg-white focus:ring-2 focus:ring-brand/50"
            />
            {notesDirty && (
              <div className="mt-1.5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={busy === "notes"}
                  className="rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-black disabled:opacity-60"
                >
                  {busy === "notes" ? "Saving…" : "Save note"}
                </button>
                <button
                  type="button"
                  onClick={() => setNotes(savedNotes)}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold text-muted hover:bg-ink/5"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-ink/5 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Status</span>
            <span className={`mt-1 flex items-center gap-2 rounded-xl px-3 ring-1 ${current.chip}`}>
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${current.dot}`} aria-hidden />
              <select
                value={status}
                onChange={(event) => changeStatus(event.target.value)}
                disabled={busy === "status"}
                className="w-full cursor-pointer bg-transparent py-2.5 text-sm font-bold outline-none disabled:cursor-wait"
              >
                {LEAD_STATUSES.map((option) => (
                  <option key={option.value} value={option.value} className="text-ink">
                    {option.label} — {option.hint}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Reach out</span>
            <div className="mt-1 flex gap-2">
              <ContactButton href={`tel:${lead.phone}`} label={`Call ${lead.name}`}>
                <PhoneIcon className="h-4 w-4" />
              </ContactButton>
              <ContactButton href={whatsappHref} label={`WhatsApp ${lead.name}`} external>
                <WhatsAppIcon className="h-4 w-4 text-leaf" />
              </ContactButton>
              {lead.email && (
                <ContactButton href={`mailto:${lead.email}`} label={`Email ${lead.name}`}>
                  <MailIcon className="h-4 w-4" />
                </ContactButton>
              )}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-1">
            <p className="truncate text-xs text-muted" title={lead.pageUrl || undefined}>
              via {lead.source}
            </p>
            <button
              type="button"
              onClick={remove}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-muted transition-colors hover:bg-brand/5 hover:text-brand"
            >
              <TrashIcon className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {(error || flash) && (
        <p
          role={error ? "alert" : "status"}
          className={`mt-3 rounded-xl px-3.5 py-2 text-sm font-semibold ${error ? "bg-brand/10 text-brand" : "bg-leaf/10 text-leaf"}`}
        >
          {error || flash}
        </p>
      )}
    </article>
  );
}
