import { AlertIcon } from "@/components/ui/Icons";

/** Shown instead of the dashboard when the database isn't reachable or configured. */
export default function SetupNotice({ title, detail }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl border border-ink/5 bg-white p-6 text-center shadow-card sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sun/10 text-sun">
          <AlertIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-xl font-extrabold text-ink">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-graphite">{detail}</p>
      </div>
    </main>
  );
}
