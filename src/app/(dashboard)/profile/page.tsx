import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name ?? user.email ?? "Teacher";
  const email = user.email ?? "";
  const role = profile?.role ?? "teacher";
  const school = profile?.school ?? null;
  const avatarUrl = profile?.avatar_url ?? null;
  const joinedAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(24px, 4vw, 48px)",
          paddingBottom: "clamp(60px, 8vw, 100px)",
          paddingLeft: "clamp(20px, 5vw, 60px)",
          paddingRight: "clamp(20px, 5vw, 60px)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* ── Page header ── */}
          <div className="animate-fade-up" style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.78rem",
                color: "var(--terracotta)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              Account
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.03em",
                color: "var(--forest)",
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              My Profile
            </h1>
          </div>

          {/* ── Identity card ── */}
          <div
            className="animate-fade-up delay-100"
            style={{
              background: "var(--forest)",
              borderRadius: 24,
              padding: "clamp(28px, 5vw, 44px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 4vw, 36px)",
              marginBottom: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle background glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: 220,
                height: 220,
                background: "radial-gradient(ellipse at center, rgba(125,181,200,0.18) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            {/* Avatar */}
            <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={fullName}
                  style={{
                    width: "clamp(72px, 10vw, 96px)",
                    height: "clamp(72px, 10vw, 96px)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(247,243,235,0.15)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "clamp(72px, 10vw, 96px)",
                    height: "clamp(72px, 10vw, 96px)",
                    borderRadius: "50%",
                    background: "var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: "var(--cream)",
                    border: "3px solid rgba(247,243,235,0.15)",
                  }}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name / role / school */}
            <div style={{ flex: 1, position: "relative", zIndex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    margin: 0,
                  }}
                >
                  {fullName}
                </h2>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "var(--terracotta)",
                    background: "rgba(200,97,58,0.18)",
                    border: "1px solid rgba(200,97,58,0.25)",
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  {role}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  color: "rgba(247,243,235,0.55)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {email}
              </p>
              {school && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    color: "rgba(247,243,235,0.40)",
                    margin: "4px 0 0",
                  }}
                >
                  {school}
                </p>
              )}
            </div>
          </div>

          {/* ── Info rows ── */}
          <div
            className="animate-fade-up delay-200"
            style={{
              background: "white",
              borderRadius: 20,
              border: "1.5px solid rgba(30,58,47,0.08)",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            {[
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1.5 14c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
                  </svg>
                ),
                label: "Full name",
                value: fullName,
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1.5 6l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ),
                label: "Email address",
                value: email,
              },
              {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 1l1.8 3.8 4.2.6-3 3 .7 4.2L8 10.56 4.3 12.6l.7-4.2-3-3 4.2-.6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
                  </svg>
                ),
                label: "Role",
                value: role.charAt(0).toUpperCase() + role.slice(1),
              },
              ...(school
                ? [
                    {
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M5 7V5.5a3 3 0 016 0V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <circle cx="8" cy="11" r="1" fill="currentColor"/>
                        </svg>
                      ),
                      label: "School",
                      value: school,
                    },
                  ]
                : []),
              ...(joinedAt
                ? [
                    {
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M5 1v3M11 1v3M1.5 7h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      ),
                      label: "Member since",
                      value: joinedAt,
                    },
                  ]
                : []),
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 24px",
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(30,58,47,0.06)" : "none",
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "rgba(30,58,47,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--forest)",
                    flexShrink: 0,
                  }}
                >
                  {row.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--forest)",
                      opacity: 0.4,
                      margin: "0 0 2px",
                    }}
                  >
                    {row.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.92rem",
                      fontWeight: 500,
                      color: "var(--forest)",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Actions ── */}
          <div
            className="animate-fade-up delay-300"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              href="/dashboard"
              className="btn-primary"
              style={{ fontSize: "0.9rem", padding: "12px 24px" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="8.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="1.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <rect x="8.5" y="8.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              Go to dashboard
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
