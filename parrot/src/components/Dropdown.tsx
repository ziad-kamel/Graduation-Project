"use client"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useState } from "react"

type customeProps = {
    label: string,
    options: {name: string, icon?: JSX.Element, href?:string, blankTarget?: boolean}[]
}

export function Dropdown({label, options,}:customeProps) {

  const [position, setPosition] = useState("bottom")
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default"  size="sm">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-secondary-foreground border-none">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="m-1">
            {options.map(async (option)=>{
                return (
                      <DropdownMenuItem className="gap-3" onClick={() => router.push(option.href!)} key={option.name}>
                                {option.icon}
                                {option.name}
                      </DropdownMenuItem>
                )
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
