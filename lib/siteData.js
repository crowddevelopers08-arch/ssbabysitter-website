// Shared site-wide details. Update contact info here and it changes everywhere.

export const contact = {
  phoneDisplay: "+91 98845 02033",
  phoneHref: "tel:+919884502033",
  whatsappHref: "https://wa.me/919884502033",
  email: "saravanan@ssbabysitter.com",
  offices: [
    {
      name: "Urapakkam Office",
      address:
        "No. 10, 1st Floor, Swamy Nagar, Urapakkam (above SBI Bank), Chennai – 603211",
    },
    // TODO: add the Anna Nagar address once confirmed with Saravanan
    { name: "Anna Nagar Office", address: null },
  ],
  hours: [
    { days: "Monday – Saturday", time: "7:00 AM – 8:00 PM" },
    { days: "Sunday", time: "8:00 AM – 7:00 PM" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=No.+10,+Swamy+Nagar,+Urapakkam,+Chennai+603211&output=embed",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Child Care", href: "/services/child-care" },
      { label: "Elderly Care", href: "/services/elderly-care" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// Shown in the footer's bottom bar, kept out of the main navigation.
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

// All images are hosted on Cloudinary. Each path includes the version segment
// Cloudinary assigned on upload. The host is allowed in next.config.mjs.
const img = (path) => `https://res.cloudinary.com/xykwtyr0/image/upload/${path}`;

export const logos = {
  primary: img("v1789707585/ss-logo.png"),
  secondary: img("v1789707588/ssanotherlogo.png"),
};

// Icons are the originals from chennai.ssbabysitter.com
export const trustIcons = {
  languages: img("v1789707642/languages.png"),
  reliability: img("v1789707643/reliability.png"),
  money: img("v1789707643/money.png"),
  guarantee: img("v1789707642/guarantee-1.png"),
};

// Stock photography (originally from Pexels).
// Indian families and children. Every slot uses a different photo.
// `position` sets the crop focus (Tailwind object-position class).
export const images = {
  // Home
  homeHero: { src: img("v1789707620/home-hero.jpg"), alt: "Indian father lifting his smiling baby girl outdoors", position: "object-[center_30%]" },
  homeIntro: { src: img("v1789707620/home-intro.jpg"), alt: "Smiling Indian mother and son standing together" },
  homeIntroSmall: { src: img("v1789707620/home-intro-small.jpg"), alt: "Happy Indian toddler taking steps outdoors", position: "object-[center_40%]" },
  allOverChennai: { src: img("v1789707618/all-over-chennai.jpg"), alt: "Chennai family holding their newborn baby", position: "object-[center_30%]" },

  // About
  aboutHero: { src: img("v1789707618/about-hero.jpg"), alt: "Two young Indian girls drawing and doing schoolwork", position: "object-right" },
  aboutStory: { src: img("v1789707618/about-story.jpg"), alt: "Indian parents smiling at their newborn baby", position: "object-[center_30%]" },
  aboutDaycare: { src: img("v1789707616/about-daycare.jpg"), alt: "Indian school girls in uniform sitting together on a bench" },

  // Services
  servicesHero: { src: img("v1789707622/services-hero.jpg"), alt: "Group of smiling Indian school children", position: "object-[center_20%]" },
  servicesChildCard: { src: img("v1789707621/services-child-card.jpg"), alt: "Indian baby in a red vest held by his caretaker", position: "object-left" },
  servicesElderlyCard: { src: img("v1789707622/services-elderly-card.jpg"), alt: "Elderly Indian man smiling while seated", position: "object-[center_40%]" },
  navChildCare: { src: img("v1789707620/nav-child-care.jpg"), alt: "" },
  navElderlyCare: { src: img("v1789707621/nav-elderly-care.jpg"), alt: "", position: "object-[center_60%]" },

  // Child care
  childCareHero: { src: img("v1789707619/child-care-hero.jpg"), alt: "Smiling Indian newborn wrapped in a soft blanket" },
  childCareIntro: { src: img("v1789707619/child-care-intro.jpg"), alt: "Smiling young Indian girl" },
  newborn: { src: img("v1789707621/newborn.jpg"), alt: "Indian newborn sleeping peacefully in a basket" },
  explorer: { src: img("v1789707619/explorer.jpg"), alt: "Smiling baby crawling on a soft carpet" },
  curious: { src: img("v1789707619/curious.jpg"), alt: "Curious Indian baby looking around", position: "object-left" },
  learner: { src: img("v1789707620/learner.jpg"), alt: "Happy Indian toddler smiling in a knitted cap", position: "object-[center_25%]" },
  specialNeeds: { src: img("v1789707623/special-needs.jpg"), alt: "Two Indian girls working together on a drawing activity" },

  // Elderly care
  elderlyHero: { src: img("v1789707620/elderly-hero.jpg"), alt: "Elderly Indian woman in a pink saree", position: "object-[center_30%]" },
  elderlyCareSecondary: { src: img("v1789707621/elderly-care-secondary.jpg"), alt: "Smiling elderly Indian woman by a window", position: "object-top" },

  // Contact
  contactHero: { src: img("v1789707618/contact-hero.jpg"), alt: "Smiling Indian couple relaxing together at home" },

  // Legal + thank you
  privacyHero: { src: img("v1789707621/privacy-hero.jpg"), alt: "Indian newborn sleeping peacefully in a white dress" },
  termsHero: { src: img("v1789707622/terms-hero.jpg"), alt: "Two Indian girls writing together at a table", position: "object-[center_40%]" },
  thankYouHero: { src: img("v1789707622/thank-you-hero.jpg"), alt: "Laughing Indian newborn baby wrapped in a white blanket" },
};
