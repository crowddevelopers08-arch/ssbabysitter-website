import Link from "next/link";

const variants = {
  brand: "bg-brand text-white shadow-[0_10px_24px_-10px_rgb(219_48_86/0.7)] hover:bg-[#c42a4c]",
  dark: "bg-ink text-white hover:bg-black",
  light: "bg-white text-ink hover:bg-cream",
  outline: "border border-ink/15 bg-white text-ink hover:border-brand hover:text-brand",
  ghostLight: "border border-white/30 text-white hover:bg-white/10",
};

const sizes = {
  md: "px-6 py-3.5 text-[15px]",
  sm: "px-5 py-2.5 text-sm",
};

/**
 * Call-to-action button.
 * Internal paths ("/contact") use next/link; tel:, mailto: and https: links use <a>.
 * With no `href` it renders a real <button> — use that for form submits.
 */
export default function Button({ href, children, variant = "brand", size = "md", className = "", type = "button", ...props }) {
  const classes = `group/btn inline-flex items-center justify-center gap-2 rounded-xl text-center font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  if (!href) {
    return (
      <button type={type} className={classes} {...props}>
        {children}
      </button>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const isExternal = href.startsWith("http");
  return (
    <a href={href} className={classes} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
      {children}
    </a>
  );
}
