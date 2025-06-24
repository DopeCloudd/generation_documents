// lib/pdf-utils.ts
import { numberToWordsFr } from "@/lib/pdf/number-utils"; // à créer
import { StatutsSASUData } from "@/templates/sasu/projet-de-statuts";

interface StatutsFormData {
  companyName: string;
  legalForm: string;
  capital: number | string;
  shareCount: number | string;
  address: string;
  postalCode: string;
  city: string;
  companyPurpose: string;
  firstNames: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  currentAddress: string;
  doneAt: string;
  doneOn: string;
}

export function mapToStatutsData(formData: StatutsFormData): StatutsSASUData {
  const capital = Number(formData.capital || 0);
  const shareCount = Number(formData.shareCount || 1);
  const shareValue = capital / shareCount;

  return {
    companyName: formData.companyName,
    legalForm: formData.legalForm,
    capital,
    capitalInWords: numberToWordsFr(capital),
    address: formData.address,
    postalCode: formData.postalCode,
    city: formData.city,
    rcsCity: formData.city,
    businessObject: formData.companyPurpose,

    presidentCivility: "Monsieur", // À ajouter dans le formulaire si besoin
    presidentFirstName: formData.firstNames,
    presidentLastName: formData.lastName,
    presidentBirthDate: formData.birthDate,
    presidentBirthPlace: formData.birthPlace,
    presidentNationality: "Française", // à ajouter si variable
    presidentAddress: formData.currentAddress,
    presidentPostalCode: formData.postalCode,
    presidentCity: formData.city,

    numberOfShares: shareCount,
    numberOfSharesInWords: numberToWordsFr(shareCount),
    shareValue,
    shareValueInWords: numberToWordsFr(shareValue),
    sharesRange: `de 1 à ${shareCount}`,

    companyDuration: 99,
    companyDurationInWords: "quatre-vingt-dix-neuf",
    firstExerciseEndDate: "31/12/2025",
    presidentAgeLimit: 99,

    signaturePlace: formData.doneAt,
    signatureDate: formData.doneOn,
  };
}
