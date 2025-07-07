"use client";

import { useState } from "react";

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
import { Step3FormData, step3Schema } from "@/lib/form-schemas/step3Schema";
import { generateStep3 } from "@/lib/pdf/pdf-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

// Composant pour gérer un tableau de strings
function StringArrayInput({
  label,
  value,
  onChange,
  placeholder = "Ajouter un élément",
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const addItem = () => {
    onChange([...value, ""]);
  };

  const removeItem = (index: number) => {
    if (value.length > 1) {
      onChange(value.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, newValue: string) => {
    const newArray = [...value];
    newArray[index] = newValue;
    onChange(newArray);
  };

  return (
    <div className="space-y-2">
      <h4 className="text-md font-semibold">{label}</h4>
      {value.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeItem(index)}
            disabled={value.length === 1}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="w-4 h-4 mr-2" />
        Ajouter
      </Button>
    </div>
  );
}

export function FormStep3() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formType, setFormType] = useState<"AF" | "BC" | "VAE">("BC");
  // States pour les tableaux
  const [pedagogicalObjectives, setPedagogicalObjectives] = useState<string[]>([
    "",
  ]);
  const [pedagogicalMethods, setPedagogicalMethods] = useState<string[]>([""]);
  const [formationProgram, setFormationProgram] = useState<string[]>([""]);
  const [evaluationMethods, setEvaluationMethods] = useState<string[]>([""]);

  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      // Infos sur l'entreprise
      companyName: "",
      companyAddress: "",
      companyPostalCode: "",
      companyCity: "",
      companyLegalForm: "",
      companyCapital: "",
      companyActivity: "",
      companyPurpose: "",

      // Infos sur le dirigeant
      email: "",
      phoneNumber: "",
      civility: "",
      nationality: "",
      firstName: "",
      lastName: "",
      address: "",
      birthDate: "",
      birthPlace: "",

      // BC
      // Indicateur 1
      formationDuration: "", // en heures
      formationPrice: "", // en euros
      // Objectifs pédagogiques
      pedagogicalObjectives: "",
      // Méthodes pédagogiques mobilisées
      pedagogicalMethods: "",
      // Programme de la formation
      formationProgram: "",
      // Modalités d'évaluation
      evaluationMethods: "",

      // Date et lieu de signature
      signatureDate: "",
      signaturePlace: "",
    },
  });

  async function onSubmit(values: Step3FormData) {
    setIsGenerating(true);
    try {
      // Combiner les données du formulaire avec les tableaux
      const finalData = {
        ...values,
        // Convertir les tableaux en données finales
        pedagogicalObjectivesArray: pedagogicalObjectives.filter(
          (item) => item.trim() !== ""
        ),
        pedagogicalMethodsArray: pedagogicalMethods.filter(
          (item) => item.trim() !== ""
        ),
        formationProgramArray: formationProgram.filter(
          (item) => item.trim() !== ""
        ),
        evaluationMethodsArray: evaluationMethods.filter(
          (item) => item.trim() !== ""
        ),
      };
      await generateStep3(finalData);
      toast.success("ZIP généré avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la génération du ZIP. Veuillez réessayer.");
      console.error("Erreur PDF :", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Sélecteur de type */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>Type de formulaire</FormLabel>
              <Select
                onValueChange={(value) =>
                  setFormType(value as "AF" | "BC" | "VAE")
                }
                defaultValue={formType}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AF">AF</SelectItem>
                  <SelectItem value="BC">BC</SelectItem>
                  <SelectItem value="VAE">VAE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </div>
        </div>

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
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SECTION 2 */}
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
            <FormField
              name="companyPurpose"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Objet social</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Affichage conditionnel du formulaire */}
        {formType === "AF" && (
          <>
            {/* Ton formulaire pour AF ici */}
            <FormAF form={form} />
          </>
        )}

        {formType === "BC" && (
          <>
            {/* Ton formulaire pour BC ici */}
            <FormBC
              form={form}
              pedagogicalObjectives={pedagogicalObjectives}
              setPedagogicalObjectives={setPedagogicalObjectives}
              pedagogicalMethods={pedagogicalMethods}
              setPedagogicalMethods={setPedagogicalMethods}
              formationProgram={formationProgram}
              setFormationProgram={setFormationProgram}
              evaluationMethods={evaluationMethods}
              setEvaluationMethods={setEvaluationMethods}
            />
          </>
        )}

        {formType === "VAE" && (
          <>
            {/* Ton formulaire pour VAE ici */}
            <FormVAE form={form} />
          </>
        )}

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

          <Button type="submit" disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Génération en cours..." : "Générer le PDF"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function FormAF({ form }: { form: UseFormReturn<Step3FormData> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold pt-4">
        Formulaire spécifique pour l&apos;Action de Formation (AF)
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          name="formationDuration"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée de la formation (en heures)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function FormBC({
  form,
  pedagogicalObjectives,
  setPedagogicalObjectives,
  pedagogicalMethods,
  setPedagogicalMethods,
  formationProgram,
  setFormationProgram,
  evaluationMethods,
  setEvaluationMethods,
}: {
  form: ReturnType<typeof useForm<Step3FormData>>;
  pedagogicalObjectives: string[];
  setPedagogicalObjectives: (value: string[]) => void;
  pedagogicalMethods: string[];
  setPedagogicalMethods: (value: string[]) => void;
  formationProgram: string[];
  setFormationProgram: (value: string[]) => void;
  evaluationMethods: string[];
  setEvaluationMethods: (value: string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold pt-4">
        Formulaire spécifique pour le Bilan de Compétences
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          name="formationDuration"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée de la formation (en heures)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="formationPrice"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix de la formation (€)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <StringArrayInput
        label="Objectifs pédagogiques"
        value={pedagogicalObjectives}
        onChange={setPedagogicalObjectives}
        placeholder="Objectifs"
      />

      <StringArrayInput
        label="Méthodes pédagogiques mobilisées"
        value={pedagogicalMethods}
        onChange={setPedagogicalMethods}
        placeholder="Méthode"
      />

      <StringArrayInput
        label="Programme de la formation"
        value={formationProgram}
        onChange={setFormationProgram}
        placeholder="Élément du programme"
      />

      <StringArrayInput
        label="Modalités d'évaluation"
        value={evaluationMethods}
        onChange={setEvaluationMethods}
        placeholder="Modalité d'évaluation"
      />
    </div>
  );
}

function FormVAE({ form }: { form: UseFormReturn<Step3FormData> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold pt-4">
        Formulaire spécifique pour la Validation des Acquis de l&apos;Expérience
        (VAE)
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          name="formationDuration"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durée de la formation (en heures)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
