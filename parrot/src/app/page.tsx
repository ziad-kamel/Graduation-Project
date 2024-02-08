import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-full">
      <div className="flex flex-row w-9/12 justify-between">

        <Image src={'/logo1.png'} alt="parrot pic" width={384} height={384} draggable={false}/>

        <div className="flex flex-col justify-evenly" style={{width: "45rem"}}>
          <div className="flex justify-center">
            <h1 style={{fontSize:"2.5rem", color:"white", fontFamily: "jura"}}>Explore the power of Al with Audio</h1>
          </div>
          
          <div className="flex justify-center">
            <div className="flex flex-row justify-center space-y-8 h-56" style={{width: "27rem", borderRadius:"2rem", backgroundColor:"#787878d6"}}>
              <div className="flex flex-col justify-evenly">
                <Link  href="/sign-in">
                <Button  variant="outline" style={{borderRadius:"3rem", backgroundColor: "#54174E", color:"white", fontSize:"2rem", width:"16rem", height:"3.5rem", fontFamily:"jura", border:"none"}}>Explore</Button>
                </Link>
                <Link  href="/sign-up">
                <Button variant="outline" style={{borderRadius:"3rem", backgroundColor: "#54174E", color:"white", fontSize:"2rem", width:"16rem", height:"3.5rem", fontFamily:"jura", border:"none"}}>Register</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
