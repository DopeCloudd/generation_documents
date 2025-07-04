import { Step4FormData } from "@/lib/form-schemas/step4Schema";
import { TrainersTemplate } from "@/templates/step4/formateurs";
import { TarifsBilanTemplate } from "@/templates/step4/grille-tarif";
import { EDOFDescriptionTemplate } from "@/templates/step4/texte-inscription";
import { DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface DocumentTemplate {
  name: string;
  component: ReactElement<DocumentProps>;
}

export const getEtape4Documents = (
  formData: Step4FormData
): DocumentTemplate[] => [
  {
    name: "Liste_des_formateurs.pdf",
    component: TrainersTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "Textes_inscription_EDOF.pdf",
    component: EDOFDescriptionTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "Grille_tarifaire.pdf",
    component: TarifsBilanTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
];
