/**
 * Lead validation shared by the browser form and the /api/leads route.
 * Keep it dependency-free — it runs in both places.
 */

export const LEAD_LIMITS = {
  name: 80,
  email: 120,
  phone: 20,
  description: 1000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Indian mobile numbers, stored in one shape (+91XXXXXXXXXX) so the dashboard
 * never shows the same person twice under two spellings.
 * Anything that isn't a recognisable Indian number is kept as typed.
 */
export function normalizePhone(value = "") {
  const digits = String(value).replace(/\D/g, "");

  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith("091")) return `+${digits.slice(1)}`;

  return digits ? `+${digits}` : "";
}

/** Human-readable version of a stored +91XXXXXXXXXX number. */
export function formatPhone(value = "") {
  const match = /^\+91(\d{5})(\d{5})$/.exec(value);
  return match ? `+91 ${match[1]} ${match[2]}` : value;
}

/**
 * @returns {{ errors: Record<string,string>, data: object }}
 *   `errors` is empty when the submission is good; `data` is the cleaned payload.
 */
export function validateLead(input = {}) {
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const description = String(input.description ?? "").trim();

  const errors = {};

  if (!name) errors.name = "Please tell us your name";
  else if (name.length > LEAD_LIMITS.name) errors.name = "That name is a little too long";

  // Email is optional, but if it's filled in it has to be usable
  if (email && !EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email address";
  else if (email.length > LEAD_LIMITS.email) errors.email = "That email is a little too long";

  const digits = phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Please enter your phone number";
  else if (digits.length < 10) errors.phone = "Please enter a 10-digit mobile number";
  else if (digits.length > 15) errors.phone = "Please enter a valid phone number";

  if (description.length > LEAD_LIMITS.description) {
    errors.description = `Please keep this under ${LEAD_LIMITS.description} characters`;
  }

  return {
    errors,
    data: {
      name,
      phone: normalizePhone(phone),
      email: email || null,
      description: description || null,
    },
  };
}
