// (student) route group layout
// Provides the sidebar shell for all student dashboard pages.
// Mirrors the (dashboard) layout but uses StudentSidebarServer.

import { StudentSidebarServer } from "@/components/student/student-sidebar-server";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="stu-shell">
      <StudentSidebarServer />
      <main className="stu-main">{children}</main>

      <style>{`
        .stu-shell {
          display: flex;
          min-height: 100vh;
        }
        .stu-main {
          flex: 1;
          margin-left: 240px;
          background: var(--chalk);
          min-height: 100vh;
          transition: margin-left 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        @media (max-width: 1024px) {
          .stu-main {
            margin-left: 68px;
          }
        }

        @media (max-width: 768px) {
          .stu-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
