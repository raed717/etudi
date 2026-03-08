// NavbarServer — Server Component
// Fetches the current session + profile, then passes the data down to
// the client-side Navbar component.  No auth state lives in the client.

import { createClient } from "@/lib/supabase/server";
import { Navbar } from "./navbar";
import type { NavbarUserData } from "./user-avatar";

export async function NavbarServer() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let navUser: NavbarUserData | null = null;

  if (user) {
    // Fetch the profile row for display name / avatar / role
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, role")
      .eq("id", user.id)
      .single();

    navUser = {
      fullName: profile?.full_name ?? user.email ?? "Teacher",
      email: user.email ?? "",
      avatarUrl: profile?.avatar_url ?? null,
      role: profile?.role ?? "teacher",
    };
  }

  return <Navbar user={navUser} />;
}
