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
            <p>
              Liste des documents annexes à récupérer sur d&apos;autres sites :
            </p>
            <ul className="list-disc pl-6">
              <li>
                Attestation de vigilance Urssaf de votre organisme de formation
              </li>
              <li>Business plan</li>
              <li>
                Copie de la lettre d&apos;accueil adressée (qui accompagne le
                memento fiscal) par le Service des impôts des entreprises (SIE)
                au moment de la création de l&apos;établissement
              </li>
              <li>
                Quelques copies des contrats de sous-traitance (regroupées dans
                un fichier)
              </li>
              <li>
                Quelques CV et copies de diplômes des formateurs (regroupés dans
                un fichier)
              </li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormStep4 />
        </CardContent>
      </Card>
    </div>
  );
}
