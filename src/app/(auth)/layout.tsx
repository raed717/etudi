// (auth) route group layout
// Warm editorial split-screen: decorative brand panel left, form right.

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-shell">
      {/* ── Left: Brand Panel ── */}
      <aside className="auth-panel">
        {/* Background blobs */}
        <div className="auth-blob auth-blob-1" aria-hidden />
        <div className="auth-blob auth-blob-2" aria-hidden />

        {/* Logo */}
        <a href="/" className="auth-logo" aria-label="etudi home">
          <span className="auth-logo-mark">e</span>
          <span className="auth-logo-wordmark">etudi</span>
        </a>

        {/* Central illustration */}
        <div className="auth-panel-center">
          <AuthPanelIllustration />
          <blockquote className="auth-quote">
            <p>
              "The best teachers don&apos;t give students the answers — they
              spark the curiosity to find them."
            </p>
            <footer>— etudi community</footer>
          </blockquote>
        </div>

        {/* Bottom stats */}
        <div className="auth-panel-stats">
          {[
            { value: "2,400+", label: "Teachers" },
            { value: "18k+", label: "Lessons shared" },
            { value: "94%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="auth-stat">
              <span className="auth-stat-value">{s.value}</span>
              <span className="auth-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Right: Form Panel ── */}
      <main className="auth-form-panel">{children}</main>

      <style>{`
        /* Shell */
        .auth-shell {
          display: grid;
          grid-template-columns: 480px 1fr;
          min-height: 100vh;
          background: var(--cream);
        }

        /* ── Left panel ── */
        .auth-panel {
          background: var(--forest);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 40px 44px;
        }

        /* Blobs */
        .auth-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .auth-blob-1 {
          top: -80px;
          right: -80px;
          width: 320px;
          height: 320px;
          background: radial-gradient(ellipse at center, rgba(125,181,200,0.18) 0%, transparent 70%);
          animation: blob-drift 14s ease-in-out infinite;
        }
        .auth-blob-2 {
          bottom: -60px;
          left: -60px;
          width: 260px;
          height: 260px;
          background: radial-gradient(ellipse at center, rgba(212,168,67,0.16) 0%, transparent 70%);
          animation: blob-drift 18s ease-in-out infinite reverse;
        }

        /* Logo */
        .auth-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }
        .auth-logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--terracotta);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 1.2rem;
          color: var(--cream);
          font-style: italic;
        }
        .auth-logo-wordmark {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--cream);
          letter-spacing: -0.02em;
        }

        /* Center */
        .auth-panel-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 36px;
          position: relative;
          z-index: 1;
        }

        /* Quote */
        .auth-quote {
          margin: 0;
          padding: 0;
          max-width: 340px;
          text-align: center;
        }
        .auth-quote p {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          color: rgba(247,243,235,0.80);
          line-height: 1.6;
          margin: 0 0 14px;
        }
        .auth-quote footer {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(247,243,235,0.40);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Stats */
        .auth-panel-stats {
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 1;
          padding-top: 24px;
          border-top: 1px solid rgba(247,243,235,0.10);
        }
        .auth-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .auth-stat-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--cream);
          letter-spacing: -0.02em;
        }
        .auth-stat-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(247,243,235,0.45);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* ── Right panel ── */
        .auth-form-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(40px, 6vw, 80px) clamp(24px, 5vw, 64px);
          overflow-y: auto;
        }

        /* ── Responsive: collapse to single column ── */
        @media (max-width: 860px) {
          .auth-shell {
            grid-template-columns: 1fr;
          }
          .auth-panel {
            display: none;
          }
          .auth-form-panel {
            min-height: 100vh;
            padding: clamp(32px, 8vw, 64px) clamp(20px, 5vw, 40px);
          }
        }
      `}</style>
    </div>
  );
}

function AuthPanelIllustration() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
      }}
    >
      {/* Floating lesson card */}
      <div
        className="animate-float"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1.5px solid rgba(255,255,255,0.10)",
          borderRadius: 20,
          padding: "22px 24px",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Card header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 38, height: 38,
            borderRadius: 10,
            background: "var(--terracotta)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <rect x="2" y="2" width="14" height="10" rx="2.5" stroke="var(--cream)" strokeWidth="1.6"/>
              <path d="M6 16h6M9 12v4" stroke="var(--cream)" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "var(--cream)", letterSpacing: "-0.01em" }}>
              Today&apos;s Lesson
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(247,243,235,0.50)" }}>
              Science · Grade 3
            </p>
          </div>
        </div>

        {/* Subject chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {["Plants & Growth", "Photosynthesis", "Lab Activity"].map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "rgba(247,243,235,0.75)",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              padding: "4px 10px",
              border: "1px solid rgba(255,255,255,0.10)",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(247,243,235,0.55)" }}>Class progress</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem", color: "var(--gold)" }}>67%</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "67%", background: "var(--gold)", borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <div
        className="animate-float delay-400"
        style={{
          position: "absolute",
          bottom: "-16px",
          right: "-20px",
          background: "var(--cream)",
          borderRadius: 14,
          padding: "11px 14px",
          display: "flex",
          alignItems: "center",
          gap: 9,
          boxShadow: "0 10px 32px rgba(0,0,0,0.20)",
        }}
      >
        <div style={{
          width: 30, height: 30,
          borderRadius: 8,
          background: "rgba(212,168,67,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="6" stroke="var(--gold)" strokeWidth="1.4"/>
            <path d="M7 4v3.5l2 2" stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.72rem", color: "var(--forest)" }}>12 students online</p>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "0.65rem", color: "var(--forest)", opacity: 0.5 }}>right now</p>
        </div>
      </div>

      {/* Floating badge: teacher */}
      <div
        className="animate-float delay-200"
        style={{
          position: "absolute",
          top: "-14px",
          left: "-18px",
          background: "var(--terracotta)",
          borderRadius: 12,
          padding: "8px 14px",
          boxShadow: "0 6px 20px rgba(200,97,58,0.35)",
          display: "flex",
          alignItems: "center",
          gap: 7,
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path d="M6.5 1l1.46 3.06 3.3.48-2.38 2.32.56 3.28L6.5 8.56 3.06 10.14l.56-3.28L1.24 4.54l3.3-.48z" fill="var(--cream)"/>
        </svg>
        <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.7rem", color: "var(--cream)" }}>Verified Teacher</span>
      </div>
    </div>
  );
}
