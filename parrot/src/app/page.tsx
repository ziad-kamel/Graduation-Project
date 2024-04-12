import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata={
  title:"Welcome",
}

export default function WelcomePage() {
  return (
    <main className="flex justify-center items-center h-full">
      <div className="flex flex-col md:flex-row gap-8 m-4">
        
        <div className="flex justify-center ">
          <img src="/logo1.png" className="w-40 h-40 md:w-96 md:h-96"/>
        </div>
        
        <div className="flex flex-col justify-around gap-4">
          <h1 className="text-md md:text-3xl font-jura font-bold">Explore the power of AI with Audio</h1>
          <div className="bg-secondary flex flex-col gap-4 p-4 rounded-xl">
            <Link href={'/home'} className="flex justify-center">
              <Button variant={"outline"} className="w-1/2 rounded-full border-none bg-primary">Sign-in</Button>
            </Link>
            
            <Link href={'/sign-up'} className="flex justify-center">
              <Button variant={"outline"} className="w-1/2 rounded-full border-none bg-primary">sign-up</Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
