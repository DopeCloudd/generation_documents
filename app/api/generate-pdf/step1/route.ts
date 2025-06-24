import { getEtape1Documents } from "@/templates/step1";
import { renderToBuffer } from "@react-pdf/renderer";
import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const rawData = await request.json();

    const zip = new JSZip();

    const templates = getEtape1Documents(rawData);

    // Ajouter chaque document au zip
    for (const template of templates) {
      // Rendre le PDF en buffer
      const pdfBuffer = await renderToBuffer(template.component);
      // Ajouter le buffer au zip
      zip.file(template.name, pdfBuffer);
    }

    // Générer le zip
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer as Buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=documents-${rawData.companyName
          .toLowerCase()
          .replace(/\s+/g, "-")}.zip`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return NextResponse.json(
      { error: "Échec de la génération du PDF" },
      { status: 500 }
    );
  }
}
