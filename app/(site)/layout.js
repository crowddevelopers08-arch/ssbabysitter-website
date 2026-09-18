import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Chrome for every public-facing page. The admin dashboard sits outside this group.
export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* If JavaScript is unavailable, show scroll-reveal content without animation */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;translate:none!important;scale:none!important;rotate:none!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
      </noscript>
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
