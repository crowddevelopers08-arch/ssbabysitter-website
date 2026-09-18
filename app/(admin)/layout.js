export const metadata = {
  title: "Leads | SS Babysitter Admin",
  // Internal tool — never index it, and don't pass link equity to it
  robots: { index: false, follow: false, nocache: true },
};

// The admin area deliberately skips the marketing header, top bar and footer.
export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-sand">{children}</div>;
}
