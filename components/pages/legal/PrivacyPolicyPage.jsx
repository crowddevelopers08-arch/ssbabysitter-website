import LegalLayout from "./LegalLayout";
import { contact, images } from "@/lib/siteData";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      "We only ask for the details we genuinely need to match your family with the right caregiver. Depending on how you reach us, this may include:",
      {
        list: [
          "Your name, phone number, WhatsApp number and email address",
          "Your locality or residential address in Chennai, so we can look for a babysitter close to you",
          "Details about your requirement — the age of your child or the care needs of your elderly family member, preferred shift timings, language preference and any special care needs",
          "Notes from our conversations with you, by phone, WhatsApp or during an office visit",
          "Basic technical information collected automatically by our website, such as your browser type, device type and the pages you viewed",
        ],
      },
      "If you apply to work with us as a babysitter or caregiver, we additionally collect identity and address proof, employment history, references and background verification records.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Information",
    blocks: [
      "Your information is used to deliver the service you asked for, and for nothing unrelated to it. Specifically, we use it to:",
      {
        list: [
          "Understand your requirement and shortlist suitable, background-verified caregivers near you",
          "Contact you by call, SMS or WhatsApp about your enquiry, placement and trial period",
          "Coordinate introductions, office visits and the 1-week trial",
          "Provide ongoing support after placement, including replacements when needed",
          "Keep internal records of placements, and meet our legal and accounting obligations",
          "Improve our website and understand which of our services families are looking for",
        ],
      },
      {
        note: "We do not sell, rent or trade your personal information to any third party for marketing purposes. We do not send promotional messages to families who have only made an enquiry unless you have asked us to keep you updated.",
      },
    ],
  },
  {
    id: "sharing-information",
    title: "When We Share Information",
    blocks: [
      "To place a caregiver in your home, some information has to be shared — but we keep it to the minimum required:",
      {
        list: [
          "With the caregiver being considered for your family: your locality, the nature of the care required, and the timings. Your full address and phone number are shared only once you have agreed to proceed.",
          "With daycare centres and creches we staff, where you have approached us through them",
          "With service providers who help us run our business, such as background verification agencies and IT or hosting providers, under an obligation to keep your data confidential",
          "With government authorities, law enforcement or courts, where we are legally required to do so",
        ],
      },
      "We share the caregiver's verified details and background check summary with you before placement, so that you can make an informed decision about who enters your home.",
    ],
  },
  {
    id: "children-data",
    title: "Information About Children",
    blocks: [
      "Because of the nature of our work, we sometimes receive information about your child — their age, routine, dietary needs, medical conditions or special care requirements. We treat this as sensitive information.",
      "This information is collected only from you, the parent or legal guardian, and is used strictly to match and brief a suitable caregiver. It is never used for marketing, never shared publicly, and is not disclosed beyond the caregiver assigned to your family and the members of our team coordinating the placement.",
      "Our website is not intended for use by children, and we do not knowingly collect information directly from anyone under 18.",
    ],
  },
  {
    id: "data-security",
    title: "How We Protect Your Data",
    blocks: [
      "We take reasonable technical and organisational measures to keep your information safe. Our website is served over an encrypted HTTPS connection, access to enquiry records is limited to the team members who need it, and physical records at our offices are kept secured.",
      "No method of transmission or storage is completely secure, so while we work hard to protect your information, we cannot guarantee absolute security. If you believe your information has been compromised, please contact us immediately at " + contact.email + ".",
    ],
  },
  {
    id: "data-retention",
    title: "How Long We Keep It",
    blocks: [
      "We retain enquiry details only for as long as needed to serve you, and thereafter for as long as required for our records, dispute resolution and legal or tax obligations. Where an enquiry does not result in a placement, we typically retain the details for a limited period in case you return to us, and then delete them.",
      "Caregiver verification records are retained for the duration of their association with us and for a reasonable period afterwards, as required by law.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    blocks: [
      "You remain in control of the information you share with us. You may, at any time:",
      {
        list: [
          "Ask us what personal information we hold about you",
          "Ask us to correct information that is inaccurate or out of date",
          "Ask us to delete your information, where we are not required to retain it by law",
          "Withdraw your consent to us contacting you, or ask us to stop sending you messages",
          "Raise a grievance about how your information has been handled",
        ],
      },
      "To exercise any of these rights, call us on " + contact.phoneDisplay + " or write to " + contact.email + ". We will respond within a reasonable time, and may ask you to verify your identity before acting on the request.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Website Analytics",
    blocks: [
      "Our website uses a small number of cookies and similar technologies to keep the site working correctly and to understand, in aggregate, how visitors use it. These do not identify you personally.",
      "We may also embed content from third parties, such as Google Maps for our office location and WhatsApp for messaging. These services have their own privacy policies, which govern the information they collect when you interact with them. You can block or delete cookies through your browser settings; parts of the site may not work as intended if you do.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    blocks: [
      "We may update this privacy policy from time to time to reflect changes in our services or in the law. The revised policy takes effect from the date it is published on this page, and the \"last updated\" date above will always tell you when it was last revised. We encourage you to review this page occasionally.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    blocks: [
      "If you have any questions about this privacy policy, or about how your information is handled, please get in touch:",
      {
        list: [
          "Phone / WhatsApp: " + contact.phoneDisplay,
          "Email: " + contact.email,
          contact.offices[0].name + ": " + contact.offices[0].address,
          "Anna Nagar Office: Anna Nagar, Chennai",
        ],
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How SS Babysitter collects, uses and protects the information you share with us"
      image={images.privacyHero}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ]}
      updatedAt="16 September 2026"
      intro="Inviting a caregiver into your home takes trust, and that trust starts with how we handle your information. This policy explains, in plain language, what SS Babysitter collects when you enquire with us, why we collect it, who we share it with, and the control you have over it. It applies to our website at chennai.ssbabysitter.com and to enquiries made by phone, WhatsApp, email or at either of our Chennai offices."
      sections={sections}
    />
  );
}
