// CTA Section + Footer for etudi landing page

export function CtaSection() {
  return (
    <section
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)",
        background: "var(--cream-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "200%",
          background: "radial-gradient(ellipse, rgba(200,97,58,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 18,
            background: "var(--forest)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: "0 8px 32px rgba(30,58,47,0.2)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <path d="M6 20l5-12 4 8 3-5 5 9H6z" fill="var(--cream)" opacity="0.9"/>
            <circle cx="20" cy="7" r="3" fill="var(--gold)"/>
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--forest)",
            margin: "0 0 clamp(16px, 2.5vw, 24px)",
          }}
        >
          Ready to transform your{" "}
          <span style={{ fontStyle: "italic", color: "var(--terracotta)" }}>classroom?</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            lineHeight: 1.75,
            color: "var(--forest)",
            opacity: 0.65,
            margin: "0 auto clamp(32px, 5vw, 48px)",
            maxWidth: 500,
          }}
        >
          Join thousands of primary school teachers already using etudi to
          share better lessons and reach every student.
        </p>

        <div
          style={{
            display: "flex",
            gap: "clamp(10px, 2vw, 16px)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/sign-up" className="btn-primary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
            Get started — it&apos;s free
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/sign-in" className="btn-secondary" style={{ fontSize: "1.05rem", padding: "16px 36px" }}>
            Sign in
          </a>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--forest)",
            opacity: 0.45,
            marginTop: 20,
          }}
        >
          No credit card required &middot; Free forever for individual teachers
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--forest)",
        color: "var(--cream)",
        padding: "clamp(40px, 7vw, 80px) clamp(20px, 5vw, 60px) clamp(28px, 4vw, 48px)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 5vw, 64px)",
            marginBottom: "clamp(32px, 5vw, 56px)",
            paddingBottom: "clamp(32px, 5vw, 56px)",
            borderBottom: "1.5px solid rgba(247,243,235,0.08)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--terracotta)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M4 14l3-8 3 5 2-3 4 6H4z" fill="var(--cream)" opacity="0.9"/>
                  <circle cx="14" cy="5" r="2" fill="var(--gold)"/>
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.35rem",
                  color: "var(--cream)",
                  letterSpacing: "-0.02em",
                }}
              >
                etudi
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--cream)",
                opacity: 0.55,
                margin: 0,
                maxWidth: 280,
              }}
            >
              The platform built for primary school teachers to share lessons,
              resources, and connect with students effortlessly.
            </p>
          </div>

          {/* Links */}
          {[
            {
              heading: "Product",
              links: [
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Pricing", href: "/pricing" },
                { label: "Changelog", href: "/changelog" },
              ],
            },
            {
              heading: "Teachers",
              links: [
                { label: "Getting started", href: "/docs" },
                { label: "Lesson templates", href: "/templates" },
                { label: "Community", href: "/community" },
                { label: "Help center", href: "/help" },
              ],
            },
            {
              heading: "Company",
              links: [
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  color: "var(--cream)",
                  opacity: 0.45,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 16px",
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        color: "var(--cream)",
                        opacity: 0.6,
                        textDecoration: "none",
                        transition: "opacity 0.2s",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--cream)",
              opacity: 0.4,
              margin: 0,
            }}
          >
            &copy; {year} etudi. Made with care for teachers everywhere.
          </p>

          {/* Language / locale placeholder */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
            }}
          >
            {["Twitter/X", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="footer-social-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--cream)",
                  opacity: 0.4,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1fr 1fr 1fr !important;
          }
        }
        .footer-link:hover { opacity: 1 !important; }
        .footer-social-link:hover { opacity: 0.85 !important; }
      `}</style>
    </footer>
  );
}
