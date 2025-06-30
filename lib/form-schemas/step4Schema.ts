import { z } from "zod";

export const step4Schema = z.object({
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
