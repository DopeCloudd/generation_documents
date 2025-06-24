import { Step2Content } from "@/components/contents/step2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step2Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Étape 2 : NDA - Numéro de Déclaration d&apos;Activité
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guide pratique pour l&apos;obtention du NDA</CardTitle>
          <CardDescription>
            ⚠️ Cette étape est a réaliser hors de la plateforme. Ce guide est
            présent pour vous guider dans l&apos;obtention de votre Numéro de
            Déclaration d&apos;Activité (NDA).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Step2Content />
        </CardContent>
      </Card>
    </div>
  );
}
