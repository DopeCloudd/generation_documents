import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export interface Trainer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  title: string;
  qualifications: string[];
  trainings: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, lineHeight: 1.5, fontFamily: "Helvetica" },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  section: { marginBottom: 20 },
  name: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  paragraph: { marginBottom: 4, textAlign: "justify" },
  listItem: { marginLeft: 12 },
  separator: {
    borderBottom: "1 solid #ccc",
    marginVertical: 10,
  },
});

export const TrainersTemplate = ({ trainers }: { trainers: Trainer[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Fichier des formateurs et de leurs qualifications
      </Text>

      {trainers.map((trainer, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.name}>
            {trainer.firstName} {trainer.lastName}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Adresse: </Text>
            {trainer.address}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            {trainer.email}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Téléphone: </Text>
            {trainer.phone}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Titre: </Text>
            {trainer.title}
          </Text>

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Qualifications:</Text>
          </Text>
          {trainer.qualifications.map((q, i) => (
            <Text key={i} style={styles.listItem}>
              • {q}
            </Text>
          ))}

          <Text style={styles.paragraph}>
            <Text style={{ fontWeight: "bold" }}>Formations dispensées:</Text>{" "}
            {trainer.trainings}
          </Text>

          {index < trainers.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </Page>
  </Document>
);
