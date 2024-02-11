import { Button } from "@/components/ui/button";
import { FileAudio, ImageIcon, Paintbrush, Speech } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-row w-9/12 justify-around">
            <Image src={'/logo2.png'} width={384} height={384} alt="parrot pic" draggable={false}/>

            <div className="flex flex-col items-center justify-evenly w-[47rem]">

                <h1 className="text-white font-jura text-[2.5rem]">Craft Your Sonic Symphony with Parrot</h1>

                    <div className="flex flex-row justify-center space-y-8 w-full h-80">
                        <div className="flex flex-col justify-evenly w-4/5">
                            <div className="flex flex-row justify-around">
                                <Link href={"/audioCleanup"}>
                                    <Button className="w-64 h-28 text-xl font-bold text-[#BCBCBC] font-jura bg-[#5E575D] hover:bg-[#706d70] justify-around rounded-2xl"><Paintbrush color="#1B8D7F"  size={'2rem'}/>Audio Cleanup</Button>
                                </Link>

                                <Link href={"/audiogeneration"}>
                                    <Button className="w-64 h-28 text-xl font-bold text-[#BCBCBC] font-jura bg-[#5E575D] hover:bg-[#706d70] justify-around rounded-2xl" ><ImageIcon color="#bb943e" size={'2rem'}/>Image To Audio</Button>
                                </Link>
                            </div>
                            <div className="flex flex-row justify-around">
                                <Link href={"/"}>
                                    <Button className="w-64 h-28 text-xl font-bold text-[#BCBCBC] font-jura bg-[#5E575D] hover:bg-[#706d70] justify-around rounded-2xl" ><FileAudio color="#4d1557" size={'2rem'}/>Audio Generation</Button>
                                </Link>

                                <Link href={"/"}>
                                    <Button className="w-64 h-28 text-xl font-bold text-[#BCBCBC] font-jura bg-[#5E575D] hover:bg-[#706d70] justify-around rounded-2xl" ><Speech color="#4591a9" size={'2rem'}/>Text To Speech</Button>
                                </Link>
                            </div>
                        </div>
                    </div>

            </div>

        </div>
    </div>
  )
}
