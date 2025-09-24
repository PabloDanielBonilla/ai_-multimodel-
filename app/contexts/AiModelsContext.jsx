"use client";
import { createContext, useContext, useState } from "react";
import AiModelList from "@/shared/AiModelList";

const AiModelsContext = createContext();

export function AiModelsProvider({ children }) {
  const [aiModelList, setAiModelList] = useState(
    AiModelList.map((m) => ({
      ...m,
      enable: ["GPT", "DeepSeek", "Gemini", "Grok"].includes(m.model)
    }))
  );

  const enabledModels = aiModelList.filter(model => model.enable);

  const toggleModel = (modelName, enabled) => {
    setAiModelList(prev => {
      // 1. Encontrar el modelo que queremos cambiar
      const modelToToggle = prev.find(model => model.model === modelName);
      
      // 2. SI ES PREMIUM → NO PERMITIR CAMBIOS
      if (modelToToggle.premium) {
        console.log("Modelo premium, no se puede modificar");
        return prev;
      }
      
      // 3. Contar modelos activos actuales (excluyendo premium)
      const nonPremiumEnabledModels = prev.filter(m => m.enable && !m.premium);
      const currentEnabledCount = nonPremiumEnabledModels.length;
      
      // 4. NUEVA VALIDACIÓN: No permitir desactivar si es el último modelo
      if (!enabled && currentEnabledCount <= 1) {
        console.log("No se puede desactivar el último modelo");
        return prev;
      }
      
      // 5. Si intentamos activar y ya hay 4 modelos activos, no permitir
      if (enabled && currentEnabledCount >= 4) {
        console.log("Máximo 4 modelos permitidos");
        return prev;
      }

      // 6. Actualizar el modelo específico
      return prev.map(model =>
        model.model === modelName ? { ...model, enable: enabled } : model
      );
    });
  };

  const value = {
    aiModelList,
    enabledModels,
    toggleModel
  };

  return (
    <AiModelsContext.Provider value={value}>
      {children}
    </AiModelsContext.Provider>
  );
}

export function useAiModels() {
  const context = useContext(AiModelsContext);
  if (context === undefined) {
    throw new Error("useAiModels debe usarse dentro de un AiModelsProvider");
  }
  return context;
}