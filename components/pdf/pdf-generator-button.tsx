"use client";

import { PDFPreview } from "@/components/pdf/pdf-preview";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

interface PDFGeneratorButtonProps {
  formData: any;
  label?: string;
  className?: string;
  showPreview?: boolean;
}

export function PDFGeneratorButton({
  formData,
  label = "Générer les statuts",
  className = "",
  showPreview = true,
}: PDFGeneratorButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const handleGeneratePDF = async (preview = false) => {
    try {
      setIsGenerating(true);

      // Envoyer les données au serveur
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Échec de la génération du PDF");
      }

      // Récupérer le PDF
      const blob = await response.blob();
      setPdfBlob(blob);

      if (preview) {
        setShowPdfPreview(true);
      } else {
        // Créer un URL pour le blob
        const url = window.URL.createObjectURL(blob);

        // Créer un lien pour télécharger le PDF
        const link = document.createElement("a");
        link.href = url;
        link.download = `statuts-${
          formData.companyName?.toLowerCase().replace(/\s+/g, "-") || "societe"
        }.pdf`;

        // Ajouter le lien au document
        document.body.appendChild(link);

        // Cliquer sur le lien
        link.click();

        // Supprimer le lien
        document.body.removeChild(link);

        // Libérer l'URL
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {showPreview ? (
          <>
            <Button
              onClick={() => handleGeneratePDF(true)}
              disabled={isGenerating}
              className={className}
              variant="outline"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Aperçu
                </>
              )}
            </Button>
            <Button
              onClick={() => handleGeneratePDF(false)}
              disabled={isGenerating}
              className={className}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </>
              )}
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleGeneratePDF(false)}
            disabled={isGenerating}
            className={className}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                {label}
              </>
            )}
          </Button>
        )}
      </div>

      {showPdfPreview && pdfBlob && (
        <PDFPreview
          pdfBlob={pdfBlob}
          onClose={() => setShowPdfPreview(false)}
        />
      )}
    </>
  );
}
