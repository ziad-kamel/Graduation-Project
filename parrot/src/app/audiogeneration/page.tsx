"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Prediction } from "replicate";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function audioGenerationpPage() {

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch("/audiogeneration/api/audioldmPredictions/", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
    console.log(response)
  
    let prediction = await response.json();
    if (response.status !== 201) {
      console.error(prediction.detail)
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/audiogeneration/api/audioldmPredictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        console.error(prediction.detail)
      }

      console.log(prediction)
      console.log({ prediction })
      setPrediction(prediction);
    }
  };
  

  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Generative Audio
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col items-center h-full">
            <Input
              type="text"
              name="prompt"
              placeholder="Let me know what's on your mind"
              className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9] text-black m-5"
          />
            <Button
              type="submit"
              className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-x m-5">
            Music
          </Button>
          <Button className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-xl  ">
            SFX
          </Button>
          </form>

          {prediction && (
            <div className="flex flex-col justify-between items-center">
              {prediction.output && (
                <div className=" flex flex-col justify-between items-center w-[60%] mt-8 mb-10">
                  <audio src={prediction.output} controls></audio>
                </div>
              )}
              <p className="mt-4 text-lg text-white">status: {prediction.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}