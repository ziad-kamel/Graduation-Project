import { Bird, Facebook, FileAudio, Github, ImageIcon, Instagram, Paintbrush, Phone, Speech } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <div className="w-72 bg-gradient-to-t from-[#3c103f] from-40% to-black to-100% rounded-md flex flex-col gap-32 text-white">
        <div className="flex items-center m-2 border-b-2">
            <Bird size={70} />
            <div className="w-full flex justify-center">
                <h3 className="text-4xl font-jura font-bold">Parrot</h3>
            </div>
        </div>
        <div className="flex flex-col gap-8 p-4">

            <Link href={'audiogeneration'}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <FileAudio color="#858585"  />
                    Audio Generation
                </Button>
            </Link>

            <Link href={"audioCleanup"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <Paintbrush color="#858585"  />
                    Audio Cleanup
                </Button>
            </Link>

            <Link href={"speechToText"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">
                    <ImageIcon color="#858585"  />
                    Speech To Text
                </Button>
            </Link>

            <Link href={"text_to_speech"}>
                <Button className="rounded-full text-xl gap-2 text-white font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">
                <Speech color="#858585"  />
                    Text To Speech
                </Button>
            </Link>
        </div>

        <div className="flex flex-col justify-center gap-2 ml-5">
            <h1 className="font-jura font-bold text-xl">About Us</h1>
            <div className="flex gap-2">
                <Facebook/>
                <Instagram/>
                <Phone/>
                <Github/>
            </div>
        </div>
    </div>
  )
}