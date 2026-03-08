"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "@/server/actions/auth";

export type NavbarUserData = {
  fullName: string;
  email: string;
  avatarUrl: string | null;
  role: "teacher" | "admin" | "student";
};

export function UserAvatar({ user }: { user: NavbarUserData }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const initials = user.fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={ref} className="ua-root">
      {/* Avatar button */}
      <button
        className="ua-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open account menu"
      >
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="ua-avatar-img"
          />
        ) : (
          <span className="ua-avatar-initials">{initials}</span>
        )}
        {/* Chevron */}
        <svg
          className={`ua-chevron${open ? " ua-chevron-open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="ua-dropdown" role="menu">
          {/* User identity */}
          <div className="ua-identity">
            <div className="ua-identity-avatar">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatarUrl} alt={user.fullName} className="ua-identity-img" />
              ) : (
                <span className="ua-identity-initials">{initials}</span>
              )}
            </div>
            <div className="ua-identity-text">
              <span className="ua-identity-name">{user.fullName}</span>
              <span className="ua-identity-email">{user.email}</span>
            </div>
            <span className="ua-role-chip">{user.role}</span>
          </div>

          <div className="ua-divider" />

          {/* Menu items */}
          <Link
            href="/profile"
            className="ua-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M1.5 13.5c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
            </svg>
            Profile
          </Link>

          <Link
            href="/dashboard"
            className="ua-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
              <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="8.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="1.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <rect x="8.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            Dashboard
          </Link>

          <div className="ua-divider" />

          {/* Sign out */}
          <form action={signOut}>
            <button type="submit" className="ua-item ua-item-danger" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M5.5 7.5H13M10 4.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Sign out
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ua-root {
          position: relative;
        }

        /* Trigger */
        .ua-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(30,58,47,0.07);
          border: 1.5px solid rgba(30,58,47,0.10);
          border-radius: 999px;
          padding: 4px 10px 4px 4px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .ua-trigger:hover {
          background: rgba(30,58,47,0.11);
          border-color: rgba(30,58,47,0.18);
        }

        /* Avatar circle */
        .ua-avatar-img,
        .ua-avatar-initials {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ua-avatar-img {
          object-fit: cover;
        }
        .ua-avatar-initials {
          background: var(--forest);
          color: var(--cream);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02em;
        }

        /* Chevron */
        .ua-chevron {
          color: var(--forest);
          opacity: 0.55;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .ua-chevron-open {
          transform: rotate(180deg);
        }

        /* Dropdown panel */
        .ua-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 256px;
          background: white;
          border: 1.5px solid rgba(30,58,47,0.09);
          border-radius: 16px;
          box-shadow: 0 16px 48px rgba(30,58,47,0.14), 0 2px 8px rgba(30,58,47,0.06);
          padding: 8px;
          z-index: 100;
          animation: ua-pop 0.18s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes ua-pop {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Identity block */
        .ua-identity {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px 10px 10px;
        }
        .ua-identity-img,
        .ua-identity-initials {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .ua-identity-img { object-fit: cover; }
        .ua-identity-initials {
          background: var(--forest);
          color: var(--cream);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ua-identity-text {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .ua-identity-name {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--forest);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ua-identity-email {
          font-family: var(--font-body);
          font-size: 0.72rem;
          color: var(--forest);
          opacity: 0.45;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ua-role-chip {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--terracotta);
          background: rgba(200,97,58,0.10);
          border-radius: 999px;
          padding: 3px 8px;
          flex-shrink: 0;
          border: 1px solid rgba(200,97,58,0.15);
        }

        /* Divider */
        .ua-divider {
          height: 1px;
          background: rgba(30,58,47,0.07);
          margin: 4px 0;
        }

        /* Menu item */
        .ua-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 10px;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 0.87rem;
          font-weight: 500;
          color: var(--forest);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-align: left;
        }
        .ua-item:hover {
          background: rgba(30,58,47,0.06);
        }
        .ua-item-danger {
          color: var(--terracotta);
        }
        .ua-item-danger:hover {
          background: rgba(200,97,58,0.08);
          color: var(--terracotta);
        }
      `}</style>
    </div>
  );
}
