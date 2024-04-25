'use client' 

import Loader from "@/components/Loader";
import { TextToSpeechForm } from "@/components/TextToSpeechForm";
import { TTSRequest } from "@/lib/types/TTSTypes";
import { useState } from "react";
import useTextToSpeech from "../../hooks/usePostTextToSpeech";

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function GenerateSoundView() {
  // State to manage audio URL
  const [audioUrl, setAudioUrl] = useState<string | null>("");

  //use the custom hook to call the text-to-speech API
  const {loading, textToSpeech} = useTextToSpeech();
  
  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {TTSRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: TTSRequest) => {
    textToSpeech(request.modelUrl, request.text)
    .then((response) => {
      if (!response) {
        alert('Error: No response received');
      }
      setAudioUrl(response);
    })
    .catch((error) => {
      alert('Error: ' + error.message);
    })
  };

  return (


      <main className="w-full p-8">
        <div className="flex flex-col gap-8 items-center h-full">

          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-jura">Text to Speech</h1>
          
          <TextToSpeechForm handleGetAudio={handleGetAudio}/>

          <div className="w-3/4 h-1/4 md:w-1/2 md:h-1/5 flex justify-center items-center flex-col gap-3 bg-secondary rounded-2xl">
            {loading ? (
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
      </main>
  );
}
