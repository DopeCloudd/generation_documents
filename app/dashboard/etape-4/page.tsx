import { FormStep4 } from "@/components/forms/form-step4";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Step4Page() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Étape 4 : Réfèrencement EDOF
        </h1>
        <p className="text-muted-foreground">
          Finalisez la création de votre entreprise et générez tous les
          documents
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Procédure à suivre :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 1. Déposer la demande en ligne */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              1. Déposer la demande en ligne
            </h2>
            <p>
              Accédez au formulaire sur le lien suivant :{" "}
              <a
                href="https://of.moncompteformation.gouv.fr/espace-public/demande-acces-edof"
                target="_blank"
                className="text-primary underline"
              >
                👉 Formulaire EDOF
              </a>
            </p>
            <p className="text-muted-foreground">
              🔹 Conseil : sur votre site internet, pensez à ajouter des photos
              de vos locaux/bureaux.
            </p>
          </div>

          {/* 2. Préparer les documents */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold">
              2. Préparer les documents suivants (tous datés de moins de 3 mois)
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kbis</li>
              <li>
                Pièce d&apos;identité du/de la gérant(e) en cours de validité
              </li>
              <li>RIB comportant le BIC</li>
              <li>Extrait de casier judiciaire B3</li>
              <li>Déclaration de non-condamnation et de filiation</li>
            </ul>
            <p className="text-muted-foreground">
              ⏱️ Remplir le formulaire en ligne prend environ 2 heures, si vous
              avez tous les documents prêts.
            </p>
          </div>

          <Separator />

          {/* Après le dépôt */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              3. Après le dépôt de la demande
            </h2>
            <p>
              Une fois la demande envoyée, un délai d’instruction de 2 mois
              commence à courir. En général, environ 10 jours plus tard, vous
              recevez un e-mail vous demandant de fournir des pièces
              complémentaires.
            </p>
            <p>
              ⚠️ Le délai des 2 mois est alors suspendu jusqu’à réception des
              justificatifs.
              <br />⏳ Vous avez 8 jours ouvrables pour transmettre les
              documents demandés.
            </p>
            <h3 className="text-base font-semibold">
              Pièces complémentaires généralement demandées :
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Copie de la lettre d’accueil adressée par le SIE</li>
              <li>Business plan</li>
              <li>
                Attestation de vigilance URSSAF au nom de l’organisme
                <br />
                🔹 Si vous n’avez pas de salarié, vous devez faire une demande
                de non-inscription auprès de l’URSSAF. Il est parfois nécessaire
                que le dirigeant se déplace directement pour obtenir ce
                document.
              </li>
              <li>
                Fichier listant les formateurs : noms, coordonnées, titres et
                qualités (notamment pour les bilans de compétences)
              </li>
              <li>
                Programme de formation détaillé « Bilan de compétences » (pour
                diffusion sur le CPF)
              </li>
              <li>Grille tarifaire prévue</li>
            </ul>
            <p className="text-muted-foreground">
              📎 Important : transmettre 1 PDF par document.
            </p>
          </div>

          <Separator />

          {/* Étapes suivantes */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">4. Étapes suivantes</h2>
            <p>
              Après envoi des pièces justificatives, vous recevrez un nouvel
              e-mail vous invitant à :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Participer à un webinaire d’information</li>
              <li>Répondre à un quiz de validation</li>
            </ul>
          </div>

          <Separator />

          {/* Décision finale */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">5. Décision finale</h2>
            <p>
              Il ne reste ensuite qu’à attendre l’e-mail contenant la décision
              finale d’acceptation ou de refus du référencement sur EDOF.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <FormStep4 />
        </CardContent>
      </Card>
    </div>
  );
}
