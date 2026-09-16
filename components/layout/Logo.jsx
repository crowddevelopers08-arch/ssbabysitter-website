import Image from "next/image";
import Link from "next/link";

/**
 * SS Babysitter logo, matching the live site: the "SS Babysitter" mark
 * cross-fades with the Pinkfinger Babysitter wordmark every few seconds.
 * variant="light" is used on the blue footer.
 */
export default function Logo({ variant = "dark" }) {
  const isLight = variant === "light";

  return (
    <Link href="/" aria-label="SS Babysitter home" className="relative inline-flex shrink-0 items-center">
      {/* Primary: S Group mark + name */}
      <span className="animate-logo-swap inline-flex items-center gap-2 motion-reduce:animate-none sm:gap-3">
        <span className={isLight ? "inline-flex items-center justify-center rounded-2xl bg-white p-2" : "inline-flex"}>
          <Image src="/ss-logo.png" alt="SS Babysitter" width={72} height={48} priority={!isLight} className="h-9 w-auto sm:h-11 xl:h-12" />
        </span>
        <span className={`whitespace-nowrap text-xl leading-none sm:text-2xl xl:text-3xl ${isLight ? "font-extrabold text-white" : "font-black"}`}>
          {isLight ? (
            "SS Babysitter"
          ) : (
            <>
              <span className="text-brand">SS </span>
              <span className="text-ink">Babysitter</span>
            </>
          )}
        </span>
      </span>

      {/* Secondary: Pinkfinger Babysitter wordmark */}
      <span
        aria-hidden
        className={`animate-logo-swap absolute inset-0 overflow-hidden [animation-delay:-4.5s] motion-reduce:animate-none motion-reduce:opacity-0 ${isLight ? "rounded-2xl" : ""}`}
      >
        <Image src="/ssanotherlogo.png" alt="" fill sizes="(max-width: 768px) 260px, 340px" className="object-cover object-center" />
      </span>
    </Link>
  );
}
