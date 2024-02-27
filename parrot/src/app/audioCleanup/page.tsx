"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Loader from "@/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField 
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import React, { useState, ChangeEvent } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import usePostAudioCleanup from "../hooks/usePostAudioCleanup";
import useUpload from "../hooks/useUpload";



//define validation schema
const FormSchema = z.object({
  audioFile: z.string({
    required_error: "Audio file is required",
  }),
});


export default function audioCleanUpPage() {
  /*state*/
  const [audioFile, setAudioFile] = useState<File>();
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [enhancedAudioUrl, setEnhancedAudioUrl] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const [isSubmiting, setIsSubmiting] = useState<Boolean>(false);
  const [apiResponseAudio, setApiResponseAudio] = useState();

  /*hooks*/
  const {uploading ,uploadProgress ,uploadFile} =useUpload(); 
  const { isLoading, AudioCleanup } = usePostAudioCleanup();

  // const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for file input
  // const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   // setAudioFile(file || null);

  //   if (file && edgestore) {
  //     try {
  //       const res = await edgestore.publicFiles.upload({
  //         file: file,
  //       });

  //       setAudioUrl(res.url);
  //     } catch (error) {
  //       console.error("Error uploading audio:", error);
  //     }
  //   }
  // };
  //the custome hook to send the generation request to api
  // const openFilePicker = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click(); // Trigger the file input when "import your audio" button is clicked
  //   }
  // };
  //define the zod custom validation schema for the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {
    setIsSubmiting(true);
    // make a request to edgeStore API with uploadFile hook to store the audio in there and get its URL
    // the resulted URL will be sent as part of SpeechToText model request
    const uploadedFileURL = await uploadFile(audioFile, { temporary: true })
      .then((responseFileURL) => {
        return responseFileURL;
      })
      .catch((error) => {
        alert(`Error in uploading the file : ${error.message}`);
      });

      //destructure the response json object value
      const {apiOutput} = await AudioCleanup(uploadedFileURL);
      setApiResponseAudio(apiOutput.audio);
      // async function fetchData() {
      //   try {
      //     const { apiOutput } = await AudioCleanup(uploadedFileURL);
      //     setApiResponseAudio(apiOutput.audio);
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // }

      // Call the function somewhere in your code
      // fetchData();
    setIsSubmiting(false);
  };

  // const AudioUrlSchema = z.string().url();
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAudioFile(file);

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

  const handleCleanup = async () => {
    // if (audioUrl) {
      const uploadedFileURL = await uploadFile(audioFile, {temporary: true})
      .then((uploadFile)=>{
        return uploadFile;
      })
      .catch((error) => {
        alert(`Error in uploading the file : ${error.message}`);
      })
    // }
  };

  return (
    
    
    <div className="flex flex-row h-full">
    <div className="w-72"></div>
    <div className="w-full p-14">
      <div className="flex flex-col justify-between items-center h-full">
        <h1 className="text-5xl font-bold text-white font-jura">
          Audio Cleanup
        </h1>
  
        <Form>
          <FormItem>
            <FormLabel htmlFor="fileInput" className="w-96 h-14 rounded-[2rem] font-jura text-3xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl mb-4 cursor-pointer flex justify-center items-center">
              <span className="text-white">Import your audio</span>
            </FormLabel>
            <FormControl>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </FormControl>
          </FormItem>
          <Button
            className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
            onClick={handleCleanup}
          >
            CleanUp
          </Button>
        </Form>
  
        {audioUrl && (
          <div className="text-white mb-4">
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
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
  );}