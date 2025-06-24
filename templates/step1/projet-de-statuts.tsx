import { Step1FormData } from "@/lib/form-schemas/step1Schema";
import { numberToWordsFr } from "@/utils/convert";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Définition des styles
const styles = StyleSheet.create({
  page: {
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
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
  indent: {
    marginLeft: 20,
  },
  signature: {
    marginTop: 40,
    textAlign: "center",
  },
});

export const ProjetDeStatutsTemplate = ({ data }: { data: Step1FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.title}>{data.companyName.toUpperCase()}</Text>
        <Text style={styles.subtitle}>{data.companyLegalForm}</Text>
        <Text style={styles.subtitle}>
          au capital de {data.companyCapital} €
        </Text>
        <Text style={styles.subtitle}>Siège social :</Text>
        <Text style={styles.subtitle}>{data.address},</Text>
        <Text style={styles.subtitle}>
          {data.companyPostalCode}, {data.companyCity}
        </Text>
        <Text style={styles.subtitle}>
          RCS {data.rcsName.toUpperCase()} : En cours
        </Text>
      </View>

      {/* Titre principal */}
      <View style={styles.section}>
        <Text style={[styles.title, styles.center]}>CREATION DE STATUTS</Text>
      </View>

      {/* Section soussigné */}
      <View style={styles.section}>
        <Text style={[styles.bold]}>
          {data.civility === "Mr" ? "LE SOUSSIGNÉ :" : "LA SOUSSIGNÉE :"}{" "}
        </Text>
        <Text style={styles.paragraph}>
          • {data.civility} {data.firstName} {data.lastName.toUpperCase()},
        </Text>
        <Text style={styles.paragraph}>
          né le {data.birthDate} à {data.birthPlace.toUpperCase()},
        </Text>
        <Text style={styles.paragraph}>
          de nationalité {data.nationality.toUpperCase()},
        </Text>
        <Text style={styles.paragraph}>demeurant à :</Text>
        <Text style={styles.paragraph}>{data.address}</Text>
      </View>
    </Page>

    {/* Page 2 - Statuts */}
    <Page size="A4" style={styles.page}>
      <Text style={[styles.title, styles.center]}>STATUTS</Text>

      {/* Article 1 */}
      <Text style={styles.articleTitle}>Article 1 : FORME</Text>
      <Text style={styles.paragraph}>
        La société est constituée sous la forme de {data.companyLegalForm} qui
        sera régie par les présents statuts et les lois et décrets en vigueur,
        ces textes étant codifiés au sein du Code de Commerce.
      </Text>

      {/* Article 2 */}
      <Text style={styles.articleTitle}>Article 2 : OBJET</Text>
      <Text style={styles.paragraph}>
        La société a pour objet, directement ou indirectement, en France et à
        l&apos;étranger
      </Text>
      <Text style={[styles.paragraph, styles.center, styles.bold]}>
        « {data.companyActivity} »
      </Text>
      <Text style={styles.paragraph}>
        Cet objet peut être étendu à tout autre domaine de l&apos;activité
        humaine par décision de de l&apos;associé unique, sans que cette
        décision puisse, en aucun cas, être considérée comme constitutive de
        société nouvelle, l&apos;extension de l&apos;objet social étant, dès
        maintenant, dans l&apos;intention des parties.
      </Text>

      {/* Article 3 */}
      <Text style={styles.articleTitle}>Article 3 : DÉNOMINATION</Text>
      <Text style={styles.paragraph}>
        La dénomination sociale est : « {data.companyName.toUpperCase()} »
      </Text>
      <Text style={styles.paragraph}>
        Tous les actes et documents émanant de la société et destinés aux tiers,
        notamment les lettres, factures, publications diverses, doivent indiquer
        la dénomination sociale, précédée ou suivie immédiatement et lisiblement
        des mots « SOCIETE PAR ACTIONS SIMPUFIEE UNIPERSONNELLE» ou des
        initiales « S.A.S.U », de l&apos;énonciation du montant du capital
        social et du numéro d&apos;immatriculation de la société au Registre du
        Commerce et des Sociétés.
      </Text>

      {/* Article 4 */}
      <Text style={styles.articleTitle}>Article 4 : SIEGE SOCIALE</Text>
      <Text style={styles.paragraph}>
        Le siège social est fixé, {data.companyAddress},{" "}
        {data.companyPostalCode}, {data.companyCity.toUpperCase()}.
      </Text>
      <Text style={styles.paragraph}>
        Il pourra être transféré en tout autre endroit en France par simple
        décision du Président ;
      </Text>

      {/* Article 5 */}
      <Text style={styles.articleTitle}>Article 5 : DURÉE</Text>
      <Text style={styles.paragraph}>
        La durée de la société est fixée à quatre-vingt-dix-neuf (99) années à
        compter de la date de son immatriculation au Registre du Commerce et des
        Sociétés, sauf les cas de dissolution anticipée ou de prorogation prévus
        aux statuts.
      </Text>

      {/* Article 6 */}
      <Text style={styles.articleTitle}>Article 6 : APPORTS</Text>
      <Text style={styles.paragraph}>
        L&apos;associé unique apporte et verse à la société une somme totale de{" "}
        {data.companyCapital}€ ({numberToWordsFr(data.companyCapital)} euros) au
        crédit d&apos;un compte ouvert au nom de la société en formation auprès
        d&apos;une banque.
      </Text>
      <Text style={styles.paragraph}>
        Cette somme sera retirée par le gérant de la société sur présentation du
        certificat du Greffe du Tribunal de Commerce attestant de
        l&apos;immatriculation de la société au Registre du Commerce et des
        Sociétés.
      </Text>
    </Page>

    {/* Page 3 - Suite des articles */}
    <Page size="A4" style={styles.page}>
      {/* Article 7 */}
      <Text style={styles.articleTitle}>Article 7 : CAPITAL SOCIAL</Text>
      <Text style={styles.paragraph}>
        Le capital de la société est fixé à la somme de {data.companyCapital}€ (
        {numberToWordsFr(data.companyCapital)} euros), montant des apports en
        numéraire ci- dessous énoncés.
      </Text>
      <Text style={styles.paragraph}>
        Il est divisé en {data.shareCount} ({numberToWordsFr(data.shareCount)})
        parts sociales de chacune {data.priceByShare} (
        {numberToWordsFr(data.priceByShare)}) euros de valeur nominale,
        numérotées de 1 à {data.shareCount} et toutes attribuées à
        l&apos;associé unique, {data.civility} {data.firstName} {data.lastName}.
      </Text>
      <Text style={styles.paragraph}>
        Conformément à loi, l&apos;associé unique soussigné déclare expressément
        que les {data.shareCount} parts sociales présentement créées sont
        souscrites en totalité par lui, et entièrement libérées.
      </Text>

      {/* Article 8 */}
      <Text style={styles.articleTitle}>
        Article 8 : AUGMENTATION - RÉDUCTION DU CAPITAL SOCIAL - COMPTES
        COURANTS
      </Text>
      <Text style={styles.paragraph}>
        Le capital social peut être augmenté ou réduit par une décision
        extraordinaire de de l&apos;associé unique suivant les modalités prévues
        par les articles L 223-32 à L 223-34 du Code de Commerce.
      </Text>
      <Text style={styles.paragraph}>
        Le capital social et la valeur nominale des parts sociales ne peuvent
        être réduits en dessous du minimum fixé par la loi, s&apos;il en est.
      </Text>
      <Text style={styles.paragraph}>
        Chaque associé s&apos;il le désire, mais avec le consentement des autres
        associés, pourra verser des sommes en compte courant dans la caisse
        sociale pour servir à la trésorerie de la société. Ces sommes ne
        pourront être retirées qu&apos;après accord de la majorité de
        l&apos;associé unique.
      </Text>

      {/* Article 9 */}
      <Text style={styles.articleTitle}>
        Article 9 : REPRÉSENTATION DES PARTS SOCIALES
      </Text>
      <Text style={styles.paragraph}>
        Les parts sociales ne peuvent être représentées par des titres
        négociables. De plus, il est interdit à la société d&apos;émettre des
        valeurs mobilières.
      </Text>
      <Text style={styles.paragraph}>
        Les droits de chaque associé dans la société résultent seulement des
        présentes, des actes modificatifs ultérieurs et des cessions de parts
        régulièrement signifiées et publiées. Chaque associé peut se faire
        délivrer, à ses frais, des copies ou des extraits des statuts et des
        actes modificatifs, ainsi qu&apos;il sera dit ci-après.
      </Text>

      {/* Article 10 */}
      <Text style={styles.articleTitle}>
        Article 10 : CESSION DES PARTS SOCIALES
      </Text>
      <Text style={styles.paragraph}>
        Les parts sociales ne peuvent être cédées aux conjoints, ascendants et
        descendants d&apos;un associé et aux tiers qu&apos;avec le consentement
        de l’associé unique comme il est dit ci-après. Elles sont librement
        cessibles entre associés.
      </Text>
      <Text style={styles.paragraph}>
        La mutation des parts, qu&apos;elle soit volontaire ou forcée, à titre
        gratuit ou onéreux, consécutive à des apports à des personnes morales,
        même par voie de fusion, scission ou opérations assimilées, est soumise
        à l&apos;agrément de l’associé unique.
      </Text>
      <Text style={styles.paragraph}>
        La mutation soumise à l&apos;agrément est notifiée à la société et aux
        autres associés par lettre recommandée avec avis de réception. Cette
        notification doit comporter tous les renseignements nécessaires à une
        parfaite connaissance de l&apos;opération projetée et une parfaite
        identification de son ou de ses bénéficiaires. Elle doit comporter le
        projet d&apos;acte de cession.
      </Text>
      <Text style={styles.paragraph}>
        À compter de la date de réception de cette notification, l&apos;un des
        gérants dispose d&apos;un délai de huit jours pour convoquer une
        assemblée générale extraordinaire à l&apos;effet de se prononcer sur la
        mutation projetée, ou consulter chacun l’associé unique par écrit.
      </Text>
      <Text style={styles.paragraph}>
        L&apos;agrément est acquis lorsque la majorité en nombre de l’associé
        unique représentant au moins les trois quarts des parts sociales
        s&apos;est déclarée favorable à la cession envisagée, ou que la société
        n&apos;a pas fait connaître la position de l’associé unique dans le
        délai de trois mois à compter de la dernière des notifications prévues.
      </Text>
      <Text style={styles.paragraph}>
        La mutation, dès qu&apos;elle aura été agréée, pourra être régularisée.
      </Text>
      <Text style={styles.paragraph}>
        Si les associés ont refusé de consentir à la cession, et que le cédant
        ne renonce pas à la cession, les associés sont tenus, dans les trois
        mois à compter de ce refus, d&apos;acquérir ou de faire acquérir les
        parts à un prix payé comptant et fixé conformément aux dispositions de
        l&apos;article 1843-4 du Code Civil. À la demande du Gérant, ce délai
        peut être prolongé une seule fois par ordonnance de Monsieur le
        Président du Tribunal de Commerce statuant sur requête, sans que cette
        prolongation puisse excéder six mois. La société peut également avec le
        consentement de l&apos;associé cédant, décider dans le même délai, de
        réduire son capital du montant de la valeur nominale des parts de cet
        associé et de racheter ces parts au prix déterminé conformément à
        l&apos;article 1843-4 du Code Civil. Par dérogation à l&apos;article L
        223-14 du Code de Commerce, un délai de paiement qui ne saurait excéder
        un an peut, sur justification, être accordé à la société par ordonnance
        du Président du Tribunal de Commerce du lieu du siège social, statuant
        en référé ; les sommes dues portent alors un intérêt au taux légal.
      </Text>
      <Text style={styles.paragraph}>
        Si, à l&apos;expiration du délai imparti, aucune des solutions prévues
        au présent article n&apos;est intervenue, l&apos;associé peut réaliser
        la cession initialement prévue, à moins qu&apos;il ne détienne ses parts
        depuis moins de deux ans.
      </Text>

      {/* Article 11 */}
      <Text style={styles.articleTitle}>
        Article 11 : TRANSMISSION DES PARTS SOCIALES PAR DÉCÈS OU LIQUIDATION DE
        COMMUNAUTÉ
      </Text>
      <Text style={styles.paragraph}>
        La société n&apos;est pas dissoute par le décès d&apos;un associé. En
        revanche, les ayants-droits de l&apos;associé décédé ne deviennent
        associés que sur agrément des autres associés, tel que prévus à
        l&apos;article 10.
      </Text>
      <Text style={styles.paragraph}>
        En cas de liquidation, par suite de divorce, séparation de corps,
        séparation judiciaire ou changement de régime matrimonial de la
        communauté légale ou conventionnelle de biens ayant existé entre une
        personne associée et son conjoint, chacun des conjoints ou ex-conjoints
        exerce les droits que lui confère la loi sur les parts communes, sans
        préjudice du droit, pour la Gérance, de requérir du rédacteur de
        l&apos;acte de liquidation, un extrait de cet acte mentionnant ces
        attributions. Tant que l&apos;acte de liquidation n&apos;aura pas été
        produit à la gérance, les droits attachés aux parts resteront exercés
        par l&apos;époux qui, avant la dissolution, avait la qualité
        d&apos;associé à l&apos;égard de la société. La liquidation ne peut
        attribuer les parts sociales au conjoint de l&apos;associé que sous
        réserve de l&apos;agrément de l’associé unique prévus à l&apos;article
        10.
      </Text>

      {/* Article 12 */}
      <Text style={styles.articleTitle}>
        Article 12 : INDIVISIBILITÉ DES PARTS
      </Text>
      <Text style={styles.paragraph}>
        Les parts sociales sont indivisibles à l&apos;égard de la société qui ne
        reconnaît qu&apos;un seul propriétaire pour chacune d&apos;elles. Les
        copropriétaires indivis sont tenus de désigner l&apos;un d&apos;entre
        eux pour les représenter auprès de la société. À défaut d&apos;entente,
        il appartient à l&apos;indivisaire le plus diligent de faire désigner
        par justice un mandataire chargé de les représenter.
      </Text>
      <Text style={styles.paragraph}>
        Dans le cas où la majorité par tête est requise pour la validité des
        décisions collectives, l&apos;indivision est comptée pour une seule
        tête.
      </Text>
      <Text style={styles.paragraph}>
        L&apos;usufruitier représente valablement le nu-propriétaire à
        l&apos;égard de la société, dans les décisions ordinaires, et le
        nu-propriétaire représente l&apos;usufruitier dans les décisions
        extraordinaires.
      </Text>

      {/* Article 13 */}
      <Text style={styles.articleTitle}>
        Article 13 : DROIT DE L’ASSOCIÉ UNIQUE - RESPONSABILITÉ
      </Text>
      <Text style={styles.paragraph}>
        Chaque part donne droit à une fraction des bénéfices et de l&apos;actif
        social proportionnellement au nombre de parts existantes.
      </Text>
      <Text style={styles.paragraph}>
        Les droits et obligations attachés aux parts sociales les suivent dans
        quelque main qu&apos;elles passent. La propriété d&apos;une part emporte
        de plein droit adhésion aux statuts de la société et aux résolutions
        régulièrement prises par les associés. Les représentants, ayants droit,
        héritiers et conjoint d&apos;un associé ne peuvent, sous aucun prétexte
        que ce soit, requérir l&apos;apposition de scellés sur les biens et les
        valeurs de la société ni en demander le partage ou la licitation, ni
        s&apos;immiscer, en aucune manière, dans les actes de son
        administration, ils doivent, pour l&apos;exercice de leurs droits,
        s&apos;en rapporter aux inventaires sociaux et décisions régulièrement
        prises.
      </Text>
      <Text style={styles.paragraph}>
        Si la société a donné son consentement à un projet de nantissement de
        parts sociales suivant la procédure prévue à l&apos;article 10 des
        présents statuts, ce consentement emportera agrément du cessionnaire en
        cas de réalisation forcée des parts sociales nanties selon les
        conditions de l&apos;article 2078 alinéa premier du Code Civil, à moins
        que la société ne préfère, après la cession, acquérir les parts sans
        délai en vue de réduire son capital social.
      </Text>
      <Text style={styles.paragraph}>
        Tout associé a le droit, à toute époque, d&apos;obtenir au siège social,
        la délivrance d&apos;une copie certifiée conforme des statuts en vigueur
        au jour de la demande. La société doit annexer à ce document la liste
        des gérants et éventuellement des Commissaires aux Comptes en exercice.
        Elle ne peut, pour cette délivrance, exiger le paiement d&apos;une somme
        supérieure à trente centimes d&apos;euro. Les droits d&apos;information
        de l’associé unique sur les comptes sociaux et autres documents sont
        exposés sous l&apos;article 24 des présents statuts.
      </Text>
      <Text style={styles.paragraph}>
        Les associés sont solidairement responsables vis-à-vis des tiers,
        pendant cinq ans, de la valeur attribuée aux apports en nature. Sous
        réserve des dispositions des articles L 223-9 et L 223-10 du Code de
        Commerce, les associés ne sont tenus, même à! &apos;égard des tiers,
        qu&apos;à concurrence de leurs apports, sauf les exceptions prévues par
        la loi. Au-delà, tout appel de fonds est interdit.
      </Text>

      {/* Article 14 */}
      <Text style={styles.articleTitle}>
        Article 14 : DÉCÈS - INTERDICTION - FAILLITE - DÉCONFITURE D&apos;UN
        ASSOCIÉ
      </Text>
      <Text style={styles.paragraph}>
        La société n&apos;est pas dissoute par le décès, l&apos;interdiction, la
        faillite ou la déconfiture d&apos;un associé
      </Text>

      {/* Article 15 */}
      <Text style={styles.articleTitle}>Article 15 : NOMINATION</Text>
      <Text style={styles.paragraph}>
        La société est représentée à l&apos;égard des tiers par un Président qui
        est soit une personne physique salariée ou non, associée ou non de la
        société, soit une personne morale associé ou non de la société.
      </Text>
      <Text style={styles.paragraph}>
        Lorsqu&apos;une personne morale est nommée Président, ses dirigeants
        sont soumis aux mêmes conditions et obligations et encourent les mêmes
        responsabilités civile et pénale que s&apos;ils étaient président en
        leur propre nom, sans préjudice de la responsabilité solidaire de la
        personne morale qu&apos;ils dirigent.
      </Text>

      {/* Article 16 */}
      <Text style={styles.articleTitle}>Article 16 : POUVOIR DU PRESIDENT</Text>
      <Text style={styles.paragraph}>
        Dans les rapports avec les tiers, le président représente la société et
        est investi des pouvoirs les plus étendus pour agir en toute
        circonstance au nom de la société dans les limites de son objet social.
      </Text>
      <Text style={styles.paragraph}>
        Il représente la société vis-à-vis des tiers.
      </Text>
      <Text style={styles.paragraph}>
        La société est engagée même par les actes du Président qui ne relèvent
        pas de l&apos;objet social, à moins qu&apos;elle ne prouve que le tiers
        savait que l&apos;acte dépassait cet objet ou qu&apos;il ne pouvait
        l&apos;ignorer compte tenu des circonstances, la seule publication des
        statuts ne suffisant pas à constituer cette preuve.
      </Text>
      <Text style={styles.paragraph}>
        Le président peut déléguer à toute personne de son choix certains de ses
        pouvoirs pour l&apos;exercice de fonctions spécifiques ou
        l&apos;accomplissement de certains actes.
      </Text>

      {/* Article 17 */}
      <Text style={styles.articleTitle}>
        Article 17 : ARRIVEE DU TERME-DEMISSION - REVOCATION
      </Text>
      <Text style={styles.paragraph}>
        Le Président est nommé pour une durée indéterminée.
      </Text>
      <Text style={styles.paragraph}>
        Le Président ne pourra être révoqué que pour juste motif. En cas de
        révocation le Président devra céder le cas échéant ses actions détenues.
      </Text>
      <Text style={styles.paragraph}>
        Le Président sera considéré démissionnaire à la date où il atteindra
        l&apos;âge de 80 ans révolu.
      </Text>
      <Text style={styles.paragraph}>
        Les fonctions de Président prennent fin soit par le décès, la démission,
        la révocation, l&apos;expiration de son mandat, soit par
        l&apos;ouverture à l&apos;encontre de celui-ci d&apos;une procédure de
        redressement ou de liquidation judiciaires. La collectivité de l’associé
        unique désignera un nouveau Président.
      </Text>

      {/* Article 18 */}
      <Text style={styles.articleTitle}>Article 18 : REMUNERATION</Text>
      <Text style={styles.paragraph}>
        Le Président peut recevoir une rémunération en compensation de la
        responsabilité et de la charge attachées à ses fonctions dont les
        modalités de fixation et de règlement sont déterminées par une décision
        de l’associé unique délibérant dans les conditions prévues pour les
        décisions ordinaires.
      </Text>
      <Text style={styles.paragraph}>
        En outre, le Président est remboursé de ses frais de représentation et
        de déplacement sur justification.
      </Text>
      <Text style={styles.paragraph}>
        Le Président peut être assisté par un ou plusieurs directeurs généraux
        qui sont une personne physique. Les pouvoirs du directeur général sont
        fixés par l’associé unique.
      </Text>
      <Text style={styles.paragraph}>
        Le directeur général peut-être révoqué à tout moment par décision de
        l’associé unique.
      </Text>
      <Text style={styles.paragraph}>
        Le directeur général peut recevoir une rémunération en compensation de
        la responsabilité et de la charge attachées à ses fonctions dont les
        modalités de fixation et de règlement sont déterminées par l’associé
        unique.
      </Text>

      {/* Article 19 */}
      <Text style={styles.articleTitle}>
        Article 19 : DÉCISIONS COLLECTIVES
      </Text>
      <Text style={styles.paragraph}>
        {`Les associés délibérants collectivement sont seuls compétents pour prendre les décisions suivantes :
        - Nomination, renouvellement et révocation du Président de la société;
        - Nomination et renouvellement des commissaires aux comptes;
        - Approbation des comptes sociaux annuels et affection des résultats;
      - Changements des statuts en particulier augmentation ou réduction du capital social, opérations de fusion ou d'apport partiel d'actif ou de scission, dissolution de la société, adoption ou modification de clauses relatives à l'inaliénabilité des actions, à l'agrément de toute cession d’actions;
        Ainsi que toutes autres décisions énumérées dans les présidents statuts.`}
      </Text>
      <Text style={styles.paragraph}>
        Les décisions prises conformément à la loi et aux statuts obligent tous
        les associés même absents, dissidents ou incapables.
      </Text>
      <Text style={styles.paragraph}>
        Les décisions collectives sont qualifiées d&apos;ordinaires ou
        d&apos;extraordinaires. Elles sont qualifiées d&apos;extraordinaires
        lorsqu&apos;elles ont pour objet la modification des statuts ou
        l&apos;agrément des cessions ou mutations de parts, droits de
        souscription ou d&apos;attribution. Elles sont qualifiées
        d&apos;ordinaires dans les autres cas.
      </Text>
      <Text style={styles.paragraph}>
        {`Les décisions ordinaires ont notamment pour objet :
- D’approuver, redresser ou rejeter les comptes; de décider toute affectation ou répartition de bénéfice;
- De nommer ou révoquer un président; nommer un ou plusieurs Commissaires aux Comptes; les relever de leurs fonctions;
- D’approuver ou ne pas approuver les conventions conclues entre un gérant ou un associé de la société et la société;
- Et d'une manière générale, de se prononcer sur toutes les questions qui n'emportent pas de modification aux statuts, ou agrément de cession ou mutation de parts sociales, droits de souscription ou d'attribution.`}
      </Text>
      <Text style={styles.paragraph}>
        Les décisions ordinaires ne sont valablement prises qu&apos;autant
        qu&apos;elles ont été adoptées par un ou plusieurs associés représentant
        plus de la moitié du capital social. Si, en raison d&apos;absence ou
        d&apos;abstention d&apos;associés, cette majorité n&apos;est pas obtenue
        une première fois, les associés sont consultés une seconde fois et les
        décisions sont prises à la majorité des votes émis, quelle que soit la
        proportion du capital représentée, mais ces décisions ne peuvent porter
        que sur des questions ayant fait l&apos;objet de la première
        consultation.
      </Text>
      <Text style={styles.paragraph}>
        L&apos;assemblée générale extraordinaire ne délibère valablement que si
        les associés présents ou représentés possèdent au moins, sur première
        convocation, le quart, et sur deuxième convocation, le cinquième des
        parts sociales ayant le droit de vote tel qu&apos;il est prévu
        ci-dessus. À défaut de ce dernier quorum, la deuxième assemblée peut
        être prorogée de deux mois au plus à celle à compter de la date de sa
        convocation primitive. Elle statue à la majorité des deux tiers des voix
        dont disposent les associés présents ou représentés et, dans le cas où
        il est procédé à un scrutin, les associés s&apos;étant abstenus sont
        considérés comme ayant voté contre.
      </Text>
      <Text style={styles.paragraph}>
        L&apos;agrément des cessions de parts doit être donné à la majorité de
        l’associé unique représentant au moins les trois quarts du capital
        social.
      </Text>
      <Text style={styles.paragraph}>
        D&apos;autre part, la transformation de la société en société de toute
        autre forme, notamment en société anonyme, est décidée dans les
        conditions fixées par l&apos;article L 223-43 du Code de Commerce.
      </Text>
      <Text style={styles.paragraph}>
        Les changements de nationalité de la société et l&apos;augmentation des
        engagements de l’associé unique exigent l&apos;unanimité de ceux-ci.
      </Text>

      {/* Article 20 */}
      <Text style={styles.articleTitle}>Article 20 : ASSEMBLÉES GÉNÉRALES</Text>
      <Text style={styles.paragraph}>
        Les consultations de collectivité de l’associé unique sont provoquées
        par le Président, ou en cas de carence du Président, par un mandataire
        désigné en justice, au choix du Président, soit en assemblée générale
        réunie en siège social ou en tout autre lieu indiqué sur la convocation,
        soit par consultation par correspondance, soit par téléconférence
        téléphonique ou audiovisuelle.
      </Text>
      <Text style={styles.paragraph}>
        Tout actionnaire a le droit d&apos;assister aux assemblées générales et
        de participer aux délibérations personnellement ou par mandataire, sur
        simple justification de son identité et quel que soit le nombre
        d&apos;actions qu&apos;il possède, dès lors qu&apos;elles ont été
        libérées des versements exigibles et que les actions soient inscrits
        dans le registre des mouvements de titre au moins cinq jours avant
        l&apos;assemblée.
      </Text>
      <Text style={styles.paragraph}>
        Les associés sont convoqués au moins quinze jours avant l&apos;assemblée
        par lettre recommandée ou ordinaire. Toutefois, une assemblée peut-être
        tenue sans respecter ce délai si tous les actionnaires sont présents ou
        représentés.
      </Text>
      <Text style={styles.paragraph}>
        Les actionnaires peuvent se faire représenter aux délibérations de
        l&apos;assemblée par un autre actionnaire. Un actionnaire peut avoir
        plusieurs pouvoirs. Les pouvoirs peuvent être écrits. En cas de litige,
        la charge de la preuve incombe à celui qui prévaut l&apos;irrégularité.
      </Text>
      <Text style={styles.paragraph}>
        L&apos;assemblée est présidée par le Président; à défaut,
        l&apos;assemblée élit son président de séance.
      </Text>

      {/* Article 21 */}
      <Text style={styles.articleTitle}>Article 21 : CONSULTATION ÉCRITE</Text>
      <Text style={styles.paragraph}>
        Quel qu&apos;en soit le mode, toute consultation de la collectivité de
        l’associé unique doit faire l&apos;objet d&apos;une information
        préalable comprenant l&apos;ordre du jour, le texte des résolutions et
        tous documents et informations leur permettant de se prononcer en
        connaissance de cause
      </Text>

      {/* Article 22 */}
      <Text style={styles.articleTitle}>Article 22 : PROCÈS-VERBAUX</Text>
      <Text style={styles.paragraph}>
        Les décisions collectives de l’associé unique, quel qu&apos;en soit leur
        mode, sont constatées par des procès-verbaux établis sur un registre
        spécial, ou sur des feuillets mobiles numérotés.
      </Text>
      <Text style={styles.paragraph}>
        Les procès-verbaux devront indiquer le mode, le lieu et la date de la
        consultation, l&apos;identité de l’associé unique et celle de toute
        autre personne ayant assisté à tout ou partie des délibérations, les
        documents et rapports sont soumis à discussion, un exposé des débats
        ainsi que le texte des résolutions et sous chaque résolution le résultat
        du vite.
      </Text>
      <Text style={styles.paragraph}>
        Les copies ou extraits des procès-verbaux des décisions collectives sont
        valablement certifiés par le président, ou un fondé de pouvoir habilité
        à cet effet.
      </Text>

      {/* Article 23 */}
      <Text style={styles.articleTitle}>Article 23 : EXERCICE SOCIAL</Text>
      <Text style={styles.paragraph}>
        L&apos;exercice social a une durée de douze mois qui commence le premier
        janvier pour finir le trente et un décembre de chaque année. Par
        exception, le premier exercice commencera à la date
        d&apos;immatriculation de la société au Registre du Commerce et des
        Sociétés et prendra fin le 31 décembre 2025.
      </Text>

      {/* Article 30 */}
      <Text style={styles.articleTitle}>
        Article 30 : NOMINATION DU PREMIER PRESIDENT
      </Text>
      <Text style={styles.paragraph}>
        {data.civility} {data.firstName} {data.lastName} est nommée en qualité
        de Président de la société pour une durée indéterminée.
      </Text>
      <Text style={styles.paragraph}>
        {data.civility} {data.firstName} {data.lastName} déclare accepter ce
        mandat et affirme qu&apos;il n&apos;existe aucune incapacité,
        incompatibilité ou interdiction susceptible de lui interdire
        d&apos;exercer cette mission.
      </Text>

      {/* Signature */}
      <View style={styles.signature}>
        <Text style={styles.paragraph}>Acte constitutif sous seing privé,</Text>
        <Text style={styles.paragraph}>
          Fait à {data.signaturePlace.toUpperCase()}
        </Text>
        <Text style={styles.paragraph}>Le {data.signatureDate}</Text>
        <Text style={styles.paragraph}>En quatre exemplaires originaux.</Text>
      </View>
    </Page>
  </Document>
);
