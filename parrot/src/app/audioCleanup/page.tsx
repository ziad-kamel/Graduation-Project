 "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEdgeStore } from "@/lib/edgestore";
import React, { useState, ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpload from "../hooks/useUpload";
import usePostAudioCleanup from "../hooks/usePostAudioCleanup";


const FormSchema = z.object({
  audioFile: z
    .string({
      required_error: "Audio file is required",
    })
});

export default function audioCleanUpPage() {
  const [audioFile, setAudioFile] = useState<File>();
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [enhancedAudioUrl, setEnhancedAudioUrl] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for file input
  const [apiResponseAudio ,setApiResponseAudio ]= useState();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // setAudioFile(file || null);

    if (file && edgestore) {
      try {
        const res = await edgestore.publicFiles.upload({
          file: file,
        });

        setAudioUrl(res.url);
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    }
  };
 /* hooks */
  //the custome hook to upload the audio file to edgeStore site
  const { uploading, uploadProgress, uploadFile } = useUpload();
  
  //the custome hook to send the generation request to api
  const { isLoading, AudioCleanup } = usePostAudioCleanup();

  const openFilePicker = () => { 
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input when "import your audio" button is clicked
    }
  };
  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {


    // make a request to edgeStore API with uploadFile hook to store the audio in there and get its URL
    // the resulted URL will be sent as part of SpeechToText model request
    const uploadedFileURL = await uploadFile(audioFile, { temporary: true })
      .then((responseFileURL) => {
        return responseFileURL
      })
      .catch((error) => {
        alert(`Error in uploading the file : ${error.message}`);
      });
      
      //destructure the response json object value
      // const {apiOutput} = await AudioCleanup(uploadedFileURL);

      // setApiResponseAudio(apiOutput.audio);

     
async function fetchData() {
  try {
      const { apiOutput } = await AudioCleanup(uploadedFileURL); 
      setApiResponseAudio(apiOutput.audio);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Call the function somewhere in your code
fetchData();

 
  };

  const AudioUrlSchema = z.string().url();


  const handleCleanup = async () => {
    if (audioUrl) {
      try {
        AudioUrlSchema.parse(audioUrl);

        const response = await fetch("/api/edgeStore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ audioUrl }),
        });

        if (!response.ok) {
          throw new Error("Failed to clean up audio");
        }

        const data = await response.json();
        setEnhancedAudioUrl(data.enhancedAudio);
      } catch (error) {
        console.error("Error cleaning up audio:", error);
      }
    }
  };

  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Audio Cleanup
          </h1>
          <Button
            className="w-96 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
            onClick={openFilePicker} // Trigger the file input when the button is clicked
          >
            Import your audio
          </Button>
          {audioUrl && (
           <div className="text-white mb-4">
            <audio controls>
               <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
           </audio>
         </div>
)}
          {audioUrl && (
            <div className="text-white mb-4">
              <a
                href={audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-500"
              >
                URL
              </a>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef} // Associate the ref with file input
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Input
            placeholder="Negative Prompt"
            className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9]"
          />
          <Button
            className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
            onClick={handleCleanup}
          >
            CleanUp
          </Button>
          {enhancedAudioUrl && (
            <div className="w-full h-1/3 rounded-md flex justify-center items-center bg-[#c3c3c38c] mb-4">
              <h2 className="text-white">Enhanced Audio:</h2>
              <audio controls>
                <source src={enhancedAudioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

