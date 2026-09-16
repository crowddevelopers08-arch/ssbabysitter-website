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

const pexels = (id, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

// Stock photography (Pexels) — Indian families and children. Every slot uses a different photo.
// `position` sets the crop focus (Tailwind object-position class).
export const images = {
  // Home
  homeHero: { src: pexels(4616522), alt: "Indian father lifting his smiling baby girl outdoors", position: "object-[center_30%]" },
  homeIntro: { src: pexels(31790101, 1000), alt: "Smiling Indian mother and son standing together" },
  homeIntroSmall: { src: pexels(32590415, 700), alt: "Happy Indian toddler taking steps outdoors", position: "object-[center_40%]" },
  allOverChennai: { src: pexels(30012175, 900), alt: "Chennai family holding their newborn baby", position: "object-[center_30%]" },

  // About
  aboutHero: { src: pexels(1720186), alt: "Two young Indian girls drawing and doing schoolwork", position: "object-right" },
  aboutStory: { src: pexels(30012200, 1000), alt: "Indian parents smiling at their newborn baby", position: "object-[center_30%]" },
  aboutDaycare: { src: pexels(31447793, 1000), alt: "Indian school girls in uniform sitting together on a bench" },

  // Services
  servicesHero: { src: pexels(31447794), alt: "Group of smiling Indian school children", position: "object-[center_20%]" },
  servicesChildCard: { src: pexels(4616521, 1000), alt: "Indian baby in a red vest held by his caretaker", position: "object-left" },
  servicesElderlyCard: { src: pexels(30555889, 1000), alt: "Elderly Indian man smiling while seated", position: "object-[center_40%]" },
  navChildCare: { src: pexels(1720185, 500), alt: "" },
  navElderlyCare: { src: pexels(34429931, 500), alt: "", position: "object-[center_60%]" },

  // Child care
  childCareHero: { src: pexels(30012193), alt: "Smiling Indian newborn wrapped in a soft blanket" },
  childCareIntro: { src: pexels(1720179, 1000), alt: "Smiling young Indian girl" },
  newborn: { src: pexels(30012191, 700), alt: "Indian newborn sleeping peacefully in a basket" },
  explorer: { src: pexels(25365224, 700), alt: "Smiling baby crawling on a soft carpet" },
  curious: { src: pexels(4616524, 700), alt: "Curious Indian baby looking around", position: "object-left" },
  learner: { src: pexels(1720194, 700), alt: "Happy Indian toddler smiling in a knitted cap", position: "object-[center_25%]" },
  specialNeeds: { src: pexels(1720188, 1000), alt: "Two Indian girls working together on a drawing activity" },

  // Elderly care
  elderlyHero: { src: pexels(18786324), alt: "Elderly Indian woman in a pink saree", position: "object-[center_30%]" },
  elderlyCareSecondary: { src: pexels(33994827, 1000), alt: "Smiling elderly Indian woman by a window", position: "object-top" },

  // Contact
  contactHero: { src: pexels(4307962), alt: "Smiling Indian couple relaxing together at home" },

  // Legal + thank you
  privacyHero: { src: pexels(30012198), alt: "Indian newborn sleeping peacefully in a white dress" },
  termsHero: { src: pexels(1720190), alt: "Two Indian girls writing together at a table", position: "object-[center_40%]" },
  thankYouHero: { src: pexels(30012170), alt: "Laughing Indian newborn baby wrapped in a white blanket" },
};
