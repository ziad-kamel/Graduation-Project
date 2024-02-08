import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function audioCleanUpPage() {
  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Audio Cleanup
          </h1>
          <Button className="w-96 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl  ">
            import your audio
          </Button>
          <Input
            placeholder="Negative Prompt"
            className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9]"
          />
          <Button className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl  ">
            CleanUp
          </Button>
          <div className="w-10/12 h-1/3 rounded-md flex justify-center items-center bg-[#c3c3c38c]">
            Results
          </div>
        </div>
      </div>
    </div>
  );
}
