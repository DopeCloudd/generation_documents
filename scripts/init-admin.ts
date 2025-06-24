import { initDefaultAdmin } from "@/lib/user"

// Initialiser l'utilisateur admin par défaut
initDefaultAdmin()
  .then(() => {
    console.log("Initialisation terminée")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Erreur lors de l'initialisation:", error)
    process.exit(1)
  })
