import type { Step1FormData } from "@/lib/form-schemas/step1Schema";
import { Step4FormData } from "@/lib/form-schemas/step4Schema";

export async function generateStep1(formData: Step1FormData) {
  const response = await fetch("/api/generate-pdf/step1", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Erreur serveur");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `SASU - ${formData.companyName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export async function generateStep4(formData: Step4FormData) {
  const response = await fetch("/api/generate-pdf/step4", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Erreur serveur");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `liste-des-formateurs.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
