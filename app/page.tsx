import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/login");
    } else {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la session :", error);
    redirect("/login");
  }
}
