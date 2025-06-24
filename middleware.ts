import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ["/login", "/", "/api/auth", "/unauthorized"];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    // Vérifier la session via les cookies
    const sessionCookie = request.cookies.get("auth-session");
    const userCookie = request.cookies.get("auth-user");

    // Si pas de session et sur une route protégée, rediriger vers login
    if (
      (!sessionCookie || !userCookie) &&
      (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Vérifier les permissions admin
    if (pathname.startsWith("/admin") && userCookie) {
      try {
        const user = JSON.parse(userCookie.value);
        if (user.role !== "ADMIN") {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du rôle utilisateur :",
          error
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Si connecté et sur la page de login, rediriger vers dashboard
    if (sessionCookie && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erreur dans le middleware d'authentification :", error);
    // En cas d'erreur, rediriger vers login pour les routes protégées
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
