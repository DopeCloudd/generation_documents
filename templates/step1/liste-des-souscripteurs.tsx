import { Step1FormData } from "@/lib/form-schemas/step1Schema";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import path from "path";
import type React from "react";

// Cette ligne doit être exécutée côté serveur
Font.register({
  family: "Inter",
  fonts: [
    {
      src: path.resolve(process.cwd(), "public/fonts/inter.ttf"),
      fontWeight: "normal",
    },
    {
      src: path.resolve(process.cwd(), "public/fonts/Inter_18pt-Bold.ttf"),
      fontWeight: "bold",
    },
  ],
});

// Définition des styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 3,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableCol1: {
    width: "35%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 8,
    textAlign: "center",
  },
  tableCol2: {
    width: "20%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 8,
    textAlign: "center",
  },
  tableCol3: {
    width: "22.5%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
    padding: 8,
    textAlign: "center",
  },
  tableCol4: {
    width: "22.5%",
    padding: 8,
    textAlign: "center",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
  },
  totalRow: {
    backgroundColor: "#f8f8f8",
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 8,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },
  signature: {
    marginTop: 30,
  },
  signatureSection: {
    marginTop: 20,
    textAlign: "right",
  },
});

export const ListeDesSouscripteursTemplate: React.FC<{
  data: Step1FormData;
}> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {data.companyLegalForm} {data.companyName}
          </Text>
          <Text style={styles.subtitle}>
            Au capital de {data.companyCapital}€
          </Text>
          <Text style={styles.subtitle}>
            Adresse du siège sociale de la Société : {data.companyName}{" "}
            {data.companyPostalCode} {data.companyCity.toUpperCase()}
          </Text>
        </View>

        {/* Titre du tableau */}
        <View style={styles.section}>
          <Text style={[styles.title, styles.center]}>
            LISTE DES SOUSCRIPTEURS D&apos;ACTIONS
          </Text>
        </View>

        {/* Tableau des souscripteurs */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellHeader}>
                Nom, prénom, et adresse du Souscripteur
              </Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCellHeader}>
                Nombre d&apos;actions souscrites
              </Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCellHeader}>
                Montant total des souscriptions
              </Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCellHeader}>
                Montant des versements effectués
              </Text>
            </View>
          </View>

          {/* Souscripteur principal */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>
                {data.firstName} {data.lastName.toUpperCase()}
                {", "}
                <br />
                {data.address}
              </Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>100</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>1000 €</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>1000 €</Text>
            </View>
          </View>

          {/* Souscripteurs additionnels */}
          {/*data.additionalSubscribers?.map((subscriber, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableCell}>
                  {subscriber.firstName} {subscriber.lastName.toUpperCase()}
                </Text>
                <Text style={styles.tableCell}>{subscriber.address}</Text>
                <Text style={styles.tableCell}>
                  {subscriber.postalCode} {subscriber.city.toUpperCase()}
                </Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>
                  {subscriber.numberOfShares.toLocaleString("fr-FR")}
                </Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableCell}>
                  {subscriber.subscriptionAmount.toLocaleString("fr-FR")} €
                </Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableCell}>
                  {subscriber.paidAmount.toLocaleString("fr-FR")} €
                </Text>
              </View>
            </View>
          ))}*/}

          {/* Ligne Total */}
          <View style={[styles.tableRowLast, styles.totalRow]}>
            <View style={styles.tableCol1}>
              <Text style={[styles.tableCell, styles.bold, styles.center]}>
                TOTAL
              </Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={[styles.tableCell, styles.bold]}>100</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={[styles.tableCell, styles.bold]}>1000 €</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={[styles.tableCell, styles.bold]}>1000 €</Text>
            </View>
          </View>
        </View>

        {/* Description du capital */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            Le capital de la société est fixé à la somme de 1000€ (1000 euros),
            montant des apports en numéraire. Il est divisé en cent (100) parts
            sociales de chacune dix (10) euros de valeur nominale, numérotées de
            1 à 100 et toutes attribuées à l&apos;associé unique,{" "}
            {data.firstName} {data.lastName.toUpperCase()}.
          </Text>
        </View>

        {/* Certification */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            La présente liste des souscripteurs d&apos;actions de la société{" "}
            {data.companyName} est certifiée exacte, sincère et véritable par{" "}
            {data.certifiedBy}.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.paragraph}>
            Fait à {data.signaturePlace}, le {data.signatureDate}
          </Text>
          <Text style={styles.paragraph}>En deux exemplaires</Text>

          <View style={styles.signatureSection}>
            <Text style={styles.paragraph}>
              Signature de l&apos;actionnaire unique :
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
