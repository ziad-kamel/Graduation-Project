import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
 

export const metadata:Metadata={
    title:"Parrot-Sign in",
}
export default function Page() {
  return (
  <div className="flex h-full items-center justify-center">
   <SignIn appearance={{variables:{colorPrimary:"#431147"}}} /> 
  </div>
  
  
  );
}