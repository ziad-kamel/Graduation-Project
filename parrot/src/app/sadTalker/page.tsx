"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function audioCleanUpPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleAudioButtonClick = () => {
    if (audioInputRef.current) {
      audioInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) setImageFile(file);
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) setAudioFile(file);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <h1 className="text-5xl font-bold text-white font-jura">Sad Talker</h1>
      <div className="flex items-center mt-8">
        <div>
          <Button
            className="w-64 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
            onClick={handleImageButtonClick}
          >
            Upload Image
          </Button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInputRef}
            onChange={handleImageChange}
          />
          {imageFile && (
            <p className="text-white break-all mt-2">Image: {imageFile.name}</p>
          )}
        </div>
        <div className="ml-4">
          <Button
            className="w-64 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
            onClick={handleAudioButtonClick}
          >
            Upload Audio
          </Button>
          <input
            type="file"
            id="audio-upload"
            accept="audio/*"
            style={{ display: "none" }}
            ref={audioInputRef}
            onChange={handleAudioChange}
          />
          {audioFile && (
            <p className="text-white break-all mt-2">Audio: {audioFile.name}</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <Button className="w-96 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl">
          Generate
        </Button>
      </div>
      <div className="w-10/12 h-1/3 rounded-md flex justify-center items-center bg-[#c3c3c38c] mt-8">
        Results
      </div>
    </div>
  );
}
