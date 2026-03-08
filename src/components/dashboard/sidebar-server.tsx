// SidebarServer — Server Component
// Fetches the current user identity + pending student count,
// then passes data to the client-side Sidebar.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "./sidebar";

export async function SidebarServer() {
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

  // Count pending approvals across all teacher's groups
  const { count: pendingCount } = await supabase
    .from("group_members")
    .select("id, groups!inner(class_id, classes!inner(teacher_id))", {
      count: "exact",
      head: true,
    })
    .eq("status", "pending")
    .eq("groups.classes.teacher_id", user.id);

  return (
    <Sidebar
      fullName={profile?.full_name ?? user.email ?? "Teacher"}
      email={user.email ?? ""}
      avatarUrl={profile?.avatar_url ?? null}
      pendingCount={pendingCount ?? 0}
    />
  );
}
