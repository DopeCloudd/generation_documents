import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://37.59.115.240/"
    : "http://localhost:3000/";

export const authClient = createAuthClient({
  baseURL,
  plugins: [adminClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
