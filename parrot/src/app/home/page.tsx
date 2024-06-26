import HomeCustomeButton from "@/components/HomeCustomeButton";
import { FileAudio, Paintbrush, Speech, Text } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata={
    title:"Home",
  icons: 'parrot.svg'
}

export default function HomePage() {
  return (
    <main className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-col md:flex-row w-9/12 justify-around gap-4">
            <div className="flex justify-center md:justify-start">
                <img src="/logo2.png" alt="parrot pic" className="w-52 h-52 md:w-96 md:h-96" draggable={false}/>
            </div>

            <div className="flex flex-col items-center justify-evenly gap-4">

                <h1 className="text-primary-foreground font-jura text-md md:text-4xl ">Craft Your Sonic Symphony with Parrot</h1>

                    <div className="flex flex-row justify-center space-y-8 w-full m-4">
                        <div className="flex flex-col justify-evenly gap-8">
                            <div className="flex flex-col md:flex-row justify-around gap-8">
                                <Link href={"/generation/audioCleanup"}>
                                    <HomeCustomeButton btnText="Audio Cleanup" icon= {<Paintbrush color="#1B8D7F"  size={'2rem'}/>}/>
                                </Link>

                                <Link href={"/generation/speechToText"}>
                                    <HomeCustomeButton btnText="Speech To Text" icon= {<Speech color="#4f5271" size={'2rem'}/>}/>
                                </Link>
                            </div>
                            <div className="flex flex-col md:flex-row justify-around gap-8">
                                <Link href={"/generation/audiogeneration"}>
                                    <HomeCustomeButton btnText="Audio Generation" icon= {<FileAudio color="#714479" size={'2rem'}/>}/>
                                </Link>

                                <Link href={"/generation/TextToSpeech"}>
                                    <HomeCustomeButton btnText="Text To Speech" icon= {<Text color="#377487" size={'2rem'}/>}/>
                                </Link>
                            </div>
                        </div>
                    </div>

            </div>

        </div>
    </main>
  )
}
