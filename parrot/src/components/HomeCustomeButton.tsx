import { Button } from "@/components/ui/button";

interface customeProps {
    btnText: string,
    icon : JSX.Element
}

export default function HomeCustomeButton({btnText, icon}: customeProps) {
  return (
    <Button className="w-64 h-28 text-xl font-bold gap-3 bg-secondary font-jura rounded-2xl">
          {icon}
          {btnText}
    </Button>
  )
}
