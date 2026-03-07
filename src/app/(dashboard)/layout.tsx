// (dashboard) route group layout
// Wraps all authenticated dashboard pages

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will go here */}
      <aside className="w-64 shrink-0 border-r" />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
