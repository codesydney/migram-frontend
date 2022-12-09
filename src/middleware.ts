export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
    "/tasks/createtask.tsx",
    "/offers",
  ],
};
