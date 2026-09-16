"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "@/components/ui/Button";
import { contact, images, navLinks } from "@/lib/siteData";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";

// Thumbnails shown in the Services dropdown
const serviceThumbs = {
  "/services/child-care": images.navChildCare,
  "/services/elderly-care": images.navElderlyCare,
};

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a soft shadow once the visitor scrolls past the top
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = (href) =>
    `relative py-2 text-[15px] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:mx-auto after:h-0.5 after:rounded-full after:bg-brand after:transition-all after:duration-300 ${
      isActive(href) ? "text-ink after:w-full" : "text-graphite after:w-0 hover:text-ink hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 animate-slide-down border-b backdrop-blur-lg transition-all duration-500 ease-smooth ${
        isScrolled ? "border-ink/10 bg-white/95 shadow-[0_10px_30px_-18px_rgb(43_43_43/0.35)]" : "border-ink/5 bg-white/80"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 ease-smooth sm:px-8 lg:gap-6 ${
          isScrolled ? "py-2.5" : "py-3 lg:py-3.5"
        }`}
      >
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link href={link.href} className={`flex items-center gap-1 ${navLinkClass(link.href)}`}>
                  {link.label}
                  <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </Link>

                <div className="invisible absolute left-1/2 top-full w-104 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="grid grid-cols-2 gap-2 rounded-2xl border border-ink/5 bg-white p-2.5 shadow-float">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`group/item block rounded-xl p-2 transition-colors hover:bg-mist ${pathname === child.href ? "bg-mist" : ""}`}
                        >
                          <span className="relative block aspect-4/3 overflow-hidden rounded-lg">
                            <Image
                              src={serviceThumbs[child.href].src}
                              alt=""
                              fill
                              sizes="200px"
                              className={`object-cover transition-transform duration-500 group-hover/item:scale-105 ${serviceThumbs[child.href].position ?? ""}`}
                            />
                          </span>
                          <span className="mt-2.5 flex items-center justify-between px-1 pb-1 text-[15px] font-bold text-ink">
                            {child.label}
                            <ArrowRightIcon className="h-4 w-4 text-brand transition-transform group-hover/item:translate-x-1" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop contact + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a href={contact.phoneHref} className="group hidden items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-mist xl:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Phone / WhatsApp</span>
              <span className="block text-sm font-bold text-ink">{contact.phoneDisplay}</span>
            </span>
          </a>
          <Button href="/contact" size="sm">
            Enquire Now
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 text-ink transition-colors hover:bg-mist lg:hidden"
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav aria-label="Mobile" className="animate-panel-in border-t border-ink/5 bg-white px-5 pb-6 pt-3 [animation-duration:400ms] sm:px-8 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.children ? (
                  <>
                    <div className="flex items-center justify-between rounded-xl pr-1 hover:bg-mist">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex-1 px-3 py-3 text-base font-semibold ${isActive(link.href) ? "text-brand" : "text-ink"}`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((open) => !open)}
                        aria-label="Show services"
                        aria-expanded={servicesOpen}
                        className="rounded-lg p-2 text-graphite"
                      >
                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {servicesOpen && (
                      <ul className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-brand/20 pl-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              className={`block rounded-lg px-3 py-2.5 font-medium ${pathname === child.href ? "bg-brand/10 text-brand" : "text-graphite"}`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-xl px-3 py-3 text-base font-semibold hover:bg-mist ${isActive(link.href) ? "text-brand" : "text-ink"}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-3 border-t border-ink/5 pt-5">
            <Button href={contact.phoneHref} variant="outline">
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </Button>
            <Button href="/contact" onClick={closeMenu}>
              Enquire Now
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
