import { Step4FormData } from "@/lib/form-schemas/step4Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#0D6EFD", // couleur de la bannière
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 6,
  },
  subtitle: { fontSize: 12, fontWeight: "bold", marginBottom: 6 },
  paragraph: { marginBottom: 6, textAlign: "justify" },
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

export const EDOFDescriptionTemplate = ({ data }: { data: Step4FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Bannière */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Textes pour inscription EDOF - {data.companyName}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Description des modalités de l’accompagnement pédagogique et technique
          :
        </Text>
        <Text style={styles.paragraph}>{data.pedagogicalDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Description des évaluations qui jalonnent ou concluent l’action de
          formation :
        </Text>
        <Text style={styles.paragraph}>{data.evaluationDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Justification de l’accompagnement pédagogique et technique :
        </Text>
        <Text style={styles.paragraph}>{data.justificationDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Modalités d’évaluation du besoin professionnel :
        </Text>
        <Text style={styles.paragraph}>{data.evaluationModalities}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Motivations et intentions de l’organisme :
        </Text>
        <Text style={styles.paragraph}>{data.motivationsDescription}</Text>
      </View>

      {/* Pied de page */}
      <View style={styles.footer}>
        <Text style={styles.footerLine}>
          {data.companyName} | {data.companyAddress} | SIRET :{" "}
          {data.companySiret}
        </Text>
        <Text style={styles.footerLine}>
          Déclaration d’activité n° {data.companyDeclarationNumber}.
        </Text>
        <Text style={styles.footerLine}>
          Contact : {data.managerEmail} - Tél : {data.managerPhone} – Site :{" "}
          <Text style={styles.footerLink}>{data.companyWebsite}</Text>
        </Text>
      </View>
    </Page>
  </Document>
);
