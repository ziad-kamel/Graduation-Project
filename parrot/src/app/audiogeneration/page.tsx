import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function audioGenerationpPage() {
  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Generative Audio
          </h1>
          <div className="flex justify-center" style={{ width: "53rem" }}>
            <div className="flex flex-row justify-center space-y-15 w-full h-50 ">
              <div className="flex flex-col justify-evenly w-3/5 ">
                <div className="flex flex-row justify-around">
                  <Button className="w-54 h-14 rounded-[3rem] font-jura text-2xl bg-gradient-to-r from-[#f052ea] from-10% to-black to-[120%] shadow-xl  ">
                    Music
                  </Button>
                  <Button className="w-54 h-15 rounded-[3rem] font-jura text-2xl bg-gradient-to-r from-[#ce51ed] from-10% to-black to-[120%] shadow-xl  ">
                    SFX
                  </Button>
                </div>
                <Input
                  placeholder="Let me know what's on your mind"
                  className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9] mt-5"
                />
                <div
                  className="flex flex-col w-[32rem] h-[11rem] rounded-md justify-stretch bg-[#382837] mt-10"
                  style={{ width: "34.5rem" }} 
                >
                  <div className="flex flex-row justify-around gap-4 mt-5">
                    <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                      audio_1
                    </button>
                    <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                      audio_3
                    </button>
                  </div>
                  
                  <div className="flex flex-row justify-around gap-4 mt-5">
                    <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                      audio_2
                    </button>
                    <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                      audio_4
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
