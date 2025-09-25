"use client"
import { useUser } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppSidebar } from "./_components/AppSideBar";
import AppHeader from "./_components/AppHeader";
import { AiModelsProvider } from "./contexts/AiModelsContext";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { AiSelectedModelContext } from "./contexts/AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModelsShared";
import { UserDetailContext } from "./contexts/UserDetailContext";

function Provider({ children, ...props }) {
  const {user} = useUser();
  const [aiSelectedModels,setAiSelectedModels] = useState(DefaultModel)
  const [userDetail, setUserDetail] = useState()
  useEffect(() => {
    if(user){
      CreateNewUser();
    }
  }, [user])
  const CreateNewUser = async() => {
    //If user exist?
    const userRef = doc(db,"users",user?.primaryEmailAddress?.emailAddress);
    const userSnap = await getDoc(userRef)

    if(userSnap.exists()) {
      console.log('Existing User')
      const userInfo = userSnap.data();
      setAiSelectedModels(userInfo?.AiSelectedModelContext)
      setUserDetail(userInfo)
      return
    } else {
      const userData = {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date(),
        reminaingMsg: 5, // Only for Free users
        plan: 'Free',
        credits: 1000 // Paid User
      }
      await setDoc(userRef, userData);
      console.log("New User data saved")
      setUserDetail(userData)
    }
  }
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <AiSelectedModelContext.Provider value={{aiSelectedModels,setAiSelectedModels}}>
      <AiModelsProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full">
            <AppHeader />
            {children}
          </div>
        </SidebarProvider>
      </AiModelsProvider>
      </AiSelectedModelContext.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}

export default Provider;
