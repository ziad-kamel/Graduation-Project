"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Loader from "@/components/Loader";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import usePostAudioGeneration from "../hooks/usePostAudioGeneration";

//define the custom validation schema for the form filed
const FormSchema = z.object({
  prompt: z.string({
    required_error: "input field is required",
  })
})

export default function audioGenerationpPage() {

  //to show response Audio URL
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /* hooks */
  //the custome hook to send the generation request to api
  const { isloading, audioGeneration } = usePostAudioGeneration();

  //define the zod custom validation schema for the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  
  //define the function to handle the form submit event
  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => { 

    //destructure the response json object value
    const { apiOutput } = await audioGeneration(fromValues.prompt);
    
    setAudioUrl(apiOutput)
  }

  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Generative Audio
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center h-full"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Let me know what's on your mind"
                        className="w-[35rem] text-center rounded-[2rem] bg-[#D9D9D9] text-black m-5"
                      />
                    </FormControl>
                  </FormItem>
                  
                )}
              />
            
              <Button
                type="submit"
                className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-x m-5">
                Music
              </Button>
              <Button
                className="w-56 h-14 rounded-[2rem] font-jura text-2xl bg-gradient-to-r from-[#ec80f6] from-30% to-black to-[125%] shadow-xl  ">
                SFX
              </Button>
            </form>
          </Form>

          {isloading ? (<>
            Preparing your audio ...
            <Loader color="#FFFFFF" />
          </>) : (
              // Display audio player when audio is available
              <>
                {audioUrl && (
                  <audio src={audioUrl} controls></audio>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
}