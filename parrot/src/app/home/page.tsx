import { Button } from "@/components/ui/button";
import { FileAudio, ImageIcon, Paintbrush, Speech } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full">
        <div className="flex flex-row w-9/12 justify-around">
            <Image src={'/logo2.png'} width={384} height={384} alt="parrot pic" draggable={false}/>

            <div className="flex flex-col justify-evenly" style={{width: "47rem"}}>
                
                <div className="flex justify-center">
                    <div className="flex flex-row justify-center space-y-8 w-full h-80">
                        <div className="flex flex-col justify-evenly w-4/5">
                            <div className="flex flex-row justify-around">
                                <Button className="w-64 h-28 text-xl bg-neutral-500 bg-opacity-75 hover:bg-neutral-500 hover:bg-opacity-80 justify-around" style={{borderRadius: "1rem",fontFamily:"jura" }}><Paintbrush color="#1B8D7F"  size={'2rem'}/>Audio Cleanup</Button>
                                <Button className="w-64 h-28 text-xl bg-neutral-500 bg-opacity-75 hover:bg-neutral-500 hover:bg-opacity-80 justify-around" style={{borderRadius: "1rem",fontFamily:"jura" }}><ImageIcon color="#bb943e" size={'2rem'}/>Image To Audio</Button>
                            </div>
                            <div className="flex flex-row justify-around">
                                <Button className="w-64 h-28 text-xl bg-neutral-500 bg-opacity-75 hover:bg-neutral-500 hover:bg-opacity-80 justify-around" style={{borderRadius: "1rem",fontFamily:"jura" }}><FileAudio color="#4d1557" size={'2rem'}/>Audio Generation</Button>
                                <Button className="w-64 h-28 text-xl bg-neutral-500 bg-opacity-75 hover:bg-neutral-500 hover:bg-opacity-80 justify-around" style={{borderRadius: "1rem",fontFamily:"jura" }}><Speech color="#4591a9" size={'2rem'}/>Text To Speech</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}
