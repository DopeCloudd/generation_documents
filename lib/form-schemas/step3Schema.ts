import { z } from "zod";

export const step3Schema = z.object({
  // Infos sur l'entreprise
  companyName: z.string(),
  companyAddress: z.string(),
  companyPostalCode: z.string(),
  companyCity: z.string(),

  companyLegalForm: z.string(),
  companyCapital: z.string(),
  companyActivity: z.string(),
  companyPurpose: z.string(),

  // Infos sur le dirigeant
  email: z.string().email(),
  phoneNumber: z.string(),

  civility: z.string(),
  nationality: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  birthDate: z.string(),
  birthPlace: z.string(),

  // BC
  // Indicateur 1
  formationDuration: z.string(), // en heures
  formationPrice: z.string(), // en euros

  // Date et lieu de signature
  signatureDate: z.string(),
  signaturePlace: z.string(),
});

export type Step3FormData = z.infer<typeof step3Schema>;
