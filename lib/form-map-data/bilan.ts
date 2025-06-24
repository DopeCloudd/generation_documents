import { step1FormData } from "@/lib/form-schema/step-1";
import { BilanPrevisionnelData } from "@/templates/sasu/bilan-previsionnel";

function toTuple(n1?: number, n2?: number): [number, number] {
  return [Number(n1 || 0), Number(n2 || 0)];
}

export function mapToBilanData(data: step1FormData): BilanPrevisionnelData {
  const prestationsServices = toTuple(
    data.serviceRevenueYear1,
    data.serviceRevenueYear2
  );
  const autresProduits = toTuple(
    data.otherRevenueYear1,
    data.otherRevenueYear2
  );
  const totalProduits = [
    prestationsServices[0] + autresProduits[0],
    prestationsServices[1] + autresProduits[1],
  ];

  const achatsFournitures = toTuple(data.suppliesYear1, data.suppliesYear2);
  const chargesExternes = toTuple(
    data.externalChargesYear1,
    data.externalChargesYear2
  );
  const assurancesEntretiens = toTuple(
    data.insuranceYear1,
    data.insuranceYear2
  );
  const salairesCharges = toTuple(data.salaryYear1, data.salaryYear2);
  const chargesDirigeant = toTuple(
    data.socialChargesYear1,
    data.socialChargesYear2
  );
  const chargesFinancieres = toTuple(
    data.loanInterestYear1,
    data.loanInterestYear2
  );

  const totalCharges = [
    achatsFournitures[0] +
      chargesExternes[0] +
      assurancesEntretiens[0] +
      salairesCharges[0] +
      chargesDirigeant[0] +
      chargesFinancieres[0],
    achatsFournitures[1] +
      chargesExternes[1] +
      assurancesEntretiens[1] +
      salairesCharges[1] +
      chargesDirigeant[1] +
      chargesFinancieres[1],
  ];

  const resultatAvantImpot = [
    totalProduits[0] - totalCharges[0],
    totalProduits[1] - totalCharges[1],
  ];
  const impot: [number, number] = [0, 0]; // à personnaliser si nécessaire
  const resultatNet = [
    resultatAvantImpot[0] - impot[0],
    resultatAvantImpot[1] - impot[1],
  ];

  return {
    entreprise: {
      denomination: data.companyName,
      activite: data.businessActivity,
      formeJuridique: "SASU",
      adresse: data.companyAddress,
    },
    exerciceDebut: data.exerciseStart,
    exerciceFin: data.exerciseEnd,

    produits: {
      ventesMarchandises: [0, 0],
      ventesProduits: [0, 0],
      prestationsServices,
      honoraires: [0, 0],
      autresProduits,
      interetsPercus: [0, 0],
      totalProduits,
    },

    charges: {
      achatsMarchandises: [0, 0],
      sousTraitance: [0, 0],
      achatsFournitures,
      chargesExternes,
      loyersCharges: [0, 0],
      assurancesEntretiens,
      salairesCharges,
      chargesDirigeant,
      dotationsAmortissements: [0, 0],
      chargesFinancieres,
      totalCharges,
    },

    resultat: {
      resultatAvantImpot,
      impot,
      resultatNet,
    },
  };
}
