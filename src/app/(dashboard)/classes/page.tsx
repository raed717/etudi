import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ClassCard } from "@/components/dashboard/class-card";
import type { Metadata } from "next";
import type { Enums } from "@/types/supabase";

export const metadata: Metadata = {
  title: "My Classes",
};

export default async function ClassesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  // Fetch classes with subjects
  const { data: classes } = await supabase
    .from("classes")
    .select("*, class_subjects(subject)")
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false });

  // For each class, count groups and approved students
  const classesWithStats = await Promise.all(
    (classes ?? []).map(async (cls) => {
      const { data: groups } = await supabase
        .from("groups")
        .select("id")
        .eq("class_id", cls.id);

      const groupIds = groups?.map((g) => g.id) ?? [];
      let studentCount = 0;

      if (groupIds.length > 0) {
        const { count } = await supabase
          .from("group_members")
          .select("id", { count: "exact", head: true })
          .in("group_id", groupIds)
          .eq("status", "approved");
        studentCount = count ?? 0;
      }

      return {
        ...cls,
        subjects: (cls.class_subjects ?? []).map(
          (cs: { subject: Enums<"subject"> }) => cs.subject,
        ),
        groupCount: groupIds.length,
        studentCount,
      };
    }),
  );

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div
        className="animate-fade-up"
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: "clamp(24px, 4vw, 40px)",
        }}
      >
        <div>
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
            Classes
          </p>
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
            My Classes
          </h1>
        </div>
        <Link href="/classes/new" className="btn-primary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          New class
        </Link>
      </div>

      {/* ── Classes grid ── */}
      {classesWithStats.length === 0 ? (
        <div
          className="animate-fade-up delay-100"
          style={{
            textAlign: "center",
            padding: "clamp(48px, 8vw, 80px) 24px",
            background: "white",
            borderRadius: "var(--radius-card)",
            border: "1.5px solid rgba(30,58,47,0.08)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(30,58,47,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "var(--forest)",
              opacity: 0.4,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M3 8l11-5 11 5-11 5-11-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M3 14l11 5 11-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 20l11 5 11-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.2rem",
              color: "var(--forest)",
              margin: "0 0 8px",
            }}
          >
            No classes yet
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.88rem",
              color: "var(--forest)",
              opacity: 0.5,
              margin: "0 0 24px",
              maxWidth: 340,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Create your first class to start organizing your teaching.
          </p>
          <Link href="/classes/new" className="btn-primary" style={{ fontSize: "0.88rem", padding: "11px 22px" }}>
            Create your first class
          </Link>
        </div>
      ) : (
        <div
          className="animate-fade-up delay-100"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {classesWithStats.map((cls) => (
            <ClassCard
              key={cls.id}
              id={cls.id}
              name={cls.name}
              grade={cls.grade}
              academicYear={cls.academic_year}
              subjects={cls.subjects}
              groupCount={cls.groupCount}
              studentCount={cls.studentCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
