// Features section for etudi landing page
const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="3" y="3" width="20" height="14" rx="4" stroke="var(--forest)" strokeWidth="1.8"/>
        <path d="M9 21h8M13 17v4" stroke="var(--forest)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 10l2.5 2.5L17 8" stroke="var(--terracotta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "rgba(200,97,58,0.1)",
    title: "One-click lesson sharing",
    body: "Upload PDFs, videos, images, or slides. Students get instant access — no logins, no friction, no tech headaches.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <circle cx="13" cy="13" r="10" stroke="var(--forest)" strokeWidth="1.8"/>
        <path d="M13 8v5l3 3" stroke="var(--sky)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "rgba(125,181,200,0.12)",
    title: "Live progress tracking",
    body: "See exactly who has opened, read, or completed each lesson. Spot struggling students before they fall behind.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M4 20l4-4 3 3 5-6 6 7H4z" stroke="var(--forest)" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="19" cy="6" r="3" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"/>
      </svg>
    ),
    color: "rgba(212,168,67,0.12)",
    title: "Smart quizzes & activities",
    body: "Build quick checks for understanding right inside your lessons. Auto-graded, so you keep your evenings free.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M8 13s1.5 4 5 4 5-4 5-4" stroke="var(--forest)" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9.5" cy="9.5" r="1.5" fill="var(--terracotta)"/>
        <circle cx="16.5" cy="9.5" r="1.5" fill="var(--terracotta)"/>
        <circle cx="13" cy="13" r="10" stroke="var(--forest)" strokeWidth="1.8"/>
      </svg>
    ),
    color: "rgba(61,122,90,0.1)",
    title: "Family connection",
    body: "Keep parents in the loop with lesson summaries sent automatically. Build trust between school and home.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <rect x="4" y="6" width="18" height="14" rx="3" stroke="var(--forest)" strokeWidth="1.8"/>
        <path d="M9 10h8M9 14h5" stroke="var(--sky)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 3v3M8 3l1 2M18 3l-1 2" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    color: "rgba(125,181,200,0.12)",
    title: "Lesson library",
    body: "Save and reuse your best lessons year after year. Share with colleagues in the same school or across the district.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M13 4c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9" stroke="var(--forest)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 4l4 4-4 4" stroke="var(--terracotta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "rgba(200,97,58,0.1)",
    title: "Works on any device",
    body: "Students on phones, tablets, or old laptops — etudi adapts beautifully to every screen. Even offline access coming soon.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)",
        background: "var(--cream-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative shape */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse, rgba(212,168,67,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.8rem",
            color: "var(--terracotta)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Everything you need
        </p>

        {/* Heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "clamp(36px, 5vw, 64px)",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--forest)",
              margin: 0,
              maxWidth: 520,
            }}
          >
            A complete toolkit for the modern{" "}
            <span style={{ fontStyle: "italic", color: "var(--terracotta)" }}>classroom</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--forest)",
              opacity: 0.65,
              margin: 0,
              maxWidth: 340,
            }}
          >
            No training needed. Most teachers are up and running in under 10 minutes.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(14px, 2vw, 24px)",
          }}
        >
          {features.map((feat, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "clamp(24px, 3vw, 32px)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: feat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                {feat.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                  color: "var(--forest)",
                  margin: "0 0 10px",
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  color: "var(--forest)",
                  opacity: 0.65,
                  margin: 0,
                }}
              >
                {feat.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
