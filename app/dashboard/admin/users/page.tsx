import { UserManagement } from "@/components/admin/user-management";
import { getUser } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gestion des utilisateurs
        </h1>
        <p className="text-muted-foreground">
          Créez, modifiez et supprimez des comptes utilisateurs
        </p>
      </div>

      <UserManagement />
    </div>
  );
}
