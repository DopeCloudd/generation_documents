import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, lineHeight: 1.6, fontFamily: "Helvetica" },
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
        {[
          "Évaluer et documenter les compétences professionnelles et personnelles.",
          "Identifier les savoirs théoriques et les savoir-faire pratiques.",
          "Déterminer les domaines d'intérêt et les motivations.",
          "Évaluer les valeurs et les attentes professionnelles.",
          "Formuler des objectifs professionnels clairs et réalisables.",
          "Développer un plan d'action pour atteindre ces objectifs (étapes, ressources nécessaires, échéances).",
          "Identifier les besoins en formation pour atteindre les objectifs professionnels.",
        ].map((obj, i) => (
          <Text key={i} style={styles.listItem}>
            • {obj}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Méthodes pédagogiques mobilisées :</Text>
      <View>
        {[
          "Exposés interactifs",
          "Études de cas",
          "Travail en sous-groupes",
          "Brainstorming",
          "Ateliers pratiques",
          "Mises en situation",
          "Utilisation de supports visuels (diapositives, vidéos, infographies, etc.)",
        ].map((method, i) => (
          <Text key={i} style={styles.listItem}>
            • {method}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Programme de la formation :</Text>
      <View>
        {[
          "Phase 1 : Préliminaire (3 heures)",
          "Module 1 : Accueil et cadrage du bilan (1 heure)",
          "Module 2 : Analyse du parcours professionnel et personnel (2 heures)",
          "Phase 2 : Investigation (15 heures)",
          "Module 3 : Identification des compétences et des aptitudes (5 heures)",
          "Module 4 : Exploration des motivations et des valeurs (3 heures)",
          "Module 5 : Exploration des pistes professionnelles (7 heures)",
          "Phase 3 : Conclusion (6 heures)",
          "Module 6 : Élaboration du projet professionnel finalisé (4 heures)",
          "Module 7 : Restitution finale et remise du document de synthèse (2 heures)",
        ].map((item, i) => (
          <Text key={i} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Référent de la formation :</Text>
      <Text style={styles.paragraph}>
        Votre contact direct et référent de la formation sera Stéphanie Valot,
        dirigeante Orientation.
      </Text>

      <Text style={styles.subtitle}>Modalités d’évaluation :</Text>
      <View>
        {[
          "Études de Cas Complexes",
          "Simulation de Séances de Formation",
          "Analyse Critique de Projets",
          "Exercices Pratiques",
          "Études de Cas Avancées",
          "Passation d'une Évaluation Approfondie",
          "Evaluation finale et passage de l’examen officiel devant un jury habilité",
        ].map((evalItem, i) => (
          <Text key={i} style={styles.listItem}>
            • {evalItem}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
