import { Step4FormData } from "@/lib/form-schemas/step4Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 6,
  },
  header: {
    backgroundColor: "#0D6EFD", // couleur de la bannière
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#0D6EFD",
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 6,
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 4,
    textAlign: "justify",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
    fontSize: 10,
  },
  footerLine: {
    textAlign: "center",
    marginBottom: 2,
    color: "#555",
  },
  footerLink: {
    color: "#007BFF",
    textDecoration: "underline",
  },
});

export const TarifsBilanTemplate = ({ data }: { data: Step4FormData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        {/* Bannière */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Tarif et organisation du bilan de compétences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Tarif :</Text>
          <Text style={styles.paragraph}>
            Le prix du bilan de compétences est de {data.price} € TTC. Notre
            organisme est non assujetti à la TVA.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Durée :</Text>
          <Text style={styles.paragraph}>
            Le bilan de compétences se réalise sur une période maximum de{" "}
            {data.period}.
          </Text>
          <Text style={styles.paragraph}>
            Il se décline sur {data.sessionsCount} séances rendez-vous de{" "}
            {data.sessionMinDuration} à {data.sessionMaxDuration}.
          </Text>
          <Text style={styles.paragraph}>
            La durée totale du bilan de compétences s’entend sur un maximum de
            {data.totalDuration}.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Déroulement :</Text>
          <Text style={styles.paragraph}>{data.déroulement}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Organisation :</Text>
          <Text style={styles.paragraph}>{data.organization}.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Nombre de bénéficiaire :</Text>
          <Text style={styles.paragraph}>{data.maxBeneficiaries}</Text>
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text style={styles.footerLine}>
            {data.companyName} | {data.companyAddress} | Numéro SIRET :
            {data.companySiret}
          </Text>
          <Text style={styles.footerLine}>
            Déclaration d’activité enregistrée sous le numéro{" "}
            {data.companyDeclarationNumber}. Cet enregistrement ne vaut pas
            agrément de l&apos;État.
          </Text>
          <Text style={styles.footerLine}>
            Contact : {data.managerEmail} - Tél : {data.managerPhone} – Site :{" "}
            <Text style={styles.footerLink}>{data.companyWebsite}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};
