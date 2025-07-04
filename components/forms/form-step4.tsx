"use client";

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
import { Step4FormData, step4Schema } from "@/lib/form-schemas/step4Schema";
import { generateStep4 } from "@/lib/pdf/pdf-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export function FormStep4() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      companyName: "",
      companySiret: "",
      companyDeclarationNumber: "",
      companyAddress: "",
      managerEmail: "",
      managerPhone: "",
      companyWebsite: "",

      price: "",
      period: "",
      sessionsCount: "",
      sessionMinDuration: "",
      sessionMaxDuration: "",
      totalDuration: "",
      déroulement: "",
      organization: "",
      maxBeneficiaries: 1,

      pedagogicalDescription: "",
      evaluationDescription: "",
      justificationDescription: "",
      evaluationModalities: "",
      motivationsDescription: "",

      trainers: [
        {
          civility: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          title: "",
          qualifications: [""],
          trainings: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "trainers",
  });

  async function onSubmit(values: Step4FormData) {
    console.log("Trigger submit");
    setIsGenerating(true);
    try {
      await generateStep4(values);
      toast.success(
        "Le ZIP a été généré avec succès. Téléchargement en cours ..."
      );
    } catch (error) {
      console.error("Erreur PDF :", error);
      toast.error("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error("Form errors:", errors);
        })}
        className="space-y-10"
      >
        {/* Generale */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Informations générales de l&apos;organisme
          </h2>
          <FormField
            name="companyName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;organisme</FormLabel>
                <FormControl>
                  <Input placeholder="Mon Organisme" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="companySiret"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIRET de l&apos;organisme</FormLabel>
                <FormControl>
                  <Input placeholder="12345678901234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="companyDeclarationNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de déclaration d&apos;activité</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
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
                <FormLabel>Adresse de l&apos;organisme</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="managerEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email du responsable</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="test@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="managerPhone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone du responsable</FormLabel>
                <FormControl>
                  <Input placeholder="0600000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="companyWebsite"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web de l&apos;organisme</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.monorganisme.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Texte d&apos;inscription EDOF
          </h2>
          <FormField
            name="companyName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l&apos;organisme</FormLabel>
                <FormControl>
                  <Input placeholder="Mon Organisme" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pedagogicalDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description des modalités de l&apos;accompagnement pédagogique
                  et technique
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="evaluationDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description des évaluations qui jalonnent ou concluent
                  l&apos;action de formation
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="justificationDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description des moyens mis en place pour justifier
                  l&apos;accompagnement pédagogique et technique des stagiaires
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="evaluationModalities"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description des modalités d&apos;évaluation utilisées pour
                  qualifier le besoin dans le cadre d&apos;un projet
                  professionnel
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="motivationsDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description des motivations et des intentions de
                  l&apos;organisme à être référencé sur l&apos;espace des
                  organismes de formation
                </FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 2 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Tarif et organisation du bilan de compétences
          </h2>
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix du bilan de compétences</FormLabel>
                <FormControl>
                  <Input placeholder="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="period"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Période maximale de réalisation</FormLabel>
                <FormControl>
                  <Input placeholder="2 mois" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sessionsCount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de séances de rendez-vous</FormLabel>
                <FormControl>
                  <Input placeholder="8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sessionMinDuration"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Durée minimale d&apos;une séance de rendez-vous
                </FormLabel>
                <FormControl>
                  <Input placeholder="1h" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sessionMaxDuration"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Durée maximale d&apos;une séance de rendez-vous
                </FormLabel>
                <FormControl>
                  <Input placeholder="2h" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="totalDuration"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durée totale du bilan de compétences</FormLabel>
                <FormControl>
                  <Input placeholder="24h" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="déroulement"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Déroulement du bilan de compétences</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="organization"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation du bilan de compétences</FormLabel>
                <FormControl>
                  <Textarea className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="maxBeneficiaries"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de bénéficiaires maximum</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Fichier des formateurs</h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded-lg space-y-4 relative"
            >
              <h2 className="text-xl font-semibold">Formateur {index + 1}</h2>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>

              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name={`trainers.${index}.civility`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Civilité</FormLabel>
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
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mme">Mme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`trainers.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`trainers.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name={`trainers.${index}.email`}
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
                  control={form.control}
                  name={`trainers.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`trainers.${index}.address`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`trainers.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre / Qualité</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`trainers.${index}.trainings`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formations dispensées</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormLabel>Qualifications</FormLabel>
              <div className="space-y-2">
                {form
                  .watch(`trainers.${index}.qualifications`)
                  .map((q, qIndex) => (
                    <div key={qIndex} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`trainers.${index}.qualifications.${qIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          form.setValue(
                            `trainers.${index}.qualifications`,
                            form
                              .watch(`trainers.${index}.qualifications`)
                              .filter((_, i) => i !== qIndex)
                          )
                        }
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    form.setValue(`trainers.${index}.qualifications`, [
                      ...form.watch(`trainers.${index}.qualifications`),
                      "",
                    ])
                  }
                >
                  Ajouter une qualification
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              civility: "Mr",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              address: "",
              title: "",
              qualifications: [""],
              trainings: "",
            })
          }
        >
          Ajouter un formateur
        </Button>

        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              form.reset({
                companyName: "Mon Organisme",
                companySiret: "12345678901234",
                companyDeclarationNumber: "1234567890",
                companyAddress: "123 Rue Exemple, 75000 Paris",
                managerEmail: "test@email.com",
                managerPhone: "0600000000",
                companyWebsite: "https://www.monorganisme.com",
                pedagogicalDescription: "Accompagnement pédagogique complet.",
                evaluationDescription: "Évaluations initiales et finales.",
                justificationDescription:
                  "Moyens mis en place pour justifier l'accompagnement.",
                evaluationModalities:
                  "Modalités d'évaluation du projet professionnel.",
                motivationsDescription: "Motivation forte pour être référencé.",
                price: "1580 € TTC",
                period: "2 mois",
                sessionsCount: "8",
                sessionMinDuration: "1h",
                sessionMaxDuration: "2h",
                totalDuration: "24h",
                déroulement: "En distanciel.",
                organization: "En visio.",
                maxBeneficiaries: 1,
                trainers: [
                  {
                    civility: "Mr",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    phone: "0600000000",
                    address: "123 Rue Exemple, 75000 Paris",
                    title: "Consultant",
                    qualifications: ["Master RH", "Coach certifié"],
                    trainings: "Bilan de compétences",
                  },
                ],
              });
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
