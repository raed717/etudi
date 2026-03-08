import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StudentRow } from "@/components/dashboard/student-row";
import type { Metadata } from "next";

type Props = { params: Promise<{ classId: string; groupId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { groupId } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("groups").select("name").eq("id", groupId).single();
  return { title: data?.name || "Group" };
}

export default async function GroupDetailPage({ params }: Props) {
  const { classId, groupId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  // Verify teacher owns the class
  const { data: cls } = await supabase
    .from("classes")
    .select("id, name, grade")
    .eq("id", classId)
    .eq("teacher_id", user.id)
    .single();

  if (!cls) notFound();

  // Fetch group
  const { data: group } = await supabase
    .from("groups")
    .select("*")
    .eq("id", groupId)
    .eq("class_id", classId)
    .single();

  if (!group) notFound();

  // Fetch members with student info
  const { data: members } = await supabase
    .from("group_members")
    .select("*, students(full_name)")
    .eq("group_id", groupId)
    .order("joined_at", { ascending: true });

  // We need email for display — fetch from auth via student_id lookup
  // Since we can't query auth.users from client, we'll show the student name
  // from the students table and use the student_id for now.
  const memberRows = (members ?? []).map((m) => ({
    ...m,
    studentName: (m.students as { full_name: string } | null)?.full_name || "Student",
    studentEmail: "", // Email is in auth.users, not accessible via client SDK
  }));

  const pendingMembers = memberRows.filter((m) => m.status === "pending");
  const approvedMembers = memberRows.filter((m) => m.status === "approved");
  const rejectedMembers = memberRows.filter((m) => m.status === "rejected");

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Breadcrumb ── */}
      <div className="animate-fade-up">
        <Link href={`/classes/${classId}`} className="gd-back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {cls.name || `Grade ${cls.grade}`}
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
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              letterSpacing: "-0.03em",
              color: "var(--forest)",
              margin: "0 0 8px",
              lineHeight: 1.1,
            }}
          >
            {group.name || "Group"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="gd-code-label">Join code</span>
            <span className="gd-code">{group.join_code}</span>
          </div>
        </div>
      </div>

      {/* ── Pending ── */}
      {pendingMembers.length > 0 && (
        <div className="animate-fade-up delay-100" style={{ marginBottom: 28 }}>
          <h2 className="gd-section-title">
            Pending approval
            <span className="gd-count gd-count-pending">{pendingMembers.length}</span>
          </h2>
          <div className="gd-members-card">
            {pendingMembers.map((m) => (
              <StudentRow
                key={m.id}
                memberId={m.id}
                groupId={groupId}
                classId={classId}
                studentName={m.studentName}
                studentEmail={m.studentEmail}
                status="pending"
                joinedAt={m.joined_at}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Approved ── */}
      <div className="animate-fade-up delay-200" style={{ marginBottom: 28 }}>
        <h2 className="gd-section-title">
          Members
          <span className="gd-count">{approvedMembers.length}</span>
        </h2>
        {approvedMembers.length === 0 ? (
          <div className="gd-members-card" style={{ padding: "32px 20px", textAlign: "center" }}>
            <p className="gd-empty-text">No approved members yet.</p>
          </div>
        ) : (
          <div className="gd-members-card">
            {approvedMembers.map((m) => (
              <StudentRow
                key={m.id}
                memberId={m.id}
                groupId={groupId}
                classId={classId}
                studentName={m.studentName}
                studentEmail={m.studentEmail}
                status="approved"
                joinedAt={m.joined_at}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Rejected (collapsed) ── */}
      {rejectedMembers.length > 0 && (
        <div className="animate-fade-up delay-300">
          <h2 className="gd-section-title" style={{ opacity: 0.5 }}>
            Rejected
            <span className="gd-count">{rejectedMembers.length}</span>
          </h2>
          <div className="gd-members-card" style={{ opacity: 0.6 }}>
            {rejectedMembers.map((m) => (
              <StudentRow
                key={m.id}
                memberId={m.id}
                groupId={groupId}
                classId={classId}
                studentName={m.studentName}
                studentEmail={m.studentEmail}
                status="rejected"
                joinedAt={m.joined_at}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        .gd-back {
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
        .gd-back:hover {
          opacity: 0.8;
        }
        .gd-code-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.4;
        }
        .gd-code {
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--forest);
          background: rgba(30,58,47,0.06);
          padding: 5px 14px;
          border-radius: 8px;
        }
        .gd-section-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--forest);
          margin: 0 0 12px;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gd-count {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          background: rgba(30,58,47,0.08);
          color: var(--forest);
          border-radius: 999px;
          padding: 2px 8px;
        }
        .gd-count-pending {
          background: rgba(200,97,58,0.12);
          color: var(--terracotta);
        }
        .gd-members-card {
          background: white;
          border-radius: var(--radius-card);
          border: 1.5px solid rgba(30,58,47,0.08);
          overflow: hidden;
        }
        .gd-empty-text {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--forest);
          opacity: 0.4;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
