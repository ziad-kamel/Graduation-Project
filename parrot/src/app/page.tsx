import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full">
      <div className="flex flex-row w-9/12 justify-between">

        <Image src={'/logo1.png'} alt="parrot pic" width={384} height={384} draggable={false}/>

        <div className="flex flex-col justify-evenly w-[45rem]">
          <div className="flex justify-center">
            <h1 className="text-white font-jura text-[2.5rem]">Explore the power of Al with Audio</h1>
          </div>
          
          <div className="flex justify-center">
            <div className="flex flex-row justify-center space-y-8 w-[27rem] h-56 rounded-[2rem] bg-[#787878d6]">
              <div className="flex flex-col justify-evenly">
                <Link href="/home">
                <Button variant="outline" className="w-64 h-[3.5rem] text-white text-[2rem] font-jura rounded-[3rem] bg-[#54174E] border-none hover:bg-white hover:text-[#54174E]">Explore</Button>
                </Link>
                <Link href="/sign-up">
                <Button variant="outline" className="w-64 h-[3.5rem] text-white text-[2rem] font-jura rounded-[3rem] bg-[#54174E] border-none hover:bg-white hover:text-[#54174E]">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
