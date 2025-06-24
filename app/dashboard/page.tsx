import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  ClipboardList,
  FileSignature,
  FileText,
} from "lucide-react";
import Link from "next/link";
import type React from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans l&apos;application de génération de documents pour la
          création d&apos;entreprise.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StepCard
          title="Étape 1"
          description="SASU"
          icon={<FileText className="h-6 w-6" />}
          href="/dashboard/etape-1"
        />
        <StepCard
          title="Étape 2"
          description="NDA"
          icon={<ClipboardList className="h-6 w-6" />}
          href="/dashboard/etape-2"
        />
        <StepCard
          title="Étape 3"
          description="Qualiopi"
          icon={<FileSignature className="h-6 w-6" />}
          href="/dashboard/etape-3"
        />
        <StepCard
          title="Étape 4"
          description="Réfèrencement EDOF"
          icon={<Building2 className="h-6 w-6" />}
          href="/dashboard/etape-4"
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Guide d&apos;utilisation</CardTitle>
            <CardDescription>
              Comment utiliser l&apos;application de génération de documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Cette application vous permet de générer tous les documents
              nécessaires à la création d&apos;une entreprise en suivant un
              processus en 4 étapes. Chaque étape correspond à un ensemble de
              documents spécifiques.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Remplissez les formulaires à chaque étape avec les informations
                requises
              </li>
              <li>Prévisualisez les documents générés</li>
              <li>Téléchargez les documents au format PDF</li>
              <li>Passez à l&apos;étape suivante</li>
            </ol>
            <p>
              Commencez par la première étape en cliquant sur le bouton
              ci-dessous.
            </p>
            <Button asChild>
              <Link href="/dashboard/etape-1">Commencer l&apos;étape 1</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StepCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Card className="flex justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{description}</div>
        <p className="text-xs text-muted-foreground mt-2">
          Remplir les informations pour cette étape
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full mt-4" variant="outline">
          <Link href={href}>Accéder</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
