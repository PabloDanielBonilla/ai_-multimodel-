import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSideBar";
import AppHeader from "./_components/AppHeader";
import { AiModelsProvider } from "./contexts/AiModelsContext";

function Provider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AiModelsProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full">
            <AppHeader />
            {children}
          </div>
        </SidebarProvider>
      </AiModelsProvider>
    </NextThemesProvider>
  );
}

export default Provider;
