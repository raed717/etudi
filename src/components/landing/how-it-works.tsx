// How It Works section
const steps = [
  {
    number: "01",
    title: "Create your classroom",
    body: "Sign up in 30 seconds. Name your classroom, add a cover, and you're ready. No IT department needed.",
    accent: "var(--terracotta)",
    bg: "rgba(200,97,58,0.07)",
  },
  {
    number: "02",
    title: "Upload your lessons",
    body: "Drag and drop any file — PDF, video, audio, or slides. Add a title and description, and publish in one click.",
    accent: "var(--forest-mid)",
    bg: "rgba(45,90,67,0.07)",
  },
  {
    number: "03",
    title: "Share with students",
    body: "Send a single link or classroom code. Students join instantly — no accounts required for viewing.",
    accent: "var(--sky)",
    bg: "rgba(125,181,200,0.1)",
  },
  {
    number: "04",
    title: "Watch them learn",
    body: "Track who's engaged, collect quiz answers, and send feedback — all from one clean dashboard.",
    accent: "var(--gold)",
    bg: "rgba(212,168,67,0.1)",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative vertical line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "15%",
          bottom: "15%",
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(30,58,47,0.1) 20%, rgba(30,58,47,0.1) 80%, transparent)",
          display: "none",
        }}
        className="center-line"
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
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
            How it works
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--forest)",
              margin: "0 auto 16px",
              maxWidth: 560,
            }}
          >
            From lesson idea to{" "}
            <span style={{ fontStyle: "italic", color: "var(--forest-mid)" }}>student engagement</span>
            {" "}in minutes
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--forest)",
              opacity: 0.6,
              margin: "0 auto",
              maxWidth: 460,
            }}
          >
            Four simple steps is all it takes to transform how you share knowledge with your class.
          </p>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
            gap: "clamp(16px, 2.5vw, 28px)",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="step-card"
              style={{
                position: "relative",
                padding: "clamp(24px, 3vw, 36px)",
                background: "white",
                borderRadius: "var(--radius-card)",
                border: "1.5px solid rgba(30,58,47,0.07)",
                boxShadow: "var(--shadow-card)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: step.bg,
                  border: `1.5px solid ${step.accent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: step.accent,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Arrow connector (decorative, hidden on last) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "44px",
                    right: "-16px",
                    zIndex: 1,
                    display: "none",
                  }}
                  className="step-arrow"
                >
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path d="M0 8h28M22 2l6 6-6 6" stroke="rgba(30,58,47,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

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
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  lineHeight: 1.72,
                  color: "var(--forest)",
                  opacity: 0.62,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .step-arrow { display: block !important; }
          .center-line { display: block !important; }
        }
        .step-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: var(--shadow-warm) !important;
        }
      `}</style>
    </section>
  );
}
