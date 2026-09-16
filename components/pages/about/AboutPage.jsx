import PageHero from "@/components/ui/PageHero";
import AboutStory from "./AboutStory";
import OurProcess from "./OurProcess";
import WhyParentsTrustUs from "./WhyParentsTrustUs";
import { images } from "@/lib/siteData";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About SS Babysitter"
        subtitle="Chennai's own baby care taker and nanny service, built on trust"
        image={images.aboutHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />
      <AboutStory />
      <WhyParentsTrustUs />
      <OurProcess />
    </>
  );
}
