"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";
import { images } from "@/lib/siteData";

const ageGroups = [
  {
    age: "0–3 months",
    name: "Newborn",
    image: images.newborn,
    care: ["Breastfeeding support", "Keeping baby clean", "Engagement", "Baby hygiene"],
  },
  {
    age: "3–6 months",
    name: "Active Explorer",
    image: images.explorer,
    care: ["Keeping the play area clean", "Engagement", "Baby hygiene"],
  },
  {
    age: "6–12 months",
    name: "Growing Curious",
    image: images.curious,
    care: ["Conversation and engagement", "Baby hygiene", "Clean play area", "Distraction-free feeding"],
  },
  {
    age: "12+ months",
    name: "Little Learner",
    image: images.learner,
    care: ["Tidying toys after play", "Personal hygiene", "Potty training", "Active engagement"],
  },
];

// How long each age group stays on screen before moving to the next one
const ROTATE_MS = 5000;

export default function AgeGroups() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const tabListRef = useRef(null);
  const tabRefs = useRef([]);
  const active = ageGroups[activeIndex];
  const isRotating = isInView && !isPaused;

  // Only rotate while the section is visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Move to the next age group; restarts whenever the active tab changes (including clicks)
  useEffect(() => {
    if (!isRotating || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setActiveIndex((index) => (index + 1) % ageGroups.length), ROTATE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isRotating]);

  // On phones the tabs scroll sideways: keep the active tab in view without moving the page
  useEffect(() => {
    const list = tabListRef.current;
    const tab = tabRefs.current[activeIndex];
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 20, behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="bg-sand py-12 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading align="center" variant="zoom-out" eyebrow="Every Age and Stage" title="Care by Age Group" />

        <div
          className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          {/* Stage selector */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Age groups"
            className="relative -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-4 lg:flex lg:flex-col"
          >
            {ageGroups.map((group, index) => {
              const isActive = index === activeIndex;
              return (
                <Reveal key={group.name} variant="from-left" delay={index * 110} className="min-w-56 shrink-0 snap-start sm:min-w-0">
                  <button
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="age-panel"
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex h-full w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                      isActive ? "border-brand/30 bg-white shadow-card-hover" : "border-ink/5 bg-white/70 hover:bg-white"
                    }`}
                  >
                    {/* Countdown bar until the next age group */}
                    {isActive && isRotating && (
                      <span
                        key={activeIndex}
                        aria-hidden
                        style={{ animationDuration: `${ROTATE_MS}ms` }}
                        className="animate-progress absolute inset-x-0 bottom-0 h-1 origin-left bg-brand motion-reduce:hidden"
                      />
                    )}
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-colors ${
                        isActive ? "bg-brand text-white" : "bg-cream text-graphite"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span>
                      <span className={`block text-xs font-bold uppercase tracking-wider ${isActive ? "text-brand" : "text-muted"}`}>{group.age}</span>
                      <span className="block text-lg font-bold text-ink">{group.name}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Detail panel */}
          <Reveal variant="from-right" delay={200} duration={1000} className="lg:col-span-8">
            <div
              id="age-panel"
              role="tabpanel"
              key={active.name}
              className="flex h-full animate-panel-in flex-col overflow-hidden rounded-4xl border border-ink/5 bg-white shadow-card md:grid md:grid-cols-2"
            >
              <div className="relative order-3 mt-5 min-h-60 md:order-none md:mt-0 md:min-h-72">
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className={`animate-image-zoom object-cover ${active.image.position ?? "object-center"}`}
                />
              </div>
              <div className="contents md:flex md:flex-col md:justify-center md:p-10">
                <span className="order-1 mx-6 mt-6 w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand sm:mx-8 sm:mt-8 md:order-none md:mx-0 md:mt-0">{active.age}</span>
                <h3 className="order-2 mx-6 mt-3 text-3xl font-extrabold tracking-tight text-ink sm:mx-8 md:order-none md:mx-0 md:mt-4">{active.name}</h3>
                <ul className="order-4 mx-6 mb-6 mt-5 space-y-3.5 sm:mx-8 sm:mb-8 md:order-none md:m-0 md:mt-6">
                  {active.care.map((item, itemIndex) => (
                    <li
                      key={item}
                      style={{ animationDelay: `${150 + itemIndex * 80}ms` }}
                      className="flex animate-fade-up items-center gap-3 font-medium text-graphite"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
