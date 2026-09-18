// Presentation for the LeadStatus enum in prisma/schema.prisma.
// Keep the keys in sync with the schema.

export const LEAD_STATUSES = [
  { value: "NEW", label: "New", hint: "Not contacted yet", chip: "bg-brand/10 text-brand ring-brand/20", dot: "bg-brand" },
  { value: "CONTACTED", label: "Contacted", hint: "We've spoken to them", chip: "bg-azure/10 text-azure ring-azure/20", dot: "bg-azure" },
  { value: "QUALIFIED", label: "Qualified", hint: "Genuine requirement", chip: "bg-sun/10 text-sun ring-sun/20", dot: "bg-sun" },
  { value: "CONVERTED", label: "Converted", hint: "Booked a caregiver", chip: "bg-leaf/10 text-leaf ring-leaf/20", dot: "bg-leaf" },
  { value: "LOST", label: "Lost", hint: "Didn't go ahead", chip: "bg-ink/5 text-muted ring-ink/10", dot: "bg-muted" },
];

export const LEAD_STATUS_VALUES = LEAD_STATUSES.map((status) => status.value);

const byValue = new Map(LEAD_STATUSES.map((status) => [status.value, status]));

export function leadStatus(value) {
  return byValue.get(value) ?? LEAD_STATUSES[0];
}
