import { Step1FormData } from "@/lib/form-schemas/step1Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

// ✅ Fonction utilitaire pour éviter les erreurs de style conditionnel
const mergeStyles = (
  ...styles: (Style | false | null | undefined)[]
): Style[] => styles.filter(Boolean) as Style[];

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    backgroundColor: "#e0e0e0",
    padding: 6,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    border: "1 solid #000",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  table: {
    border: "1 solid #000",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1 solid #ccc",
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableRowTotal: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  cellLabel: {
    width: "50%",
  },
  cellYear1: {
    width: "25%",
    textAlign: "right",
  },
  cellYear2: {
    width: "25%",
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
});

export const BilanPrevisionnelTemplate = ({
  data,
}: {
  data: Step1FormData;
}) => {
  const totalChargesYear1 =
    parseFloat(data.purchaseGoodsYear1) +
    parseFloat(data.subcontractingYear1) +
    parseFloat(data.rentYear1) +
    parseFloat(data.insuranceYear1) +
    parseFloat(data.salaryYear1) +
    parseFloat(data.socialChargesYear1) +
    parseFloat(data.amortizationYear1) +
    parseFloat(data.agiosYear1);

  const totalChargesYear2 =
    parseFloat(data.purchaseGoodsYear2) +
    parseFloat(data.subcontractingYear2) +
    parseFloat(data.rentYear2) +
    parseFloat(data.insuranceYear2) +
    parseFloat(data.salaryYear2) +
    parseFloat(data.socialChargesYear2) +
    parseFloat(data.amortizationYear2) +
    parseFloat(data.agiosYear2);

  const resultatsNetsYear1 =
    parseFloat(data.resultsBeforeTaxYear1) - parseFloat(data.profitTaxYear1);

  const resultatsNetsYear2 =
    parseFloat(data.resultsBeforeTaxYear2) - parseFloat(data.profitTaxYear2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Bilan prévisionnel</Text>

        {/* Identité entreprise */}
        <Text style={styles.sectionTitle}>Identité de l&apos;entreprise</Text>
        <Text>Dénomination : {data.companyName}</Text>
        <Text>Activité : {data.companyActivity}</Text>
        <Text>Forme juridique : {data.companyLegalForm}</Text>
        <Text>
          Adresse : {data.companyAddress}, {data.companyPostalCode}{" "}
          {data.companyCity.toUpperCase()}
        </Text>

        <Text style={styles.sectionTitle}>
          Exercice : du {data.exerciceDebut} au {data.exerciceFin}
        </Text>

        {/* CHARGES */}
        <Text style={styles.sectionTitle}>Charges</Text>
        <View style={styles.table}>
          {[
            [
              "Achats de marchandises",
              data.purchaseGoodsYear1,
              data.purchaseGoodsYear2,
            ],
            [
              "Sous-traitance",
              data.subcontractingYear1,
              data.subcontractingYear2,
            ],
            ["Achats de fournitures", "0", "0"],
            ["Loyers, charges locatives", data.rentYear1, data.rentYear2],
            ["Assurance, entretien", data.insuranceYear1, data.insuranceYear2],
            [
              "Salaires et charges sociales",
              data.salaryYear1,
              data.salaryYear2,
            ],
            [
              "Charges sociales du dirigeant",
              data.socialChargesYear1,
              data.socialChargesYear2,
            ],
            [
              "Dotations aux amortissements",
              data.amortizationYear1,
              data.amortizationYear2,
            ],
            ["Agios et intérêts payés", data.agiosYear1, data.agiosYear2],
            [
              "Total des charges",
              totalChargesYear1.toFixed(2),
              totalChargesYear2.toFixed(2),
            ],
          ].map(([label, y1, y2], idx) => (
            <View
              key={label}
              style={mergeStyles(
                styles.tableRow,
                idx === 9 && styles.tableRowTotal
              )}
            >
              <Text style={styles.cellLabel}>{label}</Text>
              <Text style={styles.cellYear1}>{y1} €</Text>
              <Text style={styles.cellYear2}>{y2} €</Text>
            </View>
          ))}
        </View>

        {/* PRODUITS */}
        <Text style={styles.sectionTitle}>Produits</Text>
        <View style={styles.table}>
          {[
            ["Vente de marchandises", "0", "0"],
            ["Vente de produits fabriqués", "0", "0"],
            [
              "Prestation de service",
              data.serviceRevenueYear1,
              data.serviceRevenueYear2,
            ],
            ["Honoraires", "0", "0"],
            ["Autres produits", "0", "0"],
          ].map(([label, y1, y2]) => (
            <View key={label} style={mergeStyles(styles.tableRow)}>
              <Text style={styles.cellLabel}>{label}</Text>
              <Text style={styles.cellYear1}>{y1} €</Text>
              <Text style={styles.cellYear2}>{y2} €</Text>
            </View>
          ))}
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        {/* COMPTE DE RESULTAT */}
        <Text style={styles.sectionTitle}>
          Compte de résultat simplifié prévisionnel
        </Text>
        <View style={styles.table}>
          {[
            [
              "Résultat avant impôt",
              data.resultsBeforeTaxYear1,
              data.resultsBeforeTaxYear2,
            ],
            [
              "Impôt sur les bénéfices",
              data.profitTaxYear1,
              data.profitTaxYear2,
            ],
            [
              "Résultat net",
              resultatsNetsYear1.toFixed(2),
              resultatsNetsYear2.toFixed(2),
            ],
          ].map(([label, y1, y2]) => (
            <View
              key={label}
              style={mergeStyles(
                styles.tableRow,
                label === "Résultat net" && styles.tableRowTotal
              )}
            >
              <Text style={styles.cellLabel}>{label}</Text>
              <Text style={styles.cellYear1}>{y1} €</Text>
              <Text style={styles.cellYear2}>{y2} €</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
