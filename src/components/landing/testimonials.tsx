// Testimonials section
const testimonials = [
  {
    quote:
      "I used to spend Sunday evenings printing worksheets and emailing PDFs. Now I upload once and my whole class has access. It genuinely gave me my weekends back.",
    name: "Sophie Moreau",
    role: "Year 3 Teacher · Lyon, France",
    avatar: "var(--terracotta)",
    initial: "S",
  },
  {
    quote:
      "My students are MORE engaged because they can revisit lessons at home at their own pace. Parents love it too — they finally understand what we're learning in class.",
    name: "James Okafor",
    role: "Primary Educator · Lagos, Nigeria",
    avatar: "var(--forest-mid)",
    initial: "J",
  },
  {
    quote:
      "The quiz feature is a game changer. I can see immediately who's understood the concept and who needs more support, without waiting until the next test.",
    name: "Ana Lima",
    role: "Grade 4 Teacher · São Paulo, Brazil",
    avatar: "var(--sky)",
    initial: "A",
  },
];

const stats = [
  { value: "2,400+", label: "Teachers active" },
  { value: "48K+", label: "Lessons shared" },
  { value: "4.9★", label: "Average rating" },
  { value: "12 min", label: "Avg. setup time" },
];

export function TestimonialsSection() {
  return (
    <section
      id="teachers"
      style={{
        padding: "clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)",
        background: "var(--forest)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: 600,
          height: 600,
          background: "radial-gradient(ellipse, rgba(212,168,67,0.12) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse, rgba(125,181,200,0.1) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "var(--gold)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Trusted by teachers
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "var(--cream)",
              margin: "0 auto",
              maxWidth: 560,
            }}
          >
            Teachers love it.{" "}
            <span style={{ fontStyle: "italic", color: "var(--terracotta-light)" }}>
              Students thrive.
            </span>
          </h2>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
            marginBottom: "clamp(40px, 6vw, 64px)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "clamp(20px, 2.5vw, 28px) 16px",
                background: "rgba(247,243,235,0.05)",
                borderRadius: 18,
                border: "1.5px solid rgba(247,243,235,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                  color: "var(--cream)",
                  margin: "0 0 4px",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "var(--cream)",
                  opacity: 0.5,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                padding: "clamp(24px, 3vw, 32px)",
                background: "rgba(247,243,235,0.05)",
                borderRadius: "var(--radius-card)",
                border: "1.5px solid rgba(247,243,235,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                transition: "background 0.2s, transform 0.2s",
              }}
            >
              {/* Quote mark */}
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden>
                <path d="M0 22V12C0 5.373 4.701 1.12 14.104 0l1.264 2.174C10.328 3.427 7.791 6.286 7.791 10.14V11H14V22H0zm14 0V12C14 5.373 18.701 1.12 28.104 0l1.264 2.174C24.328 3.427 21.791 6.286 21.791 10.14V11H28V22H14z" fill="var(--gold)" fillOpacity="0.3"/>
              </svg>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  lineHeight: 1.72,
                  color: "var(--cream)",
                  opacity: 0.88,
                  margin: 0,
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: t.avatar,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--cream)",
                    }}
                  >
                    {t.initial}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "var(--cream)",
                      margin: 0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.78rem",
                      color: "var(--cream)",
                      opacity: 0.5,
                      margin: 0,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonial-card:hover {
          background: rgba(247,243,235,0.09) !important;
          transform: translateY(-4px) !important;
        }
      `}</style>
    </section>
  );
}
