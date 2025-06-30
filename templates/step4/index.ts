import { Step4FormData } from "@/lib/form-schemas/step4Schema";
import { DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";
import { TrainersTemplate } from "./formateurs";

interface DocumentTemplate {
  name: string;
  component: ReactElement<DocumentProps>;
}

export const getEtape4Documents = (
  formData: Step4FormData
): DocumentTemplate[] => [
  {
    name: "Projet_de_statuts.pdf",
    component: TrainersTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
];
