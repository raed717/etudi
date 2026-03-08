import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { EditClassForm } from "@/components/dashboard/edit-class-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Class",
};

type Props = { params: Promise<{ classId: string }> };

export default async function EditClassPage({ params }: Props) {
  const { classId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: cls } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .eq("teacher_id", user.id)
    .single();

  if (!cls) notFound();

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
        <Link
          href={`/classes/${classId}`}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--forest)",
            opacity: 0.5,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 12,
            transition: "opacity 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to class
        </Link>
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
          Edit class
        </h1>
      </div>

      <div className="animate-fade-up delay-100">
        <EditClassForm
          classId={cls.id}
          currentName={cls.name}
          currentGrade={cls.grade}
          currentYear={cls.academic_year}
        />
      </div>
    </div>
  );
}
