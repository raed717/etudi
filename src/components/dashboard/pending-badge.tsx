type PendingBadgeProps = {
  count: number;
  size?: "sm" | "md";
};

export function PendingBadge({ count, size = "sm" }: PendingBadgeProps) {
  if (count === 0) return null;

  const styles: React.CSSProperties =
    size === "md"
      ? {
          background: "var(--terracotta)",
          color: "var(--cream)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 700,
          minWidth: 22,
          height: 22,
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 7px",
          lineHeight: 1,
          animation: "pending-pulse 2s ease-in-out infinite",
        }
      : {
          background: "var(--terracotta)",
          color: "var(--cream)",
          fontFamily: "var(--font-body)",
          fontSize: "0.65rem",
          fontWeight: 700,
          minWidth: 18,
          height: 18,
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 5px",
          lineHeight: 1,
          animation: "pending-pulse 2s ease-in-out infinite",
        };

  return (
    <>
      <span style={styles}>{count}</span>
      <style>{`
        @keyframes pending-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
