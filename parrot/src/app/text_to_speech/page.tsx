'use client' 

import Loader from "@/components/Loader";
import { TextToSpeechForm } from "@/components/TextToSpeechForm";
import { TTSRequest } from "@/lib/types/TTSTypes";
import { useState } from "react";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function GenerateSoundView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {TTSRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: TTSRequest) => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/text_to_speech/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }

      // Get the audio data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Convert ArrayBuffer to Blob and create a URL for the audio
      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (

    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-evenly items-center h-full">

          <h1 className="text-5xl font-bold text-white font-jura">Text to Speech</h1>
          
          <TextToSpeechForm handleGetAudio={handleGetAudio}/>

          <div className="w-full h-24 flex justify-center items-center">
            {isLoading ? (
              // Show loader when fetching audio data
              <Loader color="#FFFFFF"/>
            ) : (
              // Display audio player when audio is available
              <>
                {audioUrl && (
                  <audio controls>
                    <source id="audioSource" type="audio/flac" src={audioUrl!} />
                  </audio>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
