import { prisma } from "@/lib/prisma";
import { UserService } from "@/lib/user-service";

async function initDatabase() {
  try {
    console.log("Vérification de la connexion à la base de données...");

    // Tester la connexion
    await prisma.$connect();
    console.log("✅ Connexion à la base de données réussie");

    // Initialiser l'utilisateur admin par défaut
    console.log("Initialisation de l'utilisateur admin par défaut...");
    await UserService.initDefaultAdmin();
    console.log("✅ Utilisateur admin initialisé");

    console.log(
      "🎉 Initialisation de la base de données terminée avec succès!"
    );
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'initialisation de la base de données:",
      error
    );
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabase();
