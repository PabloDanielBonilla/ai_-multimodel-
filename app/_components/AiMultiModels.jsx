"use client";
import { useAiModels } from "../contexts/AiModelsContext"; // ← IMPORTAR EL CONTEXT
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Lock } from "lucide-react";
import { useContext } from "react";
import { AiSelectedModelContext } from "../contexts/AiSelectedModelContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig"; 
import { useUser } from "@clerk/nextjs";

function AiMultiModels() {
  const { user } = useUser();
  const { aiSelectedModels, setAiSelectedModels } = useContext(
    AiSelectedModelContext
  );
  const { enabledModels, aiModelList, toggleModel } = useAiModels();
  const handleToggle = (modelName, enabled) => {
    toggleModel(modelName, enabled);
  };
  const nonPremiumEnabledCount = aiModelList.filter(
    (model) => model.enable && !model.premium
  ).length;

  const onSelectedValue = async (parentModel, value) => {
    setAiSelectedModels((prev) => ({
      ...prev,
      [parentModel]: {
        modelId: value,
      },
    }));
    // Uptade to FireBase Database
    const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
    await updateDoc(docRef, {
      selectedModelPref: aiSelectedModels
    })
  };

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
              <Select
                defaultValue={aiSelectedModels[model.model].modelId}
                onValueChange={(value) => onSelectedValue(model.model, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    placeholder={aiSelectedModels[model.model].modelId}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="px-3">
                    <SelectLabel>Free</SelectLabel>
                    {model.subModel.map(
                      (subModel, i) =>
                        subModel.premium == false && (
                          <SelectItem key={i} value={subModel.id}>
                            {subModel.id}
                          </SelectItem>
                        )
                    )}
                  </SelectGroup>
                  <SelectGroup className="px-3">
                    <SelectLabel>Premiun</SelectLabel>
                    {model.subModel.map(
                      (subModel, i) =>
                        subModel.premium == true && (
                          <SelectItem
                            key={i}
                            value={subModel.name}
                            disabled={subModel.premium}
                          >
                            {subModel.name}{" "}
                            {subModel.premium && <Lock className="h-4 w-4" />}
                          </SelectItem>
                        )
                    )}
                  </SelectGroup>
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
                onCheckedChange={(checked) =>
                  handleToggle(model.model, checked)
                }
                // Deshabilitar si es el último modelo no premium
                disabled={nonPremiumEnabledCount <= 1 && model.enable}
              />
            )}
          </div>

          <div className="flex-1 p-4">{/* Contenido del modelo */}</div>
        </div>
      ))}
    </section>
  );
}

export default AiMultiModels;
