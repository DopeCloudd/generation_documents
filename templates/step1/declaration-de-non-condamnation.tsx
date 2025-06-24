import { Step1FormData } from "@/lib/form-schemas/step1Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Styles PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  paragraph: {
    marginBottom: 10,
    textAlign: "justify",
  },
  paragraph2: {
    marginTop: 40,
    marginBottom: 10,
    textAlign: "justify",
  },
  signature: {
    marginTop: 40,
    textAlign: "left",
  },
  warning: {
    marginTop: 40,
    fontSize: 10,
    color: "#333",
  },
});

export const DeclarationNonCondamnationTemplate = ({
  data,
}: {
  data: Step1FormData;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Déclaration de non condamnation et de filiation
        </Text>

        <Text style={styles.paragraph}>Je soussigné,</Text>
        <Text style={styles.paragraph}>Nom : {data.lastName}</Text>
        <Text style={styles.paragraph}>Prénom : {data.firstName}</Text>
        <Text style={styles.paragraph}>Demeurant : {data.address}</Text>
        <Text style={styles.paragraph}>Né le : {data.birthDate}</Text>
        <Text style={styles.paragraph}>À : {data.birthPlace}</Text>
        <Text style={styles.paragraph}>Fils de : {data.fatherName}</Text>
        <Text style={styles.paragraph}>Et de : {data.motherName}</Text>

        <Text style={styles.paragraph2}>
          déclare sur l&apos;honneur, conformément à l&apos;article 17 de
          l&apos;arrêté du 9 février 1988 relatif au Registre du Commerce et des
          Sociétés, n&apos;avoir fait l&apos;objet d&apos;aucune condamnation
          pénale, ni de sanction civile ou administrative de nature à
          m&apos;interdire de gérer, d&apos;administrer ou de diriger une
          personne morale, ou d&apos;exercer une activité commerciale.
        </Text>

        <View style={styles.signature}>
          <Text>Fait à : {data.signaturePlace}</Text>
          <Text>Le : {data.signatureDate}</Text>
          <Text style={{ marginTop: 30 }}>Signature :</Text>
        </View>

        <Text style={styles.warning}>
          Article L.123-5 du code de commerce : Le fait de donner, de mauvaise
          foi, des indications inexactes ou incomplètes en vue d&apos;une
          immatriculation, d&apos;une radiation ou d&apos;une mention
          complémentaire ou rectificative au registre du commerce et des
          sociétés est puni d&apos;une amende de 4 500 € et d&apos;un
          emprisonnement de 6 mois. Les dispositions des deuxième et troisième
          alinéas de l&apos;article L. 123-4 sont applicables dans les cas
          prévus au présent article.
        </Text>
      </Page>
    </Document>
  );
};
