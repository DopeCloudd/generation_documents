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
  page: { padding: 40, fontSize: 12, lineHeight: 1.6, fontFamily: "Inter" },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: { fontSize: 14, fontWeight: "bold", marginVertical: 8 },
  paragraph: { marginBottom: 6, textAlign: "justify" },
});

export const CGVTemplate = ({ data }: { data: Step3FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Conditions Générales de Vente</Text>

      <View>
        <Text style={styles.subtitle}>
          Article 1 - Objet et champ d’application
        </Text>
        <Text style={styles.paragraph}>
          Toute commande de formation implique l’acceptation sans réserve par
          l’acheteur et son adhésion pleine et entière aux présentes conditions
          générales de vente qui prévalent sur tout autre document de
          l’acheteur, et notamment sur toutes conditions générales d’achat.
        </Text>

        <Text style={styles.subtitle}>Article 2 - Documents contractuels</Text>
        <Text style={styles.paragraph}>
          Si le client le souhaite, {data.companyName} lui fait parvenir une
          convention de formation professionnelle continue telle que prévue par
          la loi. Le client s’engage à retourner dans les plus brefs délais à{" "}
          {data.companyName}
          un exemplaire signé et portant son cachet commercial. les attestations
          de présences peuvent être adressées au client après la formation sur
          simple demande.
        </Text>

        <Text style={styles.subtitle}>Article 3 - Prérequis</Text>
        <Text style={styles.paragraph}>
          Des prérequis peuvent être indiqués dans le programme de formation. le
          client s’engage à les respecter dans la mesure notamment où cela est
          susceptible d’affecter la qualité de la formation dispensée.
        </Text>

        <Text style={styles.subtitle}>
          Article 4 - Prix, facturation et règlements
        </Text>
        <Text style={styles.paragraph}>
          Nos prix sont établis hors taxes. Ils sont à majorer de la TVA au taux
          en vigueur. les repas ne sont pas compris dans le prix du stage. les
          frais annexes à la formation (les frais de déplacement, de séjour, de
          coursier,...) sont en sus. la facture est adressée au client après
          exécution de la prestation. En cas de paiement effectué par un
          Opérateur de Compétences (OPCO), il appartient au client de faire la
          demande de prise en charge avant le début de la formation auprès de
          l’OPCO dont il dépend. L’accord de financement doit être communiqué au
          moment de l’inscription. Même en cas de paiement total ou partiel de
          la formation par un OPCO, les repas seront directement facturés au
          client. Il lui appartient de se faire rembourser ces frais par l’OPCO.
          En cas de prise en charge partielle par l’OPCO, la différence sera
          directement facturée au client. Si l’accord de prise en charge de
          l’OPCO ne nous parvient pas au premier jour de la formation, la
          totalité des frais de formation peut éventuellement être facturée au
          client. En cas de non-règlement par l’OPCO du client, quelle qu’en
          soit la cause, la facture devient exigible auprès du client. Tout
          stage commencé est considéré comme dû dans son intégralité.
        </Text>

        <Text style={styles.subtitle}>Article 5 - Règlement</Text>
        <Text style={styles.paragraph}>
          Le règlement des factures peut s’effectuer : par chèque. Les factures
          sont payables à réception, net et sans escompte sauf autre échéance
          indiquée surla facture. Tout retard de paiement par rapport à cette
          échéance entraînera de plein droit : des frais financiers de 1,5 % par
          mois au prorata temporis, l’application d’une clause pénale égale à 20
          % du prix de vente hors taxes, l’exigibilité immédiate des factures
          non échues. {data.companyName} se réserve le droit de suspendre ou
          d’annuler les prestations en cours, sans pouvoir donner lieu à
          dommages et intérêts pour le Client. Tous droits et taxes applicables
          sont facturés en sus, conformément aux lois et règlements en vigueur.
        </Text>

        <Text style={styles.subtitle}>Article 6 - Convention de formation</Text>
        <Text style={styles.paragraph}>
          Nos factures font office de convention de formation simplifiée.
          Néanmoins, une convention de formation standard être jointe à chaque
          envoi de devis.
        </Text>

        <Text style={styles.subtitle}>Article 7 - Convocations</Text>
        <Text style={styles.paragraph}>
          {data.companyName} ne peut être tenue responsable de la non-réception
          de la convocation quel qu’en soient le ou les destinataires chez le
          client, notamment en cas d’absence du ou des stagiaires à la
          formation. Dans le doute, il appartient au client de s’assurer de
          l’inscription de ses stagiaires et de leur présence.
        </Text>

        <Text style={styles.subtitle}>
          Article 8 - Absence, report d&apos;inscription par le client
        </Text>
        <Text style={styles.paragraph}>
          Tout stage commencé est dû en totalité, de même si le participant ne
          s’est pas présenté. les remplacements de stagiaires sont admis à tout
          moment, sans frais, en communiquant par écrit le nom et les
          coordonnées du remplaçant sous réserve de remplir les conditions
          d’acceptation à la formation. Toute annulation d’inscription doit être
          signalée par téléphone et confirmée par écrit.{"\n"} • Une annulation
          intervenant plus de deux semaines avant le début du stage ne donnera
          lieu à aucune facturation.{"\n"} • Une annulation intervenant entre
          une et deux semaines avant le début du stage donnera lieu à la
          facturation au Client de 50 % du coût de la totalité du stage.{"\n"} •
          Une annulation intervenant moins d’une semaine avant le début du stage
          donnera lieu à la facturation de la totalité du coût du stage. Un
          report intervenant moins de deux semaines avant le début du stage est
          considéré comme une annulation. Cependant, si simultanément à son
          annulation, le participant se réinscrit à une formation, aucune
          indemnité forfaitaire ne sera retenue, à moins qu’il annule cette
          nouvelle participation et ce, quelle que soit la date d’annulation. Ce
          dédit ne peut en aucun cas être imputé sur le montant de la
          participation au développement de la formation professionnelle.
        </Text>

        <Text style={styles.subtitle}>
          Article 9 - Annulation d&apos;un stage par {data.companyName}
        </Text>
        <Text style={styles.paragraph}>
          {data.companyName} se réserve la possibilité d’annuler une formation
          en cas de force majeure. Sont considérés comme tels, outres les cas
          habituels de force majeure ou de cas fortuit, sans que cette liste
          soit exhaustive : la grève des transports, la maladie de
          l’intervenant, l’interruptiondes télécommunications. (...){" "}
          {data.companyName} organisera alors une nouvelle session dans les
          meilleurs délais et aucun dédommagement ne pourra être demandé. En cas
          d’impossibilité de votre part de participer à la session à la date
          ultérieurement proposée,
          {data.companyName}, vous proposera une formation équivalente. En cas
          de session Inter-entreprises notamment, {data.companyName} se réserve
          le droit d’annuler une formation si le nombre de 3 stagiaires n’est
          pas atteint ou en cas de problème technique ou logistique et ce sans
          aucun dédommagement. Dans ce cas, les stagiaires seront prévenus au
          moins une semaine avant le début du stage. De nouvelles dates ou sites
          leur seront proposés. le nombre de participants maximum est indiqué
          sur les programmes de formation.
        </Text>

        <Text style={styles.subtitle}>Article 10 - Confidentialité</Text>
        <Text style={styles.paragraph}>
          Les informations transmises et/ou échangées au cours de la formation
          sont confidentielles et ne sauraient faire l’objet de divulgation à
          des tiers.
        </Text>

        <Text style={styles.subtitle}>Article 11 - Réglement intérieur</Text>
        <Text style={styles.paragraph}>
          Le participant s’engage à respecter les conditions du règlement
          intérieur affiché sur le site, lieux de formation, dont il déclare
          avoir pris connaissance et accepter les termes.
        </Text>

        <Text style={styles.subtitle}>
          Article 12 - Informatique & libertés RGPD
        </Text>
        <Text style={styles.paragraph}>
          Les informations à caractère personnel qui sont communiquées par le
          client à {data.companyName} en application et dans l’exécution des
          commandes et/ou ventes pourront être communiquées aux partenaires
          contractuels de {data.companyName} pour les besoins des dites
          commandes. Conformément à la réglementation européenne qui est
          applicable à ces fichiers, le client peut contacter {data.companyName}{" "}
          pour s’opposer à une telle communication des informations le
          concernant. Il peut également à tout moment exercer ses droits
          d’accès, de rectification et d&apos;oubli dans le fichier de{" "}
          {data.companyName}.
        </Text>

        <Text style={styles.subtitle}>
          Article 13 - Citation & references clients
        </Text>
        <Text style={styles.paragraph}>
          Le client autorise expressément, sauf avis Contraire,{" "}
          {data.companyName} à citer son nom (enseigne commerciale et/ou raison
          socialepour les professionnels) et le travail réalisé au titre de
          référence commerciale.
        </Text>

        <Text style={styles.subtitle}>Article 14 - Loi applicable</Text>
        <Text style={styles.paragraph}>
          Les Conditions générales et tous les rapports entre {data.companyName}{" "}
          et ses clients relèvent de la loi française.
        </Text>

        <Text style={styles.subtitle}>
          Article 15 - Attribution de competences
        </Text>
        <Text style={styles.paragraph}>
          Tous litiges qui ne pourraient être réglés à l’amiable seront de la
          COMPTETENCE EXCLUSIVE DU TRIBUNAL DE COMMERCE DE PARIS quel que soit
          le siège ou la résidence du client, nonobstant pluralité de défendeurs
          ou appel en garantie. Cette clause attributive de compétence ne
          s’appliquera pas au cas de litige avec un Client non professionnel
          pour lequel les règles légales de compétence matérielle et
          géographique s’appliqueront. la présente clause est stipulée dans
          l’intérêt de la société {data.companyName} qui se réserve le droitd’y
          renoncer si bon lui semble.
        </Text>

        <Text style={styles.subtitle}>Article 16 - Election de domicile</Text>
        <Text style={styles.paragraph}>
          L’élection de domicile est faite par {data.companyName} à son siège
          social au
          {data.companyAddress}
          {", "}
          {data.companyPostalCode} {data.companyCity}.
        </Text>
      </View>
    </Page>
  </Document>
);
