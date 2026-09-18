import { Dancing_Script, Nunito } from "next/font/google";
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

/**
 * Root layout holds only <html>/<body> and the fonts, so the public site
 * (app/(site)) and the admin dashboard (app/(admin)) can each bring their own
 * chrome — the dashboard has no marketing header or footer.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${dancingScript.variable} bg-white font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
