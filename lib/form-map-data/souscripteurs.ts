import { step1FormData } from "@/lib/form-schema/step-1";
import { numberToWordsFr } from "@/lib/pdf/number-utils";
import { ListeSouscripteursData } from "@/templates/sasu/liste-des-souscripteurs";

export function mapToListeSouscripteursData(
  form: step1FormData
): ListeSouscripteursData {
  const numberOfShares = parseInt(form.shareCount || "0", 10);
  const shareValue =
    form.subscriptionAmount && numberOfShares > 0
      ? parseFloat(form.subscriptionAmount) / numberOfShares
      : 0;

  return {
    companyName: form.companyName,
    capital: parseFloat(form.capital),
    capitalInWords: numberToWordsFr(parseFloat(form.capital)), // tu peux utiliser une fonction toWords() à part
    address: form.address,
    postalCode: form.postalCode,
    city: form.city,

    subscriberCivility: "M.", // à rendre dynamique si tu ajoutes une civilité au formulaire
    subscriberFirstName: extractFirstName(form.subscriberName),
    subscriberLastName: extractLastName(form.subscriberName),
    subscriberAddress: form.subscriberAddress,
    subscriberPostalCode: form.postalCode, // ou un champ spécifique si différent
    subscriberCity: form.city,

    numberOfShares,
    numberOfSharesInWords: numberToWordsFr(numberOfShares),
    shareValue,
    shareValueInWords: numberToWordsFr(shareValue),
    totalSubscriptionAmount: parseFloat(form.subscriptionAmount),
    totalPaidAmount: parseFloat(form.releasedAmount),
    sharesRange: `1 à ${numberOfShares}`,

    certifierName: form.uniqueAssociateName,
    signaturePlace: form.doneAt,
    signatureDate: form.doneOn,

    // Si tu veux gérer plusieurs souscripteurs, tu peux les ajouter ici
    additionalSubscribers: [],
  };
}

// Helpers simples pour extraire prénom/nom si subscriberName est "Prénom Nom"
function extractFirstName(fullName: string): string {
  return fullName?.split(" ").slice(0, -1).join(" ") || "";
}

function extractLastName(fullName: string): string {
  return fullName?.split(" ").slice(-1).join(" ") || "";
}
