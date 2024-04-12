"use client"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState } from "react"

type customeProps = {
    label: string,
    options: {name: string, icon?: JSX.Element, href?:string, blankTarget?: boolean}[]
}

export function Dropdown({label, options,}:customeProps) {
  const [position, setPosition] = useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="w-20 h-8 text-sm md:w-28 md:h-10 ">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-secondary-foreground border-none">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition} className="m-1">
            {options.map((option)=>{
                return (
                    <Link href={`${option.href}`} target={option.blankTarget?'_blank':'_top'}>
                      <DropdownMenuItem className="gap-3">
                                {option.icon}
                                {option.name}
                      </DropdownMenuItem>
                    </Link>
                )
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
