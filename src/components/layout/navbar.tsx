"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: menuOpen ? "16px 24px" : scrolled ? "12px 24px" : "20px 24px",
        background: scrolled || menuOpen ? "rgba(247, 243, 235, 0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1.5px solid rgba(30,58,47,0.08)" : "none",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 36,
              height: 36,
              background: "var(--forest)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 14l3-8 3 5 2-3 4 6H4z" fill="var(--cream)" opacity="0.9"/>
              <circle cx="14" cy="5" r="2" fill="var(--gold)"/>
            </svg>
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.35rem",
              color: "var(--forest)",
              letterSpacing: "-0.02em",
            }}
          >
            etudi
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "For teachers", href: "#teachers" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.92rem",
                  color: "var(--forest)",
                  textDecoration: "none",
                  opacity: 0.75,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.75")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="hidden-mobile">
          <a href="/sign-in" className="btn-secondary" style={{ padding: "10px 22px", fontSize: "0.88rem" }}>
            Sign in
          </a>
          <a href="/sign-up" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.88rem" }}>
            Get started free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "none",
            flexDirection: "column",
            gap: 5,
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--forest)",
              borderRadius: 2,
              transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--forest)",
              borderRadius: 2,
              transition: "opacity 0.25s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--forest)",
              borderRadius: 2,
              transition: "transform 0.25s, opacity 0.25s",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="show-mobile"
          style={{
            padding: "16px 0 24px",
            borderTop: "1.5px solid rgba(30,58,47,0.08)",
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            maxWidth: 1200,
            margin: "12px auto 0",
          }}
        >
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "For teachers", href: "#teachers" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "1rem",
                color: "var(--forest)",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid rgba(30,58,47,0.06)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <a href="/sign-in" className="btn-secondary" style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}>
              Sign in
            </a>
            <a href="/sign-up" className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}>
              Get started free
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
