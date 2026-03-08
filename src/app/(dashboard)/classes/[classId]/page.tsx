import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { GroupCard } from "@/components/dashboard/group-card";
import type { Metadata } from "next";
import type { Enums } from "@/types/supabase";

const SUBJECT_LABELS: Record<Enums<"subject">, string> = {
  mathematics: "Mathematics",
  french: "French",
  arabic: "Arabic",
  science: "Science",
  history: "History",
  geography: "Geography",
  civic_ed: "Civic Ed.",
  art: "Art",
  pe: "PE",
  english: "English",
};

const SUBJECT_COLORS: Record<Enums<"subject">, string> = {
  mathematics: "#4a7c59",
  french: "#7db5c8",
  arabic: "#c8613a",
  science: "#d4a843",
  history: "#8b6f47",
  geography: "#5a9e8f",
  civic_ed: "#7a6b8a",
  art: "#c87da8",
  pe: "#e07a55",
  english: "#5b8dbf",
};

type Props = { params: Promise<{ classId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { classId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("classes").select("name, grade").eq("id", classId).single();
  return { title: data ? `${data.name || `Grade ${data.grade}`}` : "Class" };
}

export default async function ClassDetailPage({ params }: Props) {
  const { classId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  // Fetch class + subjects
  const { data: cls } = await supabase
    .from("classes")
    .select("*, class_subjects(subject)")
    .eq("id", classId)
    .eq("teacher_id", user.id)
    .single();

  if (!cls) notFound();

  const subjects: Enums<"subject">[] = (cls.class_subjects ?? []).map(
    (cs: { subject: Enums<"subject"> }) => cs.subject,
  );

  // Fetch groups with member counts
  const { data: groups } = await supabase
    .from("groups")
    .select("*")
    .eq("class_id", classId)
    .order("created_at", { ascending: true });

  const groupsWithStats = await Promise.all(
    (groups ?? []).map(async (g) => {
      const { count: memberCount } = await supabase
        .from("group_members")
        .select("id", { count: "exact", head: true })
        .eq("group_id", g.id)
        .eq("status", "approved");

      const { count: pendingCount } = await supabase
        .from("group_members")
        .select("id", { count: "exact", head: true })
        .eq("group_id", g.id)
        .eq("status", "pending");

      return {
        ...g,
        memberCount: memberCount ?? 0,
        pendingCount: pendingCount ?? 0,
      };
    }),
  );

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Breadcrumb ── */}
      <div className="animate-fade-up">
        <Link
          href="/classes"
          className="cd-back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All classes
        </Link>
      </div>

      {/* ── Header ── */}
      <div
        className="animate-fade-up"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: "clamp(20px, 3vw, 32px)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span className="cd-grade-badge">Grade {cls.grade}</span>
            <span className="cd-year">{cls.academic_year}</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              letterSpacing: "-0.03em",
              color: "var(--forest)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {cls.name || `Grade ${cls.grade} Class`}
          </h1>
        </div>
        <Link href={`/classes/${classId}/edit`} className="btn-secondary" style={{ fontSize: "0.84rem", padding: "9px 20px" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10.5 1.5l2 2-8 8H2.5v-2l8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          Edit
        </Link>
      </div>

      {/* ── Subjects section ── */}
      <div className="animate-fade-up delay-100" style={{ marginBottom: "clamp(28px, 4vw, 40px)" }}>
        <h2 className="cd-section-title">Subjects</h2>
        {subjects.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {subjects.map((s) => (
              <span
                key={s}
                className="cd-subject-chip"
                style={{
                  background: `${SUBJECT_COLORS[s]}14`,
                  color: SUBJECT_COLORS[s],
                  borderColor: `${SUBJECT_COLORS[s]}25`,
                }}
              >
                {SUBJECT_LABELS[s]}
              </span>
            ))}
          </div>
        ) : (
          <p className="cd-empty-text">
            No subjects assigned yet. Edit this class to add subjects.
          </p>
        )}
      </div>

      {/* ── Groups section ── */}
      <div className="animate-fade-up delay-200">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <h2 className="cd-section-title" style={{ margin: 0 }}>Groups</h2>
          <Link
            href={`/classes/${classId}/groups/new`}
            className="btn-primary"
            style={{ fontSize: "0.82rem", padding: "8px 18px" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            New group
          </Link>
        </div>

        {groupsWithStats.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "clamp(36px, 6vw, 60px) 24px",
              background: "white",
              borderRadius: "var(--radius-card)",
              border: "1.5px solid rgba(30,58,47,0.08)",
            }}
          >
            <p className="cd-empty-text" style={{ margin: "0 0 16px" }}>
              No groups yet. Create a group so students can join with a code.
            </p>
            <Link
              href={`/classes/${classId}/groups/new`}
              className="btn-primary"
              style={{ fontSize: "0.85rem", padding: "10px 22px" }}
            >
              Create first group
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {groupsWithStats.map((g) => (
              <GroupCard
                key={g.id}
                id={g.id}
                classId={classId}
                name={g.name}
                joinCode={g.join_code}
                memberCount={g.memberCount}
                pendingCount={g.pendingCount}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .cd-back {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.5;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          transition: opacity 0.15s;
        }
        .cd-back:hover {
          opacity: 0.8;
        }
        .cd-grade-badge {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--cream);
          background: var(--forest);
          border-radius: 999px;
          padding: 3px 10px;
        }
        .cd-year {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.4;
        }
        .cd-section-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--forest);
          margin: 0 0 12px;
          letter-spacing: -0.01em;
        }
        .cd-subject-chip {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid;
        }
        .cd-empty-text {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--forest);
          opacity: 0.45;
        }
      `}</style>
    </div>
  );
}
