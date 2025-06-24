import { Step1FormData } from "@/lib/form-schemas/step1Schema";
import { BilanPrevisionnelTemplate } from "@/templates/step1/bilan-previsionnel";
import { DeclarationNonCondamnationTemplate } from "@/templates/step1/declaration-de-non-condamnation";
import { ListeDesSouscripteursTemplate } from "@/templates/step1/liste-des-souscripteurs";
import { ProjetDeStatutsTemplate } from "@/templates/step1/projet-de-statuts";
import { DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface DocumentTemplate {
  name: string;
  component: ReactElement<DocumentProps>;
}

export const getEtape1Documents = (
  formData: Step1FormData
): DocumentTemplate[] => [
  {
    name: "Projet_de_statuts.pdf",
    component: ProjetDeStatutsTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "Bilan_previsionnel.pdf",
    component: BilanPrevisionnelTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "Liste_des_souscripteurs.pdf",
    component: ListeDesSouscripteursTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
  {
    name: "Declaration_non_condamnation.pdf",
    component: DeclarationNonCondamnationTemplate({
      data: formData,
    }) as ReactElement<DocumentProps>,
  },
];
