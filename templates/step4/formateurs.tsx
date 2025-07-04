import { Step4FormData } from "@/lib/form-schemas/step4Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 6,
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
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#E3ECFC",
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    flex: 1,
  },
  tableCell: {
    padding: 6,
    borderRightWidth: 1,
    borderRightColor: "#eee",
    flex: 1,
  },
  lastCell: {
    borderRightWidth: 0,
  },
  name: { fontSize: 14, fontWeight: "bold", marginBottom: 6 },
  paragraph: { marginBottom: 4 },
  listItem: { marginLeft: 12 },
  separator: {
    borderBottom: "1 solid #ccc",
    marginVertical: 10,
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

export const TrainersTemplate = ({ data }: { data: Step4FormData }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Bannière */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Liste des formateurs et leurs qualification
        </Text>
      </View>

      {/* En-tête du tableau */}
      <View style={styles.tableRow}>
        <Text style={styles.tableHeaderCell}>Nom</Text>
        <Text style={styles.tableHeaderCell}>Coordonnées</Text>
        <Text style={styles.tableHeaderCell}>Titre / Qualité</Text>
        <Text style={[styles.tableHeaderCell, styles.lastCell]}>
          Formations
        </Text>
      </View>

      {/* Données */}
      {data.trainers.map((trainer, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {trainer.civility} {trainer.firstName} {trainer.lastName}
          </Text>
          <Text style={styles.tableCell}>
            {trainer.address}
            {"\n"} {trainer.email}
            {"\n"} {trainer.phone}
          </Text>
          <Text style={styles.tableCell}>
            {trainer.title}
            {"\n"}
            {trainer.qualifications.join(", ")}
          </Text>
          <Text style={[styles.tableCell, styles.lastCell]}>
            {trainer.trainings}
          </Text>
        </View>
      ))}

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
