import { z } from "zod";

export const step1Schema = z.object({
  // Infos sur l'entreprise
  companyName: z.string(),
  companyLegalForm: z.string(),
  companyCapital: z.string(),
  companyAddress: z.string(),
  companyPostalCode: z.string(),
  companyCity: z.string(),
  companyActivity: z.string(),
  companyPurpose: z.string(),

  // Infos sur le dirigeant
  civility: z.string(),
  nationality: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  birthDate: z.string(),
  birthPlace: z.string(),

  // Liste des souscripteurs
  shareCount: z.string(),
  subscriptionAmount: z.string(),
  releasedAmount: z.string(),
  priceByShare: z.string(),
  certifiedBy: z.string(),

  // Déclaration non condamnation
  fatherName: z.string(),
  fatherFirstName: z.string(),
  motherName: z.string(),
  motherFirstName: z.string(),

  // Projet de statuts
  rcsName: z.string(),

  // Bilan prévisionnel
  exerciceDebut: z.string(),
  exerciceFin: z.string(),
  purchaseGoodsYear1: z.string(),
  purchaseGoodsYear2: z.string(),
  subcontractingYear1: z.string(),
  subcontractingYear2: z.string(),
  rentYear1: z.string(),
  rentYear2: z.string(),
  insuranceYear1: z.string(),
  insuranceYear2: z.string(),
  salaryYear1: z.string(),
  salaryYear2: z.string(),
  socialChargesYear1: z.string(),
  socialChargesYear2: z.string(),
  amortizationYear1: z.string(),
  amortizationYear2: z.string(),
  agiosYear1: z.string(),
  agiosYear2: z.string(),
  resultsBeforeTaxYear1: z.string(),
  resultsBeforeTaxYear2: z.string(),
  profitTaxYear1: z.string(),
  profitTaxYear2: z.string(),
  serviceRevenueYear1: z.string(),
  serviceRevenueYear2: z.string(),

  // Date et lieu de signature
  signatureDate: z.string(),
  signaturePlace: z.string(),
});

export type Step1FormData = z.infer<typeof step1Schema>;
