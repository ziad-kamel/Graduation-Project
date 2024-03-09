import HomeCustomeButton from "@/components/HomeCustomeButton";
import { FileAudio, Paintbrush, Speech, Text } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata:Metadata={
    title:"Home",
}

export default function HomePage() {
  return (
    <div className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-row w-9/12 justify-around">
            <Image src={'/logo2.png'} width={384} height={384} alt="parrot pic" draggable={false}/>

            <div className="flex flex-col items-center justify-evenly w-[47rem]">

                <h1 className="text-white font-jura text-[2.5rem]">Craft Your Sonic Symphony with Parrot</h1>

                    <div className="flex flex-row justify-center space-y-8 w-full h-80">
                        <div className="flex flex-col justify-evenly w-4/5">
                            <div className="flex flex-row justify-around">
                                <Link href={"/generation/audioCleanup"}>
                                    <HomeCustomeButton btnText="Audio Cleanup" icon= {<Paintbrush color="#1B8D7F"  size={'2rem'}/>}/>
                                </Link>

                                <Link href={"/generation/speechToText"}>
                                    <HomeCustomeButton btnText="Speech To Text" icon= {<Speech color="#8488bd" size={'2rem'}/>}/>
                                </Link>
                            </div>
                            <div className="flex flex-row justify-around">
                                <Link href={"/generation/audiogeneration"}>
                                    <HomeCustomeButton btnText="Audio Generation" icon= {<FileAudio color="#4d1557" size={'2rem'}/>}/>
                                </Link>

                                <Link href={"/generation/TextToSpeech"}>
                                    <HomeCustomeButton btnText="Text To Speech" icon= {<Text color="#4591a9" size={'2rem'}/>}/>
                                </Link>
                            </div>
                        </div>
                    </div>

            </div>

        </div>
    </div>
  )
}
