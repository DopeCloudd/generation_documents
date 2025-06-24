"use client";

import { generateStep1 } from "@/lib/pdf/pdf-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Step1FormData, step1Schema } from "@/lib/form-schemas/step1Schema";

export function FormStep4() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      // Infos sur l'entreprise
      companyName: "",
      companyLegalForm: "",
      companyCapital: "",
      companyAddress: "",
      companyPostalCode: "",
      companyCity: "",
      companyActivity: "",
      companyPurpose: "",

      // Infos sur le dirigeant
      civility: "Mr",
      nationality: "",
      firstName: "",
      lastName: "",
      address: "",
      birthDate: "",
      birthPlace: "",

      // Liste des souscripteurs
      shareCount: "",
      subscriptionAmount: "",
      releasedAmount: "",
      priceByShare: "",
      certifiedBy: "",

      // Déclaration non condamnation
      fatherName: "",
      fatherFirstName: "",
      motherName: "",
      motherFirstName: "",

      // Projet de statuts
      rcsName: "",

      // Bilan prévisionnel
      exerciceDebut: "",
      exerciceFin: "",
      purchaseGoodsYear1: "",
      purchaseGoodsYear2: "",
      subcontractingYear1: "",
      subcontractingYear2: "",
      rentYear1: "",
      rentYear2: "",
      insuranceYear1: "",
      insuranceYear2: "",
      salaryYear1: "",
      salaryYear2: "",
      socialChargesYear1: "",
      socialChargesYear2: "",
      amortizationYear1: "",
      amortizationYear2: "",
      agiosYear1: "",
      agiosYear2: "",
      resultsBeforeTaxYear1: "",
      resultsBeforeTaxYear2: "",
      profitTaxYear1: "",
      profitTaxYear2: "",
      serviceRevenueYear1: "",
      serviceRevenueYear2: "",

      // Date et lieu de signature
      signatureDate: "",
      signaturePlace: "",
    },
  });

  async function onSubmit(values: Step1FormData) {
    setIsGenerating(true);
    try {
      await generateStep1(values);
    } catch (error) {
      console.error("Erreur PDF :", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* SECTION 1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Informations générales</h2>
          <h3 className="text-lg font-semibold pt-4">
            A. Informations sur le dirigeant
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              name="civility"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Civilité</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mme">Mme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="LEROUX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénoms</FormLabel>
                  <FormControl>
                    <Input placeholder="Valentin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="nationality"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationalité</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Adresse actuelle (Numéro + rue, CP + Ville)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="14/02/1990" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthPlace"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                    <Input placeholder="Nancy (54000)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold pt-4">
            B. Informations sur l&apos;entreprise
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="companyName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la société</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyLegalForm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forme juridique</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SARL">SARL</SelectItem>
                      <SelectItem value="SAS">SAS</SelectItem>
                      <SelectItem value="SASU">SASU</SelectItem>
                      <SelectItem value="EURL">EURL</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="SCI">SCI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyCapital"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capital social (€)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyActivity"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Activité de l’entreprise</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyAddress"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du siège</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyPostalCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="companyCity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            2. Declaration de non condamnation et de filiation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="fatherName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du pére :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fatherFirstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom du pére :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="motherName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la mére :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="motherFirstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom de la mére :</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            3. Liste des souscripteurs d’actions SASU
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="shareCount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d’actions</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="priceByShare"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix d&apos;une action</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subscriptionAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant des souscriptions (€)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="releasedAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant libéré (€)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="certifiedBy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certifié par</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">4. Projet de statuts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="rcsName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du RCS :</FormLabel>
                  <FormControl>
                    <Input placeholder="PARIS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénoms</FormLabel>
                  <FormControl>
                    <Input placeholder="Valentin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">5. Bilan prévisionnel</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="exerciceDebut"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de debut d&apos;exercice</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="exerciceFin"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de fin d&apos;exercice</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">
            A. Charges d&apos;exploitation
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="purchaseGoodsYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achat de marchandises - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="purchaseGoodsYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achat de marchandises - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subcontractingYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sous-traitance - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subcontractingYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sous-traitance - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">B. Charges externes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="rentYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Loyers, charges locatives et crédit-bail - A1
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="rentYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Loyers, charges locatives et crédit-bail - A2
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="insuranceYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assurance, entretien - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="insuranceYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assurance, entretien - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">C. Frais de personnel</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="salaryYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salaires et charges sociales - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="salaryYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salaires et charges sociales - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="socialChargesYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charges sociales du dirigeant - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="socialChargesYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charges sociales du dirigeant - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amortizationYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dotations aux amortissements - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amortizationYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dotations aux amortissements - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">D. Charges financières</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="agiosYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agios et intérêts payés - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="agiosYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agios et intérêts payés - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">
            E. Compte de résultat simplifié prévisionnel
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="resultsBeforeTaxYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résultat avant impôt - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="resultsBeforeTaxYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résultat avant impôt - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="profitTaxYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impôt sur les bénéfices - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="profitTaxYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Impôt sur les bénéfices - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h3 className="text-lg font-semibold">
            F. Produits d&apos;exploitation (chiffre d&apos;affaires)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              name="serviceRevenueYear1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prestation de service - A1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="serviceRevenueYear2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prestation de service - A2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SECTION 6 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">6. Date et signature</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                name="signatureDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fait à</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="signaturePlace"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Le</FormLabel>
                    <FormControl>
                      <Input placeholder="13/06/2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            💡 Le résultat prévisionnel sera calculé automatiquement à partir
            des produits et charges.
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              const fields = form.getValues();
              const testValues: Record<string, string> = {};

              for (const key of Object.keys(fields)) {
                testValues[key] = "test";
              }

              form.reset(testValues); // met à jour les valeurs
              await form.handleSubmit(onSubmit)(); // déclenche le submit
            }}
          >
            Tester le formulaire
          </Button>

          <Button type="button" variant="outline">
            Prévisualiser
          </Button>
          <Button type="submit" disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Génération en cours..." : "Générer le PDF"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
