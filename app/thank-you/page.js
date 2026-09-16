import ThankYouPage from "@/components/pages/thank-you/ThankYouPage";

export const metadata = {
  title: "Thank You | SS Babysitter Chennai",
  description: "Thanks for getting in touch with SS Babysitter. Our team will call you back shortly.",
  // Confirmation pages shouldn't surface in search results or dilute the site's SEO.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <ThankYouPage />;
}
