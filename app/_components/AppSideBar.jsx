"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Lock, Zap } from "lucide-react"; // ← Agregar Lock
import Image from "next/image";
import { useTheme } from "next-themes";
import { useAiModels } from "../contexts/AiModelsContext";
import { Switch } from "@/components/ui/switch";
import UsageCreditProgress from "./UsageCreditProgress";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { aiModelList, toggleModel } = useAiModels();

  const handleToggle = (modelName, enabled) => {
    toggleModel(modelName, enabled);
  };

  // Contar modelos no premium activos para deshabilitar el último
  const nonPremiumEnabledCount = aiModelList.filter(model => 
    model.enable && !model.premium
  ).length;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/logoipsum-403.svg"
                alt="logo"
                width={60}
                height={60}
                className="w-[40px] h-[40px]"
              />
              <h2 className="font-bold">Ai Fusion</h2>
            </div>
            <div>
              {theme == "light" ? (
                <Button
                  className="border rounded-3xl"
                  variant={"ghost"}
                  onClick={() => setTheme("dark")}
                >
                  <Sun />
                </Button>
              ) : (
                <Button
                  className="border rounded-3xl"
                  onClick={() => setTheme("light")}
                >
                  <Moon />
                </Button>
              )}
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <section>
            <h1 className="mb-2 text-lg font-semibold">Models</h1>
            {aiModelList.map((model, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between py-3 px-3 rounded-xl transition-colors ${
                  model.premium 
                    ? "opacity-60 cursor-not-allowed" 
                    : "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={model.icon}
                    alt={model.model}
                    width={24}
                    height={24}
                    className="rounded-md"
                  />
                  <span className="text-1xl font-medium text-gray-800 dark:text-gray-200">
                    {model.model}
                  </span>

                  {model.premium && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Premium
                    </span>
                  )}
                </div>
                
                {/* SWITCH MEJORADO */}
                {model.premium ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Lock size={16} />
                    
                  </div>
                ) : (
                  <Switch 
                    checked={model.enable}
                    onCheckedChange={(checked) => handleToggle(model.model, checked)}
                    disabled={
                      // Deshabilitar si es el último modelo activo
                      nonPremiumEnabledCount <= 1 && model.enable
                    }
                  />
                )}
              </div>
            ))}
          </section>
        </SidebarGroup>
        <SidebarGroup>
          <div className="p-3">
            <h2 className="font-bold text-lg">Chat</h2>
            <p className="text-sm text-gray-400">
              Sign in to start chating with multiple AI model
            </p>
            <Button className="mt-7 w-full rounded-4xl" size="lg">
            + New Chat
          </Button>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <section className="">
          <UsageCreditProgress />
          <Button className={'w-full mb-3 rounded-3xl'}><Zap />Upgrade Plan</Button>
        </section>
      </SidebarFooter>
    </Sidebar>
  );
}