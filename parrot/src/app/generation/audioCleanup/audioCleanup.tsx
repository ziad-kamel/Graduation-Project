"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import usePostAudioCleanup from "../../hooks/usePostAudioCleanup";
import useUpload from "../../hooks/useUpload";


// Define validation schema
const formSchema = z.object({
  audioFile: z.string({
    required_error: "Audio file is required",
  }).optional(),
});

export default function AudioCleanUpPage() {
  const router = useRouter();
  // State
  const [audioFile, setAudioFile] = useState<File>();
  const [denoisedAudio, setDenoisedAudio] = useState("");
  const [enhancedAudio, setEnhancedAudio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Custom hooks
  const { isLoading, AudioCleanup } = usePostAudioCleanup();
  const { uploading, uploadProgress ,uploadFile } = useUpload();

  // Form hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });



  // Form submit handler
  const onSubmit = async () => {
    if (!audioFile) {
      alert('No file found')
      return
    }
    setIsSubmitting(true);

    const uploadedFileURL = await uploadFile(audioFile, { temporary: true });
    const { denoised, enhanced } = await AudioCleanup(uploadedFileURL);
    
    setDenoisedAudio(denoised)
    setEnhancedAudio(enhanced)
    
    setIsSubmitting(false);
  };

  return (
      <main className="w-full p-8">
        <div className="flex flex-col gap-8 items-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground font-jura">
            Audio Cleanup
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
                    <FormLabel>
                    Import your audio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-full w-max shadow-xl bg-primary border-none"
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          setAudioFile(e.target.files?.[0]);
                        }}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-48 h-12 rounded-full text-2xl text-primary-foreground font-jura shadow-xl"
                disabled={isSubmitting}
              >
                Generate
              </Button>

              
            </form>
          </Form>

          <div className="bg-secondary rounded-2xl w-3/4 h-1/4 md:w-1/2 md:h-2/5 flex flex-col justify-center items-center gap-3">
            {(!denoisedAudio && !enhancedAudio && !uploading && !isLoading) && (<div className="text-xs md:text-lg">your audio will displayed here</div>)}
            {uploading? (<>
            uploading...
            <Progress value={uploadProgress} className="w-1/2"/>
            </>): (<>
            {isLoading? (<><Loader color="#FFFFFF"/></>): (<>
            {denoisedAudio && enhancedAudio && (
              <div>
              <h2 className="text-white">Denoised Audio:</h2>
              <audio controls>
                <source src={denoisedAudio} type="audio/mpeg" />
              </audio>

              <h2 className="text-white">Enhanced Audio:</h2>
              <audio controls>
                <source src={enhancedAudio} type="audio/mpeg" />
              </audio>
              </div>
            )}
            </>)}
            </>)}
          </div>

        </div>
      </main>
  );
}
