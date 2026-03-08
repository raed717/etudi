import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard",
};

export default async function StudentDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // Count approved groups
  const { count: groupCount } = await supabase
    .from("group_members")
    .select("id", { count: "exact", head: true })
    .eq("student_id", user.id)
    .eq("status", "approved");

  // Count pending requests
  const { count: pendingCount } = await supabase
    .from("group_members")
    .select("id", { count: "exact", head: true })
    .eq("student_id", user.id)
    .eq("status", "pending");

  const firstName = (profile?.full_name ?? "Student").split(" ")[0];
  const hasGroups = (groupCount ?? 0) > 0;

  const stats = [
    {
      label: "My Groups",
      value: groupCount ?? 0,
      href: "/student-dashboard/groups",
      color: "var(--sky)",
      bgColor: "rgba(125,181,200,0.12)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M1 19c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M17 12.5c2.5.5 4 2.5 4 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pendingCount ?? 0,
      href: "/student-dashboard/groups",
      color: "var(--gold)",
      bgColor: "rgba(212,168,67,0.10)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 6v6l4 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Greeting ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(28px, 4vw, 44px)" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.78rem",
            color: "var(--sky)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          Student Dashboard
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            letterSpacing: "-0.03em",
            color: "var(--forest)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Welcome back, {firstName}
        </h1>
      </div>

      {/* ── Stats grid ── */}
      <div
        className="animate-fade-up delay-100"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: "clamp(28px, 4vw, 44px)",
        }}
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card"
            style={{
              padding: "clamp(20px, 3vw, 28px)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: stat.bgColor,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </span>
              {stat.label === "Pending" && stat.value > 0 && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--gold)",
                    animation: "pending-pulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  color: "var(--forest)",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--forest)",
                  opacity: 0.5,
                  margin: "6px 0 0",
                }}
              >
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Join CTA / Quick Actions ── */}
      <div className="animate-fade-up delay-200">
        {!hasGroups ? (
          /* First-time student experience: prominent join CTA */
          <div className="sd-join-cta">
            <div className="sd-join-cta-inner">
              <div className="sd-join-cta-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="3" y="5" width="26" height="22" rx="4" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M16 11v10M11 16h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="sd-join-cta-title">Join your first group</h2>
              <p className="sd-join-cta-desc">
                Ask your teacher for a 6-character join code, then enter it to request access to their class group.
              </p>
              <Link href="/student-dashboard/join" className="btn-primary" style={{ fontSize: "0.9rem", padding: "12px 28px" }}>
                Enter join code
              </Link>
            </div>
          </div>
        ) : (
          /* Returning student: quick actions */
          <>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.15rem",
                color: "var(--forest)",
                margin: "0 0 16px",
                letterSpacing: "-0.01em",
              }}
            >
              Quick actions
            </h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/student-dashboard/join" className="btn-primary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                Join a group
              </Link>
              <Link href="/student-dashboard/groups" className="btn-secondary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
                View my groups
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes pending-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .sd-join-cta {
          border: 2px dashed rgba(125,181,200,0.3);
          border-radius: var(--radius-card);
          padding: clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px);
          text-align: center;
          background: rgba(125,181,200,0.04);
        }
        .sd-join-cta-inner {
          max-width: 380px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .sd-join-cta-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(125,181,200,0.1);
          color: var(--sky);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .sd-join-cta-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--forest);
          margin: 0;
          letter-spacing: -0.02em;
        }
        .sd-join-cta-desc {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--forest);
          opacity: 0.55;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
