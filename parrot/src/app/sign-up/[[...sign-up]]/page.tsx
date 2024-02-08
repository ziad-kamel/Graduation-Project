import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";
 

export const metadata:Metadata={
    title:"Parrot-Sign Up",
}
export default function Page() {
  return (
  <div className="flex h-full items-center justify-center">
   <SignUp appearance={{variables:{colorPrimary:"#431147"}}} /> 
  </div>
  
  
  );
}