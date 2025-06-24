import { step1FormData } from "@/lib/form-schema/step-1";
import { DeclarationNonCondamnationData } from "@/templates/sasu/declaration-de-non-condamnation";

export function mapToDeclarationNonCondamnationData(
  data: step1FormData
): DeclarationNonCondamnationData {
  return {
    nom: data.lastName,
    prenoms: data.firstNames,
    adresse: data.currentAddress,
    dateNaissance: data.birthDate,
    lieuNaissance: data.birthPlace,
    pere: data.fatherName,
    mere: data.motherName,
    lieuDeclaration: data.doneAt,
    dateDeclaration: data.doneOn,
  };
}
