import PageHero from "@/components/ui/PageHero";
import ChildCareIntro from "./ChildCareIntro";
import AgeGroups from "./AgeGroups";
import SpecialNeeds from "./SpecialNeeds";
import ShiftsAndTimings from "./ShiftsAndTimings";
import { images } from "@/lib/siteData";

export default function ChildCarePage() {
  return (
    <>
      <PageHero
        title="Child Care Services in Chennai"
        subtitle="A baby sitter in Chennai for every age and stage"
        image={images.childCareHero}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Child Care", href: "/services/child-care" },
        ]}
      />
      <ChildCareIntro />
      <AgeGroups />
      <SpecialNeeds />
      <ShiftsAndTimings />
    </>
  );
}
