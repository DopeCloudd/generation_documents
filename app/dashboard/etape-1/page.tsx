import { FormStep1 } from "@/components/forms/form-step1";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Step1Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Étape 1 : SASU - Création de la société
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Formulaire pour la création de tous les documents pour la création
            de la société
          </CardTitle>
          <CardDescription>
            ⚠️ Merci de remplir tous les champs du formulaire pour générer les
            documents nécessaires à la création de votre SASU.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormStep1 />
        </CardContent>
      </Card>
    </div>
  );
}
