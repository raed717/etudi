// Hero section for etudi landing page
export function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(100px, 14vw, 160px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
        paddingLeft: "clamp(20px, 5vw, 60px)",
        paddingRight: "clamp(20px, 5vw, 60px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background blobs */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "-5%",
          width: "clamp(280px, 45vw, 620px)",
          height: "clamp(280px, 45vw, 620px)",
          background:
            "radial-gradient(ellipse at center, rgba(125,181,200,0.22) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-8%",
          width: "clamp(200px, 35vw, 480px)",
          height: "clamp(200px, 35vw, 480px)",
          background:
            "radial-gradient(ellipse at center, rgba(212,168,67,0.14) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left: copy */}
        <div style={{ maxWidth: 680 }}>
          {/* Badge */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(30,58,47,0.07)",
              border: "1.5px solid rgba(30,58,47,0.12)",
              borderRadius: 999,
              padding: "6px 16px",
              marginBottom: "clamp(20px, 3vw, 32px)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--terracotta)",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.78rem",
                color: "var(--forest)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Built for primary school teachers
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-100"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "var(--forest)",
              margin: "0 0 clamp(16px, 2.5vw, 28px)",
            }}
          >
            Teaching made{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                position: "relative",
                display: "inline-block",
              }}
            >
              simple
              <svg
                viewBox="0 0 200 20"
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: 0,
                  width: "100%",
                  height: "auto",
                  overflow: "visible",
                }}
                aria-hidden
              >
                <path
                  d="M4 14 Q50 4 100 12 Q150 20 196 8"
                  stroke="var(--gold)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                  style={{ animation: "draw-line 1.2s 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
                />
              </svg>
            </span>
            ,<br />
            learning made{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--forest-mid)",
              }}
            >
              joyful
            </span>
            .
          </h1>

          {/* Sub */}
          <p
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.75,
              color: "var(--forest)",
              opacity: 0.72,
              margin: "0 0 clamp(28px, 4vw, 44px)",
              maxWidth: 560,
            }}
          >
            etudi gives primary school teachers a beautiful space to share
            lessons, materials, and updates — so every student can learn at
            their own pace, from anywhere.
          </p>

          {/* CTA row */}
          <div
            className="animate-fade-up delay-300"
            style={{
              display: "flex",
              gap: "clamp(10px, 2vw, 16px)",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a href="/sign-up" className="btn-primary" style={{ fontSize: "1rem", padding: "15px 32px" }}>
              Start for free
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#how-it-works" className="btn-secondary" style={{ fontSize: "1rem", padding: "15px 32px" }}>
              See how it works
            </a>
          </div>

          {/* Social proof row */}
          <div
            className="animate-fade-up delay-500"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: "clamp(24px, 3.5vw, 40px)",
            }}
          >
            {/* Avatars */}
            <div style={{ display: "flex" }}>
              {["#c8613a", "#2d5a43", "#d4a843", "#7db5c8"].map((color, i) => (
                <span
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: color,
                    border: "2px solid var(--cream)",
                    marginLeft: i === 0 ? 0 : -10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="5" r="2.5" fill="rgba(255,255,255,0.85)"/>
                    <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              ))}
            </div>
            <div>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 13 13" fill="var(--gold)" aria-hidden>
                    <path d="M6.5 1l1.46 3.06 3.3.48-2.38 2.32.56 3.28L6.5 8.56 3.06 10.14l.56-3.28L1.24 4.54l3.3-.48z"/>
                  </svg>
                ))}
              </div>
              <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--forest)", opacity: 0.65 }}>
                Loved by <strong>2,400+</strong> teachers worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right: illustrated card */}
        <div
          className="hero-visual animate-fade-in delay-400"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeroIllustration />
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 899px) {
          .hero-visual {
            display: none !important;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
        aspectRatio: "1 / 1.05",
      }}
    >
      {/* Main card */}
      <div
        className="animate-float"
        style={{
          background: "var(--forest)",
          borderRadius: 28,
          padding: "32px 28px",
          boxShadow: "0 24px 80px rgba(30,58,47,0.28), 0 4px 16px rgba(30,58,47,0.12)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Lesson header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, background: "var(--terracotta)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <rect x="3" y="3" width="16" height="12" rx="3" stroke="var(--cream)" strokeWidth="1.8"/>
              <path d="M7 19h8M11 15v4" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "var(--cream)", letterSpacing: "-0.01em" }}>
              Chapter 3 — Fractions
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(247,243,235,0.55)" }}>
              Mathematics · Grade 4
            </p>
          </div>
        </div>

        {/* Progress bars */}
        {[
          { label: "Introduction", pct: 100, color: "var(--gold)" },
          { label: "Visual examples", pct: 78, color: "var(--sky)" },
          { label: "Practice quiz", pct: 42, color: "var(--terracotta-light)" },
        ].map((item) => (
          <div key={item.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(247,243,235,0.75)", fontWeight: 500 }}>
                {item.label}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(247,243,235,0.55)" }}>
                {item.pct}%
              </span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 99, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}

        {/* Students */}
        <div style={{ marginTop: 20, background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(247,243,235,0.65)" }}>Students active</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex" }}>
              {["#c8613a","#d4a843","#7db5c8"].map((c,i) => (
                <span key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: "2px solid var(--forest)", marginLeft: i === 0 ? 0 : -6 }} />
              ))}
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--cream)" }}>24</span>
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div
        className="animate-float delay-300"
        style={{
          position: "absolute",
          bottom: "-18px",
          left: "-28px",
          background: "white",
          borderRadius: 18,
          padding: "14px 18px",
          boxShadow: "0 12px 40px rgba(30,58,47,0.14)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
          border: "1.5px solid rgba(30,58,47,0.06)",
          maxWidth: 220,
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(212,168,67,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M9 2l1.8 3.8 4.2.6-3 3 .7 4.2L9 11.4l-3.7 2.2.7-4.2-3-3 4.2-.6z" fill="var(--gold)"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", color: "var(--forest)" }}>New submission!</p>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--forest)", opacity: 0.55 }}>Maria completed Quiz 3</p>
        </div>
      </div>

      {/* Floating badge: upload */}
      <div
        className="animate-float delay-600"
        style={{
          position: "absolute",
          top: "12px",
          right: "-24px",
          background: "var(--terracotta)",
          borderRadius: 14,
          padding: "10px 16px",
          boxShadow: "0 8px 24px rgba(200,97,58,0.30)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 3,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M8 11V3M5 6l3-3 3 3" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12h12" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", color: "var(--cream)" }}>Share lesson</span>
      </div>
    </div>
  );
}
