"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/server/actions/auth";

type SidebarProps = {
  fullName: string;
  email: string;
  avatarUrl: string | null;
  pendingCount: number;
};

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Classes",
    href: "/classes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 5l7-3 7 3-7 3-7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M2 9l7 3 7-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 13l7 3 7-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 16.5c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export function Sidebar({ fullName, email, avatarUrl, pendingCount }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      {/* ── Logo + collapse toggle ── */}
      <div className="sb-header">
        <Link href="/" className="sb-logo">
          <span className="sb-logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 14l3-8 3 5 2-3 4 6H4z" fill="var(--cream)" opacity="0.9" />
              <circle cx="14" cy="5" r="2" fill="var(--gold)" />
            </svg>
          </span>
          {!collapsed && <span className="sb-logo-text">etudi</span>}
        </Link>
        <button
          className="sb-collapse-btn sb-hide-mobile"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          >
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="sb-nav">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sb-nav-item${active ? " sb-nav-active" : ""}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
            >
              <span className="sb-nav-icon">{item.icon}</span>
              {!collapsed && (
                <span className="sb-nav-label">
                  {item.label}
                  {item.label === "Classes" && pendingCount > 0 && (
                    <span className="sb-pending-badge">{pendingCount}</span>
                  )}
                </span>
              )}
              {collapsed && item.label === "Classes" && pendingCount > 0 && (
                <span className="sb-pending-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Spacer ── */}
      <div style={{ flex: 1 }} />

      {/* ── User + sign out ── */}
      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-user-avatar">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={fullName} className="sb-user-img" />
            ) : (
              <span className="sb-user-initials">{initials}</span>
            )}
          </div>
          {!collapsed && (
            <div className="sb-user-info">
              <span className="sb-user-name">{fullName}</span>
              <span className="sb-user-email">{email}</span>
            </div>
          )}
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className={`sb-nav-item sb-sign-out`}
            title={collapsed ? "Sign out" : undefined}
          >
            <span className="sb-nav-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6.5 9H15M12 6l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 3H4a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 004 15h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            {!collapsed && <span className="sb-nav-label">Sign out</span>}
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="sb-mobile-trigger"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d={mobileOpen ? "M5 5l12 12M5 17L17 5" : "M3 6h16M3 11h16M3 16h16"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sb-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sb-root${collapsed ? " sb-collapsed" : ""}${mobileOpen ? " sb-mobile-open" : ""}`}>
        {sidebarContent}
      </aside>

      <style>{`
        /* ── Root ── */
        .sb-root {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 240px;
          background: var(--forest);
          display: flex;
          flex-direction: column;
          padding: 20px 12px;
          z-index: 40;
          transition: width 0.25s cubic-bezier(0.22,1,0.36,1);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .sb-collapsed {
          width: 68px;
        }

        /* ── Header ── */
        .sb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 20px;
          border-bottom: 1px solid rgba(247,243,235,0.08);
          margin-bottom: 16px;
        }
        .sb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .sb-logo-mark {
          width: 34px;
          height: 34px;
          background: rgba(247,243,235,0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sb-logo-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--cream);
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        .sb-collapse-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          background: rgba(247,243,235,0.06);
          color: rgba(247,243,235,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }
        .sb-collapse-btn:hover {
          background: rgba(247,243,235,0.12);
          color: var(--cream);
        }

        /* ── Nav ── */
        .sb-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sb-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(247,243,235,0.55);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          position: relative;
        }
        .sb-nav-item:hover {
          background: rgba(247,243,235,0.07);
          color: rgba(247,243,235,0.85);
        }
        .sb-nav-active {
          background: rgba(247,243,235,0.1);
          color: var(--cream);
          font-weight: 600;
        }
        .sb-nav-active:hover {
          background: rgba(247,243,235,0.13);
        }
        .sb-nav-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
        .sb-nav-label {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Pending badge / dot ── */
        .sb-pending-badge {
          background: var(--terracotta);
          color: var(--cream);
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
          line-height: 1;
        }
        .sb-pending-dot {
          position: absolute;
          top: 8px;
          right: 10px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--terracotta);
        }

        /* ── Footer / user ── */
        .sb-footer {
          border-top: 1px solid rgba(247,243,235,0.08);
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sb-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
        }
        .sb-user-avatar {
          flex-shrink: 0;
        }
        .sb-user-img,
        .sb-user-initials {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        .sb-user-img { object-fit: cover; }
        .sb-user-initials {
          background: var(--terracotta);
          color: var(--cream);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sb-user-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .sb-user-name {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--cream);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-user-email {
          font-family: var(--font-body);
          font-size: 0.7rem;
          color: rgba(247,243,235,0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Sign out ── */
        .sb-sign-out {
          color: rgba(247,243,235,0.4);
        }
        .sb-sign-out:hover {
          color: var(--terracotta-light);
          background: rgba(200,97,58,0.1);
        }

        /* ── Mobile trigger ── */
        .sb-mobile-trigger {
          display: none;
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 50;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1.5px solid rgba(30,58,47,0.1);
          background: var(--chalk);
          color: var(--forest);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(30,58,47,0.08);
        }

        /* ── Overlay ── */
        .sb-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(30,58,47,0.35);
          backdrop-filter: blur(4px);
          z-index: 35;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .sb-root {
            width: 68px;
          }
          .sb-logo-text,
          .sb-nav-label,
          .sb-user-info {
            display: none !important;
          }
          .sb-hide-mobile {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .sb-root {
            width: 260px;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
            box-shadow: 4px 0 24px rgba(30,58,47,0.2);
          }
          .sb-mobile-open {
            transform: translateX(0);
          }
          .sb-logo-text,
          .sb-nav-label,
          .sb-user-info {
            display: flex !important;
          }
          .sb-mobile-trigger {
            display: flex;
          }
          .sb-overlay {
            display: block;
          }
          .sb-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
