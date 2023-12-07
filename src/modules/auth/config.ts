import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ['/chat'];
      const anonymousRoutes = ['/login', '/register'];

      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl?.pathname.startsWith(route)
      );

      const isAnonymousRoute = anonymousRoutes.some((route) =>
        nextUrl?.pathname.startsWith(route)
      );

      if (isAnonymousRoute && isLoggedIn) {
        return NextResponse.redirect(`${process.env.APP_HOST}/`);
      }

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
  },
};
