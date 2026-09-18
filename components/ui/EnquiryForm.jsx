"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Button from "./Button";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { validateLead } from "@/lib/leadValidation";
import { contact } from "@/lib/siteData";

/**
 * Enquiry form: Name, Email, Phone Number, Description.
 *
 * Submitting POSTs to /api/leads, which saves the enquiry to the database (it
 * shows up on /admin), then sends the visitor to /thank-you. The WhatsApp and
 * Call buttons stay alongside for anyone who would rather talk right away.
 */

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    autoComplete: "email",
    inputMode: "email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
    autoComplete: "tel",
    inputMode: "tel",
    required: true,
  },
];

const empty = { name: "", email: "", phone: "", description: "", company: "" };

const fieldClasses =
  "w-full bg-mist px-5 py-3.5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand/60";

export default function EnquiryForm({ source = "website" }) {
  const router = useRouter();
  const formId = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    // Clear the error as soon as they start fixing it
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  const focusFirstError = (found) => {
    setErrors(found);
    document.getElementById(`${formId}-${Object.keys(found)[0]}`)?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;

    setSubmitError(null);
    const { errors: found } = validateLead(values);

    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, pageUrl: window.location.href }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (payload.fieldErrors) focusFirstError(payload.fieldErrors);
        setSubmitError(payload.error || "Something went wrong. Please try again or call us.");
        setIsSending(false);
        return;
      }

      // Leave the button disabled through the redirect so it can't be double-fired
      router.push("/thank-you");
    } catch {
      setSubmitError("We couldn't reach our server. Please check your connection, or call us and we'll take the details.");
      setIsSending(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      {fields.map(({ name, label, required, ...inputProps }) => {
        const id = `${formId}-${name}`;
        const error = errors[name];

        return (
          <div key={name}>
            <label htmlFor={id} className="mb-2 block text-sm font-bold text-ink">
              {label}
              {required && (
                <span className="text-brand" aria-hidden>
                  {" *"}
                </span>
              )}
            </label>
            <input
              {...inputProps}
              id={id}
              name={name}
              value={values[name]}
              onChange={update(name)}
              required={required}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              className={`${fieldClasses} rounded-full ${error ? "ring-2 ring-brand" : ""}`}
            />
            {error && (
              <p id={`${id}-error`} role="alert" className="mt-2 pl-5 text-sm font-semibold text-brand">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div>
        <label htmlFor={`${formId}-description`} className="mb-2 block text-sm font-bold text-ink">
          Description
        </label>
        <textarea
          id={`${formId}-description`}
          name="description"
          rows={4}
          value={values.description}
          onChange={update("description")}
          placeholder="Tell us your baby care requirement"
          className={`${fieldClasses} resize-y rounded-3xl`}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. Submissions that fill it in are dropped. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      {submitError && (
        <p role="alert" className="rounded-2xl bg-blush px-5 py-3.5 text-sm font-semibold text-brand">
          {submitError}
        </p>
      )}

      {/* CTAs: submit is the primary action, WhatsApp and call sit alongside for anyone in a hurry */}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
        <Button type="submit" disabled={isSending} className="sm:flex-1">
          {isSending ? "Sending…" : "Send Enquiry"}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
        <Button href={contact.whatsappHref} variant="outline">
          <WhatsAppIcon className="h-5 w-5 text-leaf" />
          WhatsApp
        </Button>
        <Button href={contact.phoneHref} variant="outline">
          <PhoneIcon className="h-4 w-4" />
          Call Us
        </Button>
      </div>

      <p className="text-sm leading-relaxed text-muted">
        We&apos;ll only use these details to contact you about your enquiry — see our{" "}
        <a href="/privacy-policy" className="font-semibold text-brand underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
