import { Bird, Facebook, FileAudio, Github, Instagram, Paintbrush, Speech, Text, Trello } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <div className="w-72 bg-gradient-to-t from-[#3c103f] from-40% to-black to-100% rounded-md flex flex-col gap-32 text-white">
        <Link href={'/home'}>
            <div className="flex items-center m-2 border-b-2">
                <Bird size={70} />
                <div className="w-full flex justify-center">
                    <h1 className="text-4xl font-jura font-bold">Parrot</h1>
                </div>
            </div>
        </Link>

        <div className="flex flex-col gap-8 p-4">
            <Link href={'audiogeneration'}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-l from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <FileAudio color="#791f89"  />
                    Audio Generation
                </Button>
            </Link>

            <Link href={"audioCleanup"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-l from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <Paintbrush color="#1B8D7F"  />
                    Audio Cleanup
                </Button>
            </Link>

            <Link href={"TextToSpeech"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-l from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <Text color="#4591a9"  />
                    Text To Speech
                </Button>
            </Link>

            <Link href={"speechToText"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-l from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <Speech color="#8488bd"  />
                    Speech To Text
                </Button>
            </Link>
        </div>

        <div className="flex flex-col justify-center gap-2 ml-5">
            <h1 className="font-jura font-bold text-xl">Contact Us</h1>
            <div className="flex gap-2">
                <Facebook/>
                <Instagram/>
                <Link href={"https://trello.com/invite/b/65bb7e6b2f8aa96638db2a2c/ATTIeb646aeff0874a401e91a798f408d14b25FEAA1B/Project%20Work"}>
                    <Trello/>
                </Link>
                <Link href={'https://github.com/ziad-kamel/Graduation-Project'}>
                    <Github/>
                </Link>
            </div>
        </div>
    </div>
  )
}