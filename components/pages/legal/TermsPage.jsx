import LegalLayout from "./LegalLayout";
import { contact, images } from "@/lib/siteData";

const sections = [
  {
    id: "about-these-terms",
    title: "About These Terms",
    blocks: [
      "These terms and conditions govern your use of the SS Babysitter website and the placement services we provide to families in Chennai. By enquiring with us, visiting one of our offices, or accepting a caregiver placement, you agree to these terms.",
      "In these terms, \"we\", \"us\" and \"SS Babysitter\" refer to SS Babysitter, Chennai. \"You\" refers to the family, individual or organisation engaging our services. \"Caregiver\" refers to any babysitter, nanny, baby care taker or elderly care attendant introduced by us.",
    ],
  },
  {
    id: "our-role",
    title: "Our Role as a Placement Agency",
    blocks: [
      "SS Babysitter is a placement and staffing agency. We screen, verify and introduce caregivers to families, and support the placement throughout its term. Our role is to match you with a suitable caregiver and to stand behind that match.",
      "Day-to-day supervision of the caregiver inside your home — the routine, the instructions, and the working conditions — remains with you. We ask that caregivers be treated with the same respect and safety you would expect for your own family.",
    ],
  },
  {
    id: "screening",
    title: "Screening and Background Verification",
    blocks: [
      "Every caregiver we place goes through our screening process before being introduced to a family. This includes:",
      {
        list: [
          "Verification of identity and address proof",
          "A check of previous employment and references, where available",
          "A personal interview at one of our offices",
          "Background verification appropriate to the role",
        ],
      },
      {
        note: "Screening substantially reduces risk, but no verification process can guarantee future conduct. We strongly encourage families to meet the caregiver, ask questions, and use the trial period to satisfy themselves before confirming a placement.",
      },
    ],
  },
  {
    id: "placement-process",
    title: "The Placement Process",
    blocks: [
      "Once we understand your requirement, we typically share a few caregiver profiles for you to choose from — usually from within a 3 km radius of your home, so that attendance stays reliable.",
      "You are welcome to visit our Urapakkam or Anna Nagar office to meet us and the caregiver in person before deciding. A placement is confirmed only once you have selected a caregiver and agreed the timings and terms of engagement with us.",
    ],
  },
  {
    id: "trial-and-replacement",
    title: "Trial Period and Replacements",
    blocks: [
      "Every new placement begins with a 1-week trial. If the caregiver is not the right fit for your family during this period, tell us and we will arrange a replacement at no additional placement charge.",
      "After the trial period, if a caregiver leaves or is found unsuitable, we will work to arrange a replacement in line with the terms agreed at the time of placement. Replacement requests should be raised with us directly rather than settled privately with the caregiver, so that we can support both sides fairly.",
    ],
  },
  {
    id: "fees-and-payment",
    title: "Fees and Payment",
    blocks: [
      "Our charges depend on the type of care required, the shift timings and the duration of the engagement. The applicable fee is explained to you clearly before a placement is confirmed — there are no hidden charges added afterwards.",
      {
        list: [
          "All fees are quoted in Indian Rupees and are payable as agreed at the time of placement",
          "Caregiver salary and agency charges are separate components and will be explained to you individually",
          "Receipts are issued for payments made to SS Babysitter",
          "We ask that salary payments to a caregiver be made as agreed, and on time",
        ],
      },
      "Placement charges are linked to the service of finding, verifying and introducing a caregiver. Refunds, where applicable, are handled as set out in the section below.",
    ],
  },
  {
    id: "cancellation-refunds",
    title: "Cancellation and Refunds",
    blocks: [
      "You may cancel an enquiry at any time before a placement is confirmed, at no cost. Once a caregiver has been placed, please give us reasonable notice if you wish to end the engagement, so that we can support the caregiver's transition.",
      "If we are unable to provide a suitable caregiver or a replacement within a reasonable time after a confirmed placement, we will discuss a fair resolution with you, which may include a partial or full refund of the placement charge depending on the circumstances. Refunds are processed to the original payment method within a reasonable period.",
    ],
  },
  {
    id: "your-responsibilities",
    title: "Your Responsibilities",
    blocks: [
      "To keep every placement safe and workable for both sides, we ask that you:",
      {
        list: [
          "Give us accurate and complete information about your requirement, including any medical, dietary or special care needs",
          "Provide a safe and respectful working environment for the caregiver",
          "Agree working hours, duties and time off clearly at the outset, and keep to them",
          "Pay the caregiver's salary in full and on time, as agreed",
          "Tell us promptly about any concern, incident or change in your requirement",
          "Not ask the caregiver to take on duties materially different from what was agreed without speaking to us first",
        ],
      },
    ],
  },
  {
    id: "direct-hiring",
    title: "Direct Hiring and Referrals",
    blocks: [
      "Caregivers are introduced to you through our screening, verification and coordination work. Engaging a caregiver introduced by us outside the agreed arrangement — or referring them to another family without informing us — undermines that work and leaves both you and the caregiver without our support, replacement cover or dispute resolution.",
      "If you wish to change the basis of an engagement, or a friend or relative would like to engage the same caregiver, please speak to us and we will arrange it properly.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    blocks: [
      "We take our screening and matching responsibilities seriously and will always act in good faith to resolve problems. However, as a placement agency, we are not able to accept liability for the day-to-day acts or omissions of a caregiver while working in your home, or for any loss, damage or injury arising from the engagement, beyond what is required by law.",
      "Our total liability in connection with any placement is limited to the placement charge paid to us for that placement. Nothing in these terms excludes any liability that cannot lawfully be excluded.",
    ],
  },
  {
    id: "website-use",
    title: "Use of This Website",
    blocks: [
      "The content on this website — text, images, logos and design — belongs to SS Babysitter or is used under licence, and may not be copied or reproduced without our permission.",
      "Information on this site, including service descriptions and timings, is provided for general guidance and may change. We aim to keep it accurate and current, but it does not form a binding offer on its own. The terms that apply to you are those confirmed at the time of your placement.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and Disputes",
    blocks: [
      "These terms are governed by the laws of India. Any dispute arising out of or in connection with our services is subject to the exclusive jurisdiction of the courts at Chennai, Tamil Nadu.",
      "Before that, please talk to us. Most concerns are resolved quickly with a phone call, and we would much rather fix a problem than argue about it.",
    ],
  },
  {
    id: "changes-and-contact",
    title: "Changes and Contact",
    blocks: [
      "We may update these terms from time to time. The version published on this page, with the \"last updated\" date shown above, is the version that applies. For any question about these terms, reach us at:",
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

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="The terms that apply when you engage SS Babysitter for child care or elderly care in Chennai"
      image={images.termsHero}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
      ]}
      updatedAt="16 September 2026"
      intro="These terms set out what you can expect from SS Babysitter and what we ask of you in return — how placements work, what the 1-week trial and replacement cover include, how fees are handled, and where our responsibility as a placement agency begins and ends. Please read them before confirming a placement. If anything here is unclear, call us and we'll walk you through it."
      sections={sections}
    />
  );
}
