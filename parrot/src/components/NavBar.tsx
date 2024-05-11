'use client'
import { UserButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { Facebook, FileAudio, Github, Instagram, Paintbrush, Speech, Text, Trello } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import parrot from '../../public/parrot.svg';
import { Dropdown } from "./Dropdown";
import ThemeToggleButton from "./ThemeToggleButton";
import { Button } from "./ui/button";
export default function NavBar() {
    const {theme} = useTheme();
    const generationDropDownOptions = [
        {name: 'Audio Cleanup', icon: <Paintbrush/>, href: '/generation/audioCleanup'},
        {name: 'Audio Generation', icon: <FileAudio />, href: '/generation/audiogeneration'},
        {name: 'Text To Speech', icon: <Text />, href: '/generation/TextToSpeech'},
        {name: 'Speech To Text', icon: <Speech />,href: '/generation/speechToText'},
    ]
    const contactsDropDownOptions = [
        {name: "Github", icon: <Github/>, href: "https://github.com/ziad-kamel/Graduation-Project", blankTarget:true},
        {name: "Trello", icon: <Trello/>, href: "https://trello.com/b/zUgdxhcg/parrot-board", blankTarget:true},
        {name: "Facebook", icon: <Facebook/>},
        {name: "Instagram", icon: <Instagram/>},
    ]
  return (
    <nav>
        <div className="bg-secondary rounded-xl m-4 p-3 flex justify-between items-center">
            <Link href={'/home'}>
                <div className="flex items-center gap-1">
                    {/* <Bird size={30} className=""/> */}
                    <Image src={parrot} alt="ss" width={40} height={40}/>
                    <h1 className="text-xl md:text-2xl font-jura font-bold">Parrot</h1>
                </div>
            </Link>

            <div className="flex gap-1 md:gap-4 ">
                <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                        baseTheme: theme === "dark" ? dark : undefined,
                        elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
                        }}/>
                <ThemeToggleButton/>
                <Dropdown label="Generation" options={generationDropDownOptions} />
                <Dropdown label="Contact us" options={contactsDropDownOptions} />
                <Link href={'/payment'}>
                    <Button>Change Plan</Button>
                </Link>
            </div>
        </div>
    </nav>
  )
}
