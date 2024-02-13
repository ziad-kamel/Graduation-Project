"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function getMusic() {
  const [prediction, setPrediction] = useState(false)
  try {
    const input = "A man is speaking under the water."
    console.log("Something wrong")
    const response = await fetch("/audiogeneration/api/audioldmPredictions", {
      method: "POST",
      body: JSON.stringify({ input })
    })

    let prediction = await response.json();
     if (response.status !== 201) {
       console.log(prediction.detail)
       return;
     }
     setPrediction(prediction);

    console.log(response)
    if (!response.ok) {
      throw Error("Status code: " + response.status)
    }
  } catch (error) {
    console.log(error)
    // alert("Something went wrong")
  }
}
getMusic()


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
          <Button className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-xl  ">
            Music
          </Button>
          <Button className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-xl  ">
            SFX
          </Button>
< div className=" w-[60%] mt-8 mb-10"></div>
        </div>
      </div>
    </div>
  );
}