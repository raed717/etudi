// Marquee strip component
export function MarqueeStrip() {
  const items = [
    "Share lessons instantly",
    "Engage every student",
    "Track progress easily",
    "Upload any format",
    "Connect with families",
    "Save hours of prep",
  ];

  return (
    <div
      style={{
        background: "var(--forest)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
      }}
      aria-hidden
    >
      <div
        className="animate-marquee"
        style={{
          display: "flex",
          gap: 0,
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              paddingRight: 40,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1rem",
                color: "var(--cream)",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--gold)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
