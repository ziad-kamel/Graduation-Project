"use client" // made this because we can only use useState in the client component default component in next.js is server component
import logo from "@/assets/logo.png"
import AddEditNoteDialog from "@/components/AddEditNoteDialog"
import ThemeToggleButton from "@/components/ThemeToggleButton"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"
export default function NavBar(){
    const {theme} = useTheme()
  // we want to render the message when we use Add Note button in navbar
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)


return (
  <div>
<div className="p-4 shadow">
  
  <div className="max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between">
    <Link href="/notes" className="flex items-center gap-1">
    <Image  src={logo} alt="MindSpark logo" width={40} height={40} ></Image>
    <span className="font-medium text-white">MindSpark</span>
    </Link>
   <div className="flex items-center gap-2">
    <UserButton afterSignOutUrl="/"
    appearance={{
      baseTheme: (theme === "dark" ? dark: undefined),
      elements: {avatarBox:{width:"2.5rem", height:"2.5rem"}}
    }}    
    />

    <ThemeToggleButton />

    <Button className="font-semibold" onClick={()=> setShowAddEditNoteDialog(true)}>
      <Plus size={20} className="mr-2" />
      Add Note
    </Button>
    
   </div>
  </div>
  </div>
  <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setShowAddEditNoteDialog} />

  </div>
)
}