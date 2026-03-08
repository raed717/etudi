import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
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

  // Stats
  const { count: classCount } = await supabase
    .from("classes")
    .select("id", { count: "exact", head: true })
    .eq("teacher_id", user.id);

  const { data: groups } = await supabase
    .from("groups")
    .select("id, classes!inner(teacher_id)")
    .eq("classes.teacher_id", user.id);

  const groupIds = groups?.map((g) => g.id) ?? [];

  let studentCount = 0;
  let pendingCount = 0;

  if (groupIds.length > 0) {
    const { count: sc } = await supabase
      .from("group_members")
      .select("id", { count: "exact", head: true })
      .in("group_id", groupIds)
      .eq("status", "approved");
    studentCount = sc ?? 0;

    const { count: pc } = await supabase
      .from("group_members")
      .select("id", { count: "exact", head: true })
      .in("group_id", groupIds)
      .eq("status", "pending");
    pendingCount = pc ?? 0;
  }

  const firstName = (profile?.full_name ?? "Teacher").split(" ")[0];

  const stats = [
    {
      label: "Classes",
      value: classCount ?? 0,
      href: "/classes",
      color: "var(--forest)",
      bgColor: "rgba(30,58,47,0.08)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M2 6l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M2 11l9 4 9-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 16l9 4 9-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Students",
      value: studentCount,
      href: "/classes",
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
      value: pendingCount,
      href: "/classes",
      color: "var(--terracotta)",
      bgColor: "rgba(200,97,58,0.1)",
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
            color: "var(--terracotta)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          Dashboard
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
                    background: "var(--terracotta)",
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

      {/* ── Quick actions ── */}
      <div className="animate-fade-up delay-200">
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
          <Link href="/classes/new" className="btn-primary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Create class
          </Link>
          <Link href="/classes" className="btn-secondary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
            View all classes
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pending-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
