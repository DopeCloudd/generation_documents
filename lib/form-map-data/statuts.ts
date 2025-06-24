import { step1FormData } from "@/lib/form-schema/step-1";

export function mapToStatutsData(formData: step1FormData) {
  return {
    companyName: formData.companyName,
    legalForm: formData.legalForm,
    capital: formData.capital,
    address: formData.address,
    postalCode: formData.postalCode,
    city: formData.city,
    activity: formData.activity,
    companyPurpose: formData.companyPurpose,
    uniqueAssociateName: formData.uniqueAssociateName,
    doneAt: formData.doneAt,
    doneOn: formData.doneOn,
  };
}
