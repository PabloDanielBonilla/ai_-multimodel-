import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

function AppHeader() {
  return (
    <div className="p-3 w-full shadow flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <SidebarTrigger />
        <Image
          src="/logoipsum-403.svg"
          alt="logo"
          width={60}
          height={60}
          className="w-[20px] h-[20px]"
        />
        <p className="font-bold">Ai Fusion</p>
      </div>
      
      {/* Estado de autenticación */}
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <Button variant="outline">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
      </SignedOut>
      
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}

export default AppHeader;