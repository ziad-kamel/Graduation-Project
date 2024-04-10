import { UserButton } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import { Bird, Facebook, FileAudio, Github, Instagram, Paintbrush, Speech, Text, Trello } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "./Dropdown";
export default function NavBar() {
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
                <div className="flex items-center">
                    <Bird size={40} className="mr-2"/>
                    <h1 className="text-3xl font-jura font-bold">Parrot</h1>
                </div>
            </Link>

            <div className="flex gap-4 ">
                <Dropdown label="Generation" options={generationDropDownOptions} />
                <Dropdown label="Contact us" options={contactsDropDownOptions} />
                <UserButton afterSignOutUrl="/" appearance={{baseTheme: dark, elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },}}/>
            </div>
        </div>
    </nav>
  )
}
