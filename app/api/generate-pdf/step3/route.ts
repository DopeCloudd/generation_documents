import { Step3FormData } from "@/lib/form-schemas/step3Schema";
import { getEtape3Documents } from "@/templates/step3";
import { renderToBuffer } from "@react-pdf/renderer";
import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const rawData: Step3FormData = await request.json();

    const zip = new JSZip();

    const templates = await getEtape3Documents(rawData);

    // Ajouter chaque document au zip
    for (const template of templates) {
      if (template.component) {
        const pdfBuffer = await renderToBuffer(template.component);
        zip.file(template.name, pdfBuffer);
      } else if (template.buffer) {
        zip.file(template.name, template.buffer);
      }
    }

    // Générer le zip
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new NextResponse(zipBuffer as Buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=qualiopi.zip`,
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
