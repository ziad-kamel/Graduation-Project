import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function audioGenerationpPage() {
  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">

          <h1 className="text-5xl font-bold text-white font-jura">Generative Audio</h1>

          <div className="flex flex-row justify-around w-96">
            <Button className="w-36 h-14 rounded-[2rem] text-2xl font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">Music</Button>
            <Button className="w-36 h-14 rounded-[2rem] text-2xl font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">SFX</Button>
          </div>
          
          <Input placeholder="Let me know what's on your mind" className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9]"/>

          <div className="flex flex-col justify-evenly items-center w-10/12 h-1/3 bg-[#c3c3c38c] rounded-md ">
            <div className="flex justify-evenly w-[40rem]">
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">audio_1</Button>
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">audio_2</Button>
            </div>

            <div className="flex justify-evenly w-[40rem]">
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">audio_3</Button>
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">audio_4</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
