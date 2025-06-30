"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormStep3() {
  const [formType, setFormType] = useState<"AF" | "BC" | "VAE">("BC");

  return (
    <div className="space-y-6">
      {/* Sélecteur de type */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Type de formulaire
        </label>
        <Select
          value={formType}
          onValueChange={(value) => setFormType(value as "AF" | "BC" | "VAE")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choisissez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AF">AF</SelectItem>
            <SelectItem value="BC">BC</SelectItem>
            <SelectItem value="VAE">VAE</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Affichage conditionnel du formulaire */}
      {formType === "AF" && (
        <div>
          {/* Ton formulaire pour AF ici */}
          <FormAF />
        </div>
      )}

      {formType === "BC" && (
        <div>
          {/* Ton formulaire pour BC ici */}
          <FormBC />
        </div>
      )}

      {formType === "VAE" && (
        <div>
          {/* Ton formulaire pour VAE ici */}
          <FormVAE />
        </div>
      )}
    </div>
  );
}

function FormAF() {
  return (
    <div>
      <p className="text-gray-600">Formulaire spécifique pour AF</p>
      {/* Ajoute les champs spécifiques pour AF ici */}
    </div>
  );
}

function FormBC() {
  return (
    <div>
      <p className="text-gray-600">Formulaire spécifique pour BC</p>
      {/* Ajoute les champs spécifiques pour BC ici */}
    </div>
  );
}

function FormVAE() {
  return (
    <div>
      <p className="text-gray-600">Formulaire spécifique pour VAE</p>
      {/* Ajoute les champs spécifiques pour VAE ici */}
    </div>
  );
}
