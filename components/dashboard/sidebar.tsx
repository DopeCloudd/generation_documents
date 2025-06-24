"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  Building2,
  ClipboardList,
  FileSignature,
  FileText,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  {
    id: 1,
    name: "SASU",
    href: "/dashboard/etape-1",
    icon: FileText,
  },
  {
    id: 2,
    name: "NDA",
    href: "/dashboard/etape-2",
    icon: ClipboardList,
  },
  {
    id: 3,
    name: "Qualiopi",
    href: "/dashboard/etape-3",
    icon: FileSignature,
  },
  {
    id: 4,
    name: "Réfèrencement EDOF",
    href: "/dashboard/etape-4",
    icon: Building2,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="flex flex-col w-64 border-r bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Génération Documents</h1>
        <p className="text-sm text-muted-foreground">
          Création d&apos;entreprise
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Étapes</h2>
            <nav className="space-y-1">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Link key={step.id} href={step.href}>
                    <Button
                      variant={pathname === step.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        pathname === step.href
                          ? "bg-secondary"
                          : "hover:bg-secondary/50"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {step.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          {isAdmin && (
            <div className="space-y-1">
              <h2 className="text-sm font-semibold">Administration</h2>
              <nav className="space-y-1">
                <Link href="/dashboard/admin/users">
                  <Button
                    variant={
                      pathname === "/dashboard/admin/users"
                        ? "secondary"
                        : "ghost"
                    }
                    className={cn(
                      "w-full justify-start",
                      pathname === "/dashboard/admin/users"
                        ? "bg-secondary"
                        : "hover:bg-secondary/50"
                    )}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Gestion utilisateurs
                  </Button>
                </Link>
                <Link href="/dashboard/admin/settings">
                  <Button
                    variant={
                      pathname === "/dashboard/admin/settings"
                        ? "secondary"
                        : "ghost"
                    }
                    className={cn(
                      "w-full justify-start",
                      pathname === "/dashboard/admin/settings"
                        ? "bg-secondary"
                        : "hover:bg-secondary/50"
                    )}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Button>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
