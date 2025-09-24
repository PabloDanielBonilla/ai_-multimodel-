"use client";
import { useAiModels } from "../contexts/AiModelsContext"; // ← IMPORTAR EL CONTEXT
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Lock } from "lucide-react"; // ← Agregar Lock

function AiMultiModels() {
  // USAR EL CONTEXT EN LUGAR DEL ESTADO LOCAL
  const { enabledModels, aiModelList, toggleModel } = useAiModels();

  const handleToggle = (modelName, enabled) => {
    toggleModel(modelName, enabled);
  };

  // Contar modelos activos NO premium para las validaciones
  const nonPremiumEnabledCount = aiModelList.filter(model => 
    model.enable && !model.premium
  ).length;

  // Si no hay modelos activos, mostrar mensaje
  if (enabledModels.length === 0) {
    return (
      <section className="flex flex-1 h-[75vh] border-b items-center justify-center">
        <div className="text-center text-gray-500">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold">No hay modelos activos</h3>
          <p>Activa al menos un modelo desde el sidebar para comenzar</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 h-[80vh] border-b">
      {enabledModels.map((model) => (
        <div 
          key={model.model} 
          className="flex flex-col border-r h-full overflow-auto flex-1 min-w-0"
          style={{ maxWidth: `${100 / Math.max(1, enabledModels.length)}%` }}
        >
          <div className="flex w-full h-[70px] items-center justify-between border-b p-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />
              <Select defaultValue={model.subModel[0]?.name}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={model.subModel[0]?.name} />
                </SelectTrigger>
                <SelectContent>
                  {model.subModel.map((subModel, index) => (
                    <SelectItem key={index} value={subModel.name}>
                      {subModel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* SWITCH MEJORADO */}
            {model.premium ? (
              <div className="flex items-center gap-2 text-gray-400">
                <Lock size={16} />
                <span className="text-xs">Premium</span>
              </div>
            ) : (
              <Switch 
                checked={model.enable} 
                onCheckedChange={(checked) => handleToggle(model.model, checked)}
                // Deshabilitar si es el último modelo no premium
                disabled={nonPremiumEnabledCount <= 1 && model.enable}
              />
            )}
          </div>
          
          <div className="flex-1 p-4">
            {/* Contenido del modelo */}
          </div>
        </div>
      ))}
    </section>
  );
}

export default AiMultiModels;