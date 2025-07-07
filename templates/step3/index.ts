import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import { ProgrammeTemplate } from "@/templates/step3/critere_1/indicateur_1/BC/programme";
import { CGUTemplate } from "@/templates/step3/critere_1/indicateur_1/cgu";
import { CGVTemplate } from "@/templates/step3/critere_1/indicateur_1/cgv";
import { DocumentProps } from "@react-pdf/renderer";
import { readFile } from "fs/promises";
import { ReactElement } from "react";

interface DocumentTemplate {
  name: string;
  component?: ReactElement<DocumentProps>; // pour les PDF dynamiques
  buffer?: Buffer; // pour les fichiers statiques .docx
}

export const getEtape3Documents = async (
  formData: Step3FormData
): Promise<DocumentTemplate[]> => {
  return [
    {
      name: "critere_1/indicateur_1/CGU.pdf",
      component: CGUTemplate({
        data: formData,
      }) as ReactElement<DocumentProps>,
    },
    {
      name: "critere_1/indicateur_1/CGV.pdf",
      component: CGVTemplate({
        data: formData,
      }) as ReactElement<DocumentProps>,
    },
    {
      name: "critere_1/indicateur_1/programme.pdf",
      component: ProgrammeTemplate({
        data: formData,
      }) as ReactElement<DocumentProps>,
    },
    {
      name: "critere_1/indicateur_2/formulaire_satisfaction.docx",
      buffer: await readFile(
        "templates/step3/critere_1/indicateur_2/formulaire_satisfaction.docx"
      ),
    },
    {
      name: "critere_2/indicateur_4/compte_rendu_entretien.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_4/compte_rendu_entretien.docx"
      ),
    },
    {
      name: "critere_2/indicateur_4/dossier_admission.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_4/dossier_admission.docx"
      ),
    },
    {
      name: "critere_2/indicateur_4/grille_identification.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_4/grille_identification.docx"
      ),
    },
    {
      name: "critere_2/indicateur_4/questionnaire_analyse.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_4/questionnaire_analyse.docx"
      ),
    },
    {
      name: "critere_2/indicateur_4/questionnaire_besoins.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_4/questionnaire_besoins.docx"
      ),
    },
    {
      name: "critere_2/indicateur_5/Convention_de_formation_professionnelle.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_5/Convention_de_formation_professionnelle.docx"
      ),
    },
    {
      name: "critere_2/indicateur_5/Objectif et protocole d_évaluation de la formation.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_5/Objectif et protocole d_évaluation de la formation.docx"
      ),
    },
  ];
};
