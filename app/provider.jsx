import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSideBar";

function Provider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
      {children}
      </SidebarProvider>
    </NextThemesProvider>
  );
}

export default Provider;
