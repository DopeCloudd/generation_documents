"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generatePDF } from "@/lib/pdf/pdf-generator";
import { Check, Download, FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
  step1: any;
  step2: any;
  step3: any;
};

export function FormStep4() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    step1: null,
    step2: null,
    step3: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Récupérer les données des étapes précédentes depuis sessionStorage
  useEffect(() => {
    const storedData1 = sessionStorage.getItem("formDataStep1");
    const storedData2 = sessionStorage.getItem("formDataStep2");
    const storedData3 = sessionStorage.getItem("formDataStep3");

    setFormData({
      step1: storedData1 ? JSON.parse(storedData1) : null,
      step2: storedData2 ? JSON.parse(storedData2) : null,
      step3: storedData3 ? JSON.parse(storedData3) : null,
    });
  }, []);

  // Liste des documents à générer
  const documents = [
    { id: "statuts", name: "Statuts de la société", step: "step1" },
    {
      id: "pv-constitution",
      name: "Procès-verbal de constitution",
      step: "step2",
    },
    {
      id: "attestation-depot",
      name: "Attestation de dépôt des fonds",
      step: "step3",
    },
    {
      id: "declaration-beneficiaires",
      name: "Déclaration des bénéficiaires effectifs",
      step: "step1",
    },
    { id: "formulaire-m0", name: "Formulaire M0", step: "step1" },
    { id: "annonce-legale", name: "Annonce légale", step: "step1" },
  ];

  // Générer un document spécifique
  const generateDocument = async (documentId: string) => {
    // Combiner toutes les données
    const combinedData = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
    };

    try {
      await generatePDF(documentId, combinedData);

      // Ajouter le document à la liste des documents générés
      if (!generatedDocuments.includes(documentId)) {
        setGeneratedDocuments([...generatedDocuments, documentId]);
      }

      return true;
    } catch (error) {
      console.error(
        `Erreur lors de la génération du document ${documentId}:`,
        error
      );
      return false;
    }
  };

  // Générer tous les documents
  const generateAllDocuments = async () => {
    setIsGenerating(true);

    try {
      // Générer chaque document séquentiellement
      for (const doc of documents) {
        await generateDocument(doc.id);
      }

      setIsComplete(true);
    } catch (error) {
      console.error("Erreur lors de la génération des documents:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Vérifier si toutes les données sont disponibles
  const isDataComplete = formData.step1 && formData.step2 && formData.step3;

  return (
    <div className="space-y-6">
      {!isDataComplete && (
        <Alert variant="destructive">
          <AlertTitle>Données manquantes</AlertTitle>
          <AlertDescription>
            Certaines étapes n'ont pas été complétées. Veuillez remplir toutes
            les étapes précédentes.
          </AlertDescription>
        </Alert>
      )}

      {isComplete && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Génération terminée</AlertTitle>
          <AlertDescription>
            Tous les documents ont été générés avec succès. Vous pouvez les
            télécharger individuellement ci-dessous.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Résumé</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="next-steps">Prochaines étapes</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {formData.step1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Informations générales</CardTitle>
                  <CardDescription>Étape 1</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Nom de l'entreprise:</dt>
                      <dd>{formData.step1.companyName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Forme juridique:</dt>
                      <dd>{formData.step1.legalForm}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Capital:</dt>
                      <dd>{formData.step1.capital} €</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Adresse:</dt>
                      <dd>
                        {formData.step1.address}, {formData.step1.postalCode}{" "}
                        {formData.step1.city}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            )}

            {formData.step2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Statuts juridiques</CardTitle>
                  <CardDescription>Étape 2</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Président:</dt>
                      <dd>{formData.step2.presidentName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Durée:</dt>
                      <dd>{formData.step2.duration} ans</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Année fiscale:</dt>
                      <dd>{formData.step2.fiscalYear}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Associés multiples:</dt>
                      <dd>
                        {formData.step2.hasMultipleAssociates ? "Oui" : "Non"}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            )}

            {formData.step3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents administratifs</CardTitle>
                  <CardDescription>Étape 3</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Ville d'immatriculation:</dt>
                      <dd>{formData.step3.registrationCity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Date d'immatriculation:</dt>
                      <dd>{formData.step3.registrationDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Banque:</dt>
                      <dd>{formData.step3.bankName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Employés:</dt>
                      <dd>{formData.step3.hasEmployees ? "Oui" : "Non"}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/etape-3")}
            >
              Retour
            </Button>
            <Button
              onClick={generateAllDocuments}
              disabled={isGenerating || !isDataComplete}
            >
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isGenerating
                ? "Génération en cours..."
                : isComplete
                ? "Régénérer tous les documents"
                : "Générer tous les documents"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    {doc.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      {generatedDocuments.includes(doc.id) ? (
                        <span className="text-green-600 flex items-center">
                          <Check className="mr-1 h-4 w-4" />
                          Généré
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Non généré
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateDocument(doc.id)}
                      disabled={!formData[doc.step as keyof FormData]}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="next-steps">
          <Card>
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
              <CardDescription>
                Voici les prochaines étapes pour finaliser la création de votre
                entreprise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-4">
                <li className="pl-2">
                  <p className="font-medium inline">
                    Déposer les statuts signés
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Déposez les statuts signés auprès du greffe du tribunal de
                    commerce de{" "}
                    {formData.step3?.registrationCity || "votre ville"}.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-medium inline">Publier l'annonce légale</p>
                  <p className="text-muted-foreground mt-1">
                    Publiez l'annonce légale dans un journal d'annonces légales.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-medium inline">
                    Déposer le dossier complet au CFE
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Déposez le dossier complet au Centre de Formalités des
                    Entreprises (CFE) compétent.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-medium inline">Obtenir le K-bis</p>
                  <p className="text-muted-foreground mt-1">
                    Après traitement de votre dossier, vous recevrez le K-bis,
                    document officiel attestant de l'existence juridique de
                    votre entreprise.
                  </p>
                </li>
                <li className="pl-2">
                  <p className="font-medium inline">
                    Ouvrir un compte bancaire professionnel
                  </p>
                  <p className="text-muted-foreground mt-1">
                    Ouvrez un compte bancaire professionnel au nom de votre
                    entreprise.
                  </p>
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
