"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme } = useTheme()

  return (
    <div className="">
      <h2 className="">Hello Daniel</h2>
      <Button>Susbcribe</Button>
      <Button onClick={() => setTheme('dark')}>Dark</Button>
      <Button onClick={() => setTheme('light')}>Light</Button>
    </div>
  );
}
