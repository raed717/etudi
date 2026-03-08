import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Supabase middleware — refreshes the session cookie on every request.
 * Routes students and teachers to their respective dashboards.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session — do NOT remove this call
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/forgot-password");

  const isTeacherArea =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/classes") ||
    pathname.startsWith("/profile");

  const isStudentArea = pathname.startsWith("/student-dashboard");

  const role = (user?.user_metadata?.role as string) ?? null;

  // ── Unauthenticated users ──
  if (!user) {
    // Protect all dashboard routes
    if (isTeacherArea || isStudentArea) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // ── Authenticated users ──

  // Redirect away from auth pages → correct dashboard
  if (isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = role === "student" ? "/student-dashboard" : "/dashboard";
    return NextResponse.redirect(url);
  }

  // Prevent students from accessing teacher areas
  if (role === "student" && isTeacherArea) {
    const url = request.nextUrl.clone();
    url.pathname = "/student-dashboard";
    return NextResponse.redirect(url);
  }

  // Prevent teachers from accessing student areas
  if (role !== "student" && isStudentArea) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
