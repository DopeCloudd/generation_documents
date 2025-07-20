import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import path from "path";

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

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, lineHeight: 1.6, fontFamily: "Inter" },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
    textDecoration: "underline",
  },
  paragraph: {
    marginBottom: 6,
    textAlign: "justify",
  },
  listItem: {
    marginLeft: 12,
    marginBottom: 4,
  },
  bold: { fontWeight: "bold" },
});

export const ProgrammeTemplate = ({ data }: { data: Step3FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>PROGRAMME DE LA FORMATION</Text>

      <Text style={styles.subtitle}>
        Accompagnement au bilan de compétences
      </Text>

      <Text style={styles.subtitle}>
        Modalités d’admission et de déroulement :
      </Text>
      <Text style={styles.paragraph}>
        Pour toutes nos formations, merci de vous inscrire par courrier, par
        mail, par téléphone ou via le formulaire de contact sur notre site
        internet. Votre demande d’inscription sera traitée dans un délai de deux
        jours ouvrés. La formation ne pourra débuter qu’au moins après les 10
        jours calendaires suivant la réception du bon de commande.
      </Text>

      <Text style={styles.subtitle}>Lieu de la formation :</Text>
      <Text style={styles.paragraph}>
        L’accompagnement se déroulera en ligne.
      </Text>

      <Text style={styles.subtitle}>
        Accessibilité pour les personnes en situation de handicap :
      </Text>
      <Text style={styles.paragraph}>
        Cette formation est accessible aux personnes en situation de handicap.
        Le référent en la matière se tient à votre écoute pour évaluer puis
        préciser votre projet de formation et anticiper les éventuels
        aménagements à réaliser pour vous accueillir.
      </Text>
      <Text style={styles.paragraph}>Contact: {data.email}</Text>
      <Text style={styles.paragraph}>Téléphone : {data.phoneNumber}</Text>

      <Text style={styles.subtitle}>Durée :</Text>
      <Text style={styles.paragraph}>
        La formation durera {data.formationDuration} heures
      </Text>

      <Text style={styles.subtitle}>Délai et modalités d’accès :</Text>
      <Text style={styles.paragraph}>
        Le délai d’accès à la formation va jusqu’à 2 mois suite à l’inscription
        auprès du référent pédagogique.
      </Text>

      <Text style={styles.subtitle}>Public concerné :</Text>
      <Text style={styles.paragraph}>
        Public souhaitant réaliser un bilan sur ses propres compétences
        professionnelles.
      </Text>

      <Text style={styles.subtitle}>Prérequis d’accès à la formation :</Text>
      <Text style={styles.paragraph}>Aucun prérequis</Text>

      <Text style={styles.subtitle}>Tarif :</Text>
      <Text style={styles.paragraph}>{data.formationPrice}€ TTC</Text>

      <Text style={styles.subtitle}>Objectifs pédagogiques :</Text>
      <View>
        {data.pedagogicalObjectivesArray?.map((obj, i) => (
          <Text key={i} style={styles.listItem}>
            • {obj}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Méthodes pédagogiques mobilisées :</Text>
      <View>
        {data.pedagogicalMethodsArray?.map((obj, i) => (
          <Text key={i} style={styles.listItem}>
            • {obj}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Programme de la formation :</Text>
      <View>
        {data.formationProgramArray?.map((obj, i) => (
          <Text key={i} style={styles.listItem}>
            • {obj}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Référent de la formation :</Text>
      <Text style={styles.paragraph}>
        Votre contact direct et référent de la formation sera {data.firstName}{" "}
        {data.lastName}, dirigeant(e) {data.companyName}.
      </Text>

      <Text style={styles.subtitle}>Modalités d’évaluation :</Text>
      <View>
        {data.evaluationMethodsArray?.map((obj, i) => (
          <Text key={i} style={styles.listItem}>
            • {obj}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
