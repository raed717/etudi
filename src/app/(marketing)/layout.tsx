// (marketing) route group layout
// Wraps landing page, pricing, about, etc.

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header / Navbar will go here */}
      <header className="border-b px-6 py-4" />
      <main className="flex-1">{children}</main>
      {/* Footer will go here */}
      <footer className="border-t px-6 py-4" />
    </div>
  );
}
