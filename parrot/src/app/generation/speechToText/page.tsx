"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import usePostSpeechToText from "../../hooks/usePostSpeechToText";
import useUpload from "../../hooks/useUpload";

//define the custom validation schema for the form filed
const FormSchema = z.object({
  audioFile: z
    .string({
      required_error: "Audio file is required",
    })
    .optional(), //to not have conflict with the setting file state
});

export default function SpeechToTextPage() {
  /* states */
  //for setting the file after gaping it from the input filed
  const [audioFile, setAudioFile] = useState<File>();

  //to handel the disabling of the fields
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  
  //to show response text to user
  const [apiResponseText, setApiResponseText] = useState();

  //to handel the copy button functionality
  const [copied, setCopied] = useState<boolean>(false);

  
  /* hooks */
  //the custome hook to upload the audio file to edgeStore site
  const { uploading, uploadProgress, uploadFile } = useUpload();
  
  //the custome hook to send the generation request to api
  const { isloading, speechToText } = usePostSpeechToText();


  //define the zod custom validation schema for the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  //define the function to handle the form submit event
  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {
    setIsSubmiting(true);
    setCopied(false);

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
      const {transcription} = await speechToText(uploadedFileURL);

      setApiResponseText(transcription);

    setIsSubmiting(false);
  };

  //handel the copy to clipboard functionality
  const handelCopy = () => {
    // @ts-ignore
    navigator.clipboard.writeText(document.getElementById("resultText")?.textContent)
    setCopied(true);
  }

  return (
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Speech To Text
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-8 w-2/5"
            >
              <FormField
                control={form.control}
                name="audioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Audio File</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-full w-max bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl border-none"
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          setAudioFile(e.target.files?.[0]);
                        }}
                        disabled={isSubmiting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isSubmiting}
                type="submit"
                className="w-48 h-12 rounded-full text-2xl text-white font-jura bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
              >
                Generate
              </Button>
            </form>
          </Form>

          
          <div className="flex flex-col gap-3 items-center w-1/2 h-1/3 bg-[#c3c3c38c] rounded-2xl ">
            <div className="flex w-full flex-row-reverse">
              <Button variant={"ghost"} className="m-2" onClick={handelCopy}>
                {copied ? <CopyCheck color="#092038"/> : <Copy color="#092038"/>}
              </Button>
            </div>
            
            {/* if the uploading process is active then display the uploading progress bar
                else if the api model process is active then display a loader
                else display the result test or {a static text for none of the process is active} */}
            {uploading ?
              (<>
                  Uploading ...
                  <Progress value={uploadProgress} className="w-9/12"/>
                </>) :
                (<>
                  {isloading ?
                    (<>
                      Preparing your text ...
                      <Loader color="#FFFFFF"/>
                    </>) : (<h1 className="text-white" id="resultText">{apiResponseText || "This is an Example of the results"}</h1>)}
                </>
            )}
          </div>

        </div>
      </div>
  );
}
