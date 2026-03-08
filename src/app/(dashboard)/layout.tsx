// (dashboard) route group layout
// Provides the sidebar shell for all authenticated dashboard pages.
// The sidebar fetches user identity server-side via SidebarServer.
// NavbarServer is NOT used inside the dashboard — sidebar has its own identity.

import { SidebarServer } from "@/components/dashboard/sidebar-server";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dash-shell">
      <SidebarServer />
      <main className="dash-main">{children}</main>

      <style>{`
        .dash-shell {
          display: flex;
          min-height: 100vh;
        }
        .dash-main {
          flex: 1;
          margin-left: 240px;
          background: var(--chalk);
          min-height: 100vh;
          transition: margin-left 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        @media (max-width: 1024px) {
          .dash-main {
            margin-left: 68px;
          }
        }

        @media (max-width: 768px) {
          .dash-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
