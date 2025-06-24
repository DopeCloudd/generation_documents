"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { generatePDF } from "@/lib/pdf/pdf-generator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  registrationCity: z.string().min(2, {
    message: "La ville d'immatriculation doit contenir au moins 2 caractères",
  }),
  registrationDate: z.date({
    required_error: "Veuillez sélectionner une date d'immatriculation",
  }),
  bankName: z.string().min(2, {
    message: "Le nom de la banque doit contenir au moins 2 caractères",
  }),
  bankAddress: z.string().min(5, {
    message: "L'adresse de la banque doit contenir au moins 5 caractères",
  }),
  accountNumber: z.string().min(5, {
    message: "Le numéro de compte doit contenir au moins 5 caractères",
  }),
  hasIntellectualProperty: z.boolean().default(false),
  intellectualPropertyType: z
    .enum(["trademark", "patent", "copyright", "none"])
    .optional(),
  intellectualPropertyDescription: z.string().optional(),
  hasEmployees: z.boolean().default(false),
  employeeCount: z.string().optional(),
});

export function FormStep3() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [step1Data, setStep1Data] = useState<any>(null);
  const [step2Data, setStep2Data] = useState<any>(null);

  // Récupérer les données des étapes précédentes depuis sessionStorage
  useEffect(() => {
    const storedData1 = sessionStorage.getItem("formDataStep1");
    const storedData2 = sessionStorage.getItem("formDataStep2");

    if (storedData1) {
      setStep1Data(JSON.parse(storedData1));
    }

    if (storedData2) {
      setStep2Data(JSON.parse(storedData2));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationCity: "",
      registrationDate: new Date(),
      bankName: "",
      bankAddress: "",
      accountNumber: "",
      hasIntellectualProperty: false,
      intellectualPropertyType: "none",
      intellectualPropertyDescription: "",
      hasEmployees: false,
      employeeCount: "0",
    },
  });

  // Observer les changements
  const hasIntellectualProperty = form.watch("hasIntellectualProperty");
  const hasEmployees = form.watch("hasEmployees");
  const intellectualPropertyType = form.watch("intellectualPropertyType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);

    try {
      // Combiner les données des étapes 1, 2 et 3
      const combinedData = {
        ...step1Data,
        ...step2Data,
        ...values,
        registrationDate: format(values.registrationDate, "dd/MM/yyyy"),
      };

      // Générer le PDF avec les données du formulaire
      await generatePDF("etape3", combinedData);

      // Stocker les données dans sessionStorage pour les réutiliser dans les étapes suivantes
      sessionStorage.setItem(
        "formDataStep3",
        JSON.stringify({
          ...values,
          registrationDate: format(values.registrationDate, "dd/MM/yyyy"),
        })
      );

      // Rediriger vers l'étape suivante
      router.push("/dashboard/etape-4");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="registrationCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville d'immatriculation</FormLabel>
                <FormControl>
                  <Input placeholder="Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date d'immatriculation</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd MMMM yyyy", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la banque</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la banque" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse de la banque</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adresse complète de la banque"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de compte</FormLabel>
                <FormControl>
                  <Input
                    placeholder="FR76 1234 5678 9012 3456 7890 123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hasIntellectualProperty"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  L'entreprise possède des droits de propriété intellectuelle
                </FormLabel>
                <FormDescription>
                  Cochez cette case si l'entreprise possède des marques, brevets
                  ou droits d'auteur
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {hasIntellectualProperty && (
          <>
            <FormField
              control={form.control}
              name="intellectualPropertyType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type de propriété intellectuelle</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="trademark" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Marque déposée
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="patent" />
                        </FormControl>
                        <FormLabel className="font-normal">Brevet</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="copyright" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Droit d'auteur
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {intellectualPropertyType &&
              intellectualPropertyType !== "none" && (
                <FormField
                  control={form.control}
                  name="intellectualPropertyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description de la propriété intellectuelle
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description détaillée de la propriété intellectuelle"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
          </>
        )}

        <FormField
          control={form.control}
          name="hasEmployees"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>L'entreprise a des employés</FormLabel>
                <FormDescription>
                  Cochez cette case si l'entreprise a déjà des employés
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {hasEmployees && (
          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre d'employés</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/etape-2")}
          >
            Retour
          </Button>

          <div className="flex space-x-4">
            <Button type="button" variant="outline">
              Prévisualiser
            </Button>
            <Button type="submit" disabled={isGenerating}>
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isGenerating ? "Génération en cours..." : "Générer et continuer"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
