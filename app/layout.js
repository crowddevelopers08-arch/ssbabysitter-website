import { Dancing_Script, Nunito } from "next/font/google";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// Typography matches chennai.ssbabysitter.com: Nunito throughout, with
// Dancing Script reserved for the italic script accents.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://chennai.ssbabysitter.com"),
  title: "SS Babysitter Chennai | Professional Nanny Agency & Babysitting Services",
  description:
    "Looking for a trusted baby sitter in Chennai? SS Babysitter is a professional nanny agency offering local babysitting services, background-verified baby care takers, and elderly care support across Chennai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${dancingScript.variable} flex min-h-screen flex-col bg-white font-sans text-ink antialiased`}
      >
        {/* If JavaScript is unavailable, show scroll-reveal content without animation */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;translate:none!important;scale:none!important;rotate:none!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
