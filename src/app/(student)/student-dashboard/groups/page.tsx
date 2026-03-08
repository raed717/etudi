import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Groups",
};

type GroupMembership = {
  id: string;
  status: "pending" | "approved" | "rejected";
  joined_at: string;
  approved_at: string | null;
  groups: {
    id: string;
    name: string;
    classes: {
      name: string;
      grade: number;
    };
  };
};

const STATUS_CONFIG = {
  approved: {
    label: "Approved",
    color: "var(--forest-mid)",
    bg: "rgba(45,90,67,0.08)",
    border: "rgba(45,90,67,0.15)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 7l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  pending: {
    label: "Pending",
    color: "var(--gold)",
    bg: "rgba(212,168,67,0.08)",
    border: "rgba(212,168,67,0.15)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  rejected: {
    label: "Rejected",
    color: "var(--terracotta)",
    bg: "rgba(200,97,58,0.08)",
    border: "rgba(200,97,58,0.15)",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default async function MyGroupsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  // Fetch all memberships with group + class info
  const { data: memberships } = await supabase
    .from("group_members")
    .select("id, status, joined_at, approved_at, groups(id, name, classes(name, grade))")
    .eq("student_id", user.id)
    .order("joined_at", { ascending: false });

  const groups = (memberships ?? []) as unknown as GroupMembership[];

  // Separate by status for ordering
  const approved = groups.filter((g) => g.status === "approved");
  const pending = groups.filter((g) => g.status === "pending");
  const rejected = groups.filter((g) => g.status === "rejected");
  const sorted = [...pending, ...approved, ...rejected];

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}>
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
          My Groups
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            letterSpacing: "-0.03em",
            color: "var(--forest)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Your class groups
        </h1>
      </div>

      {/* ── Empty state ── */}
      {sorted.length === 0 && (
        <div className="animate-fade-up delay-100 mg-empty">
          <div className="mg-empty-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 24c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="20" cy="11" r="3" stroke="currentColor" strokeWidth="1.4" />
              <path d="M21 16c3 .5 5 3 5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <p className="mg-empty-title">No groups yet</p>
          <p className="mg-empty-desc">
            Join a group using a code from your teacher to get started.
          </p>
          <Link href="/student-dashboard/join" className="btn-primary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
            Enter join code
          </Link>
        </div>
      )}

      {/* ── Groups list ── */}
      {sorted.length > 0 && (
        <div className="animate-fade-up delay-100 mg-list">
          {sorted.map((membership) => {
            const cfg = STATUS_CONFIG[membership.status];
            const group = membership.groups;
            const cls = group.classes;

            return (
              <div key={membership.id} className="mg-card">
                <div className="mg-card-top">
                  <div className="mg-card-info">
                    <h3 className="mg-card-name">{group.name}</h3>
                    <p className="mg-card-class">
                      {cls.name} &middot; Grade {cls.grade}
                    </p>
                  </div>
                  <span
                    className="mg-status"
                    style={{
                      color: cfg.color,
                      background: cfg.bg,
                      borderColor: cfg.border,
                    }}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </span>
                </div>

                <div className="mg-card-meta">
                  <span>
                    Requested {new Date(membership.joined_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {membership.approved_at && (
                    <span>
                      Approved {new Date(membership.approved_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                {membership.status === "rejected" && (
                  <div className="mg-card-rejected-note">
                    Your request was declined. You can try requesting again via the join page.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        /* ── Empty state ── */
        .mg-empty {
          border: 2px dashed rgba(30,58,47,0.1);
          border-radius: var(--radius-card);
          padding: clamp(40px, 6vw, 64px) clamp(24px, 4vw, 48px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .mg-empty-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(125,181,200,0.08);
          color: var(--sky);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .mg-empty-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--forest);
          margin: 0;
        }
        .mg-empty-desc {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--forest);
          opacity: 0.5;
          margin: 0 0 8px;
        }

        /* ── Groups list ── */
        .mg-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 640px;
        }

        .mg-card {
          background: white;
          border: 1.5px solid rgba(30,58,47,0.07);
          border-radius: 16px;
          padding: clamp(16px, 2.5vw, 22px) clamp(18px, 3vw, 24px);
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mg-card:hover {
          border-color: rgba(30,58,47,0.12);
          box-shadow: 0 4px 16px rgba(30,58,47,0.06);
        }

        .mg-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .mg-card-info {
          flex: 1;
          min-width: 0;
        }
        .mg-card-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--forest);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .mg-card-class {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--forest);
          opacity: 0.5;
          margin: 4px 0 0;
        }

        .mg-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 999px;
          padding: 4px 10px;
          border: 1px solid;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .mg-card-meta {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          font-family: var(--font-body);
          font-size: 0.74rem;
          color: var(--forest);
          opacity: 0.35;
        }

        .mg-card-rejected-note {
          margin-top: 12px;
          padding: 10px 14px;
          background: rgba(200,97,58,0.05);
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--terracotta);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
