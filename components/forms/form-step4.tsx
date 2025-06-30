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

export function FormStep4() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
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
    setIsGenerating(true);
    try {
      await generateStep4(values);
    } catch (error) {
      console.error("Erreur PDF :", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
          <Button type="submit" disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Génération en cours..." : "Générer le PDF"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
