// StudentSidebarServer — Server Component
// Fetches student identity + group counts, then passes to StudentSidebar client.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudentSidebar } from "./student-sidebar";

export async function StudentSidebarServer() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
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

  return (
    <StudentSidebar
      fullName={profile?.full_name ?? user.email ?? "Student"}
      email={user.email ?? ""}
      avatarUrl={profile?.avatar_url ?? null}
      groupCount={groupCount ?? 0}
      pendingCount={pendingCount ?? 0}
    />
  );
}
