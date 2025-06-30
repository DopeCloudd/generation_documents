import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, lineHeight: 1.6, fontFamily: "Helvetica" },
  section: { marginBottom: 20 },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: { fontSize: 14, fontWeight: "bold", marginVertical: 8 },
  paragraph: { marginBottom: 6, textAlign: "justify" },
});

export const CGUTemplate = ({ data }: { data: Step3FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Conditions Générales d’Utilisation</Text>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          {data.companyName}, désigne un organisme de formation professionnelle,
          dont le siège social est situé au {data.companyAddress}
          {", "}
          {data.companyPostalCode} {data.companyCity}.
        </Text>
        <Text style={styles.paragraph}>
          {data.companyName} met en place et dispense des formations à des
          entreprises et à des particuliers sur l’ensemble du territoire
          national, seul ou en partenariat.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Objet et champ d’application</Text>
        <Text style={styles.paragraph}>
          Les présentes Conditions Générales d’Utilisation constituent un
          contrat entre les utilisateurs des ressources pédagogiques dont
          ceux-ci prennent connaissance impérativement avant de les utiliser.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Propriété intellectuelle et droit d’auteur
        </Text>
        <Text style={styles.paragraph}>
          Les supports de formation, quelle qu’en soit la forme (papier,
          numérique, électronique, plateforme pédagogique...), sont protégés par
          la propriété intellectuelle et le droit d’auteur. Leur reproduction,
          partielle ou totale, ne peut être effectuée sans l’accord exprès de
          {data.companyName}. Le client s’engage à ne pas utiliser, transmettre
          ou reproduire tout ou partie de ces documents en vue de l’organisation
          ou de l’animation de formations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>
          Règlement Général de Protection des Données
        </Text>
        <Text style={styles.paragraph}>
          Les informations suivantes sont conservées pour les besoins de la
          conformité au référentiel Qualiopi, notamment : {"\n"}- résultats des
          quiz et enquêtes et dates de passage {"\n"}- dates d’envoi des
          documents et dates des sessions de formation
        </Text>
        <Text style={styles.paragraph}>
          Chaque stagiaire dispose des droits suivants : {"\n"}- Un droit
          d’accès {"\n"}- Un droit de rectification {"\n"}- Un droit
          d’effacement {"\n"}- Le cas échéant, d’un droit à la portabilité de
          ses données {"\n"}- Un droit de demander la limitation du traitement
          de ses données et/ ou de s’y opposer {"\n"}- Le cas échéant, un droit
          de retirer son consentement. {"\n"}Chaque stagiaire peut exercer ces
          droits en envoyant soit : {"\n"}- Un courriel à :{data.email}
          {"\n"}- Un courrier à l’attention de {data.companyName} {"\n"}- Chaque
          stagiaire dispose également, en cas de difficultés liées à la gestion
          de ses données, d’un droit d’introduire une réclamation auprès de la
          CNIL : tél : 01 53 73 22 22 - site internet : www.cnil.fr
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Accès aux documents</Text>
        <Text style={styles.paragraph}>
          Les documents pédagogiques mis à disposition ne sont destinés qu’aux
          personnes titulaires d’une formation payante ou gratuite. Ils ne
          peuvent en aucun cas être communiqués à d’autres tiers sans l’accord
          préalable de {data.companyName}. Les apprenants peuvent jouir de ces
          documents sans limite de temps.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Liens hypertextes</Text>
        <Text style={styles.paragraph}>
          {data.companyName} n’est pas responsable du contenu des liens
          externes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Litiges</Text>
        <Text style={styles.paragraph}>
          Les présentes Conditions Générales d’Utilisation sont encadrées par la
          loi française. En cas de litige survenant entre {data.companyName} et
          le client, la recherche d’une solution à l’amiable sera privilégiée,
          ou pour un particulier devant le Médiateur indiqué dans le contrat. À
          défaut, l&apos;affaire sera portée devant le tribunal de Paris.
        </Text>
      </View>
    </Page>
  </Document>
);
