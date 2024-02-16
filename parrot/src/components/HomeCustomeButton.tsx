import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface customeProps {
    btnText: string,
    icon : ReactNode
}

export default function HomeCustomeButton({btnText, icon}: customeProps) {
  return (
    <Button className="w-64 h-28 text-xl font-bold text-[#BCBCBC] font-jura bg-[#5E575D] hover:bg-[#706d70] justify-around rounded-2xl">
        {icon}
        {btnText}
    </Button>
  )
}
