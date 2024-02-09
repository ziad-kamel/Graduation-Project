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
          <Input
            placeholder="Let me know what's on your mind"
            className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9]"
          />
          <div className="flex justify-center" style={{ width: "47rem" }}>
            <div className="flex flex-row justify-center space-y-80 w-full h-80 ">
              <div className="flex flex-col justify-evenly w-3/5 ">
                <div className="flex flex-row justify-around">
                  <Button className="w-54 h-14 rounded-[3rem] font-jura text-2xl bg-gradient-to-r from-[#f052ea] from-10% to-black to-[120%] shadow-xl  ">
                    Music
                  </Button>
                  <Button className="w-54 h-15 rounded-[3rem] font-jura text-2xl bg-gradient-to-r from-[#ce51ed] from-10% to-black to-[120%] shadow-xl  ">
                    SFX
                  </Button>
                </div>
                <div className="flex flex-col justify-evenly w-[30rem] h-[15rem] rounded-md bg-[#382837]">
                  <div className=" rounded-md flex justify-stretch ">
                    <div className="flex flex-row justify-around gap-4">
                      <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                        audio_1
                      </button>
                      <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                        audio_2
                      </button>
                    </div>

                    <div className="flex flex-row justify-around gap-4">
                      <button className="w-40 h-14 rounded-[2rem] bg-[#D9D9D9]">
                        audio_3
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
    </div>
  );
}
