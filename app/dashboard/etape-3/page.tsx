import { FormStep3 } from "@/components/forms/form-step3";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step3Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Étape 3 : Qualiopi
        </h1>
        <p className="text-muted-foreground">
          Remplissez les informations pour les documents administratifs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulaire des documents administratifs</CardTitle>
          <CardDescription>
            Ces informations seront utilisées pour générer les documents
            administratifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormStep3 />
        </CardContent>
      </Card>
    </div>
  );
}
