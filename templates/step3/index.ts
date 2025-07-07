import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import { CGUTemplate } from "@/templates/step3/critere_1/indicateur_1/cgu";
import { CGVTemplate } from "@/templates/step3/critere_1/indicateur_1/cgv";
import { DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface DocumentTemplate {
  name: string;
  component: ReactElement<DocumentProps>;
}

export const getEtape3Documents = (
  formData: Step3FormData
): DocumentTemplate[] => [
  {
    name: "CGU.pdf",
    component: CGUTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "CGV.pdf",
    component: CGVTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
];
