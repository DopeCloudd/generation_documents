import { z } from "zod";

export const step4Schema = z.object({
  // Nom de l'organisme
  companyName: z.string().min(1),
  // Numéro SIRET de l'organisme
  companySiret: z.string().min(1),
  // Numero de déclaration d'activité de l'organisme
  companyDeclarationNumber: z.string().min(1),
  // Adresse de l'organisme
  companyAddress: z.string().min(1),
  // Nom du responsable de l'organisme
  managerEmail: z.string().min(1),
  // Numéro de téléphone du responsable de l'organisme
  managerPhone: z.string().min(1),
  // Site web de l'organisme
  companyWebsite: z.string().min(1),

  // Prix du bilan de compétences
  price: z.string().min(1),
  // Période maximale de réalisation du bilan de compétences
  period: z.string().min(1),
  // Nombre de séances de rendez-vous prévues
  sessionsCount: z.string().min(1),
  // Durée minimale d'une séance de rendez-vous
  sessionMinDuration: z.string().min(1),
  // Durée maximale d'une séance de rendez-vous
  sessionMaxDuration: z.string().min(1),
  // Durée totale du bilan de compétences
  totalDuration: z.string().min(1),
  // Déroulement du bilan de compétences
  déroulement: z.string().min(1),
  // Organisation du bilan de compétences
  organization: z.string().min(1),
  // Nombre de bénéficiaires maximum par bilan de compétences
  maxBeneficiaries: z.number().min(1),

  // Description des modalités de l’accompagnement pédagogique et technique
  pedagogicalDescription: z.string().min(1),
  // Description des évaluations qui jalonnent ou concluent l’action de formation
  evaluationDescription: z.string().min(1),
  // Description des moyens mis en place pour justifier l’accompagnement
  justificationDescription: z.string().min(1),
  // Description des modalités d’évaluation utilisées pour qualifier le besoin dans le cadre d'un projet professionnel
  evaluationModalities: z.string().min(1),
  // Description des motivations et des intentions de l'organisme à être référencé sur l'espace des organismes de formation
  motivationsDescription: z.string().min(1),

  // Tableau des formateurs
  trainers: z.array(
    z.object({
      civility: z.enum(["Mr", "Mme"]),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      phone: z.string(),
      address: z.string(),
      title: z.string(),
      qualifications: z.array(z.string().min(1)),
      trainings: z.string(),
    })
  ),
});

export type Step4FormData = z.infer<typeof step4Schema>;
