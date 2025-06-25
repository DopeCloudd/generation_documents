import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://37.59.115.240/",
  plugins: [adminClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
