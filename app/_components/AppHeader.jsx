import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "lucide-react";

function AppHeader() {
  return (
    <div className="p-3 w-full shadow flex justify-between items-center">
      <div className="flex gap-3 items-center">
      <SidebarTrigger />
      <Image src="/logoipsum-403.svg" alt="logo" width={60} height={60}
      className="w-[20px] h-[20px]" />
      <p className="font-bold">Ai Fusion</p>
      </div>
      <Button>Sign in</Button>
    </div>
  );
}

export default AppHeader;
