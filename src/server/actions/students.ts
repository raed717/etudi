"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = {
  error: string | null;
  success?: boolean;
};

// ─── Helpers ─────────────────────────────────────────────────

async function getStudentId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

// ─── Join Group ──────────────────────────────────────────────

export async function joinGroup(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient();
  const studentId = await getStudentId();

  const rawCode = (formData.get("join_code") as string)?.trim().toUpperCase();

  if (!rawCode || rawCode.length !== 6) {
    return { error: "Please enter a valid 6-character join code." };
  }

  // Find the group by join code
  const { data: group, error: groupErr } = await supabase
    .from("groups")
    .select("id, name, class_id")
    .eq("join_code", rawCode)
    .single();

  if (groupErr || !group) {
    return { error: "No group found with that code. Check the code and try again." };
  }

  // Check if student is already a member (any status)
  const { data: existing } = await supabase
    .from("group_members")
    .select("id, status")
    .eq("group_id", group.id)
    .eq("student_id", studentId)
    .single();

  if (existing) {
    if (existing.status === "pending") {
      return { error: "You already requested to join this group. Wait for teacher approval." };
    }
    if (existing.status === "approved") {
      return { error: "You are already a member of this group." };
    }
    if (existing.status === "rejected") {
      // Allow re-requesting after rejection — update status back to pending
      const { error: updateErr } = await supabase
        .from("group_members")
        .update({ status: "pending", approved_at: null })
        .eq("id", existing.id);

      if (updateErr) return { error: updateErr.message };

      revalidatePath("/student-dashboard", "layout");
      return { error: null, success: true };
    }
  }

  // Insert new membership request
  const { error: insertErr } = await supabase
    .from("group_members")
    .insert({ group_id: group.id, student_id: studentId });

  if (insertErr) return { error: insertErr.message };

  revalidatePath("/student-dashboard", "layout");
  return { error: null, success: true };
}
