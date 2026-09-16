// Re-renders on every route change, giving each page a soft fade-in.
export default function Template({ children }) {
  return <div className="animate-page-in">{children}</div>;
}
