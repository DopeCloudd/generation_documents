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
    // critere_1
    {
      name: "critere_1/indicateur_2/formulaire_satisfaction.docx",
      buffer: await readFile(
        "templates/step3/critere_1/indicateur_2/formulaire_satisfaction.docx"
      ),
    },

    // critere_2
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
    {
      name: "critere_2/indicateur_6/Livret d_évaluation .docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_6/Livret d_évaluation .docx"
      ),
    },
    {
      name: "critere_2/indicateur_6/Processus conception.jpg",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_6/Processus conception.jpg"
      ),
    },
    {
      name: "critere_2/indicateur_6/Processus coordination handicap.jpg",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_6/Processus coordination handicap.jpg"
      ),
    },
    {
      name: "critere_2/indicateur_8/Questionnaire d_évaluation initiale.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_8/Questionnaire d_évaluation initiale.docx"
      ),
    },
    {
      name: "critere_2/indicateur_8/Quiz positionnement exemple.docx",
      buffer: await readFile(
        "templates/step3/critere_2/indicateur_8/Quiz positionnement exemple.docx"
      ),
    },

    // critere_3
    {
      name: "critere_3/indicateur_9/Charte utilisateur numérique.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_9/Charte utilisateur numérique.docx"
      ),
    },
    {
      name: "critere_3/indicateur_9/Convocation.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_9/Convocation.docx"
      ),
    },
    {
      name: "critere_3/indicateur_10/GROUPES DE NIVEAUX.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_10/GROUPES DE NIVEAUX.docx"
      ),
    },
    {
      name: "critere_3/indicateur_10/Livret de Suivi pédagogique.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_10/Livret de Suivi pédagogique.docx"
      ),
    },
    {
      name: "critere_3/indicateur_10/PROGRAMME DE FORMATION.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_10/PROGRAMME DE FORMATION.docx"
      ),
    },
    {
      name: "critere_3/indicateur_10/Texte de loi_.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_10/Texte de loi_.docx"
      ),
    },
    {
      name: "critere_3/indicateur_11/ÉVALUATION À CHAUD.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_11/ÉVALUATION À CHAUD.docx"
      ),
    },
    {
      name: "critere_3/indicateur_11/ÉVALUATION À FROID.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_11/ÉVALUATION À FROID.docx"
      ),
    },
    {
      name: "critere_3/indicateur_11/Fiche d_évaluation d_atteinte des objectifs.xlsx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_11/Fiche d_évaluation d_atteinte des objectifs.xlsx"
      ),
    },
    {
      name: "critere_3/indicateur_12/CONVENTION_DE_FORMATION_PROFESSIONNELLE.doc",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/CONVENTION_DE_FORMATION_PROFESSIONNELLE.doc"
      ),
    },
    {
      name: "critere_3/indicateur_12/Convocation (1).docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/Convocation (1).docx"
      ),
    },
    {
      name: "critere_3/indicateur_12/Éviter le décrochage.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/Éviter le décrochage.docx"
      ),
    },
    {
      name: "critere_3/indicateur_12/Feuille d_émargement.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/Feuille d_émargement.docx"
      ),
    },
    {
      name: "critere_3/indicateur_12/legislation assiduité.pdf",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/legislation assiduité.pdf"
      ),
    },
    {
      name: "critere_3/indicateur_12/Lettre lutte contre le décrochage.docx",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/Lettre lutte contre le décrochage.docx"
      ),
    },
    {
      name: "critere_3/indicateur_12/Processus réalisation.jpg",
      buffer: await readFile(
        "templates/step3/critere_3/indicateur_12/Processus réalisation.jpg"
      ),
    },
  ];
};
