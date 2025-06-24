import { FormStep4 } from "@/components/forms/form-step4";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step4Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Étape 4 : Réfèrencement EDOF
        </h1>
        <p className="text-muted-foreground">
          Finalisez la création de votre entreprise et générez tous les
          documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Finalisation et génération des documents</CardTitle>
          <CardDescription>
            Vérifiez les informations et générez tous les documents nécessaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormStep4 />
        </CardContent>
      </Card>
    </div>
  );
}
