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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  STTLanguage,
  STT_Language,
  STT_Task,
  STTtask,
} from "@/lib/types/STTStypes";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUpload from "../hooks/useUpload";

//define the custom validation schema for the form filed
const FormSchema = z.object({
  audioFile: z
    .string({
      required_error: "Audio file is required",
    })
    .optional(), //to not have conflict with the setting file state
  task: z.string({
    required_error: "Task type is required",
  }),
  language: z.string({
    required_error: "Audio language is required",
  }),
});

export default function SpeechToTextPage() {
  //for setting the file after gaping it from the input filed
  const [audioFile, setAudioFile] = useState<File>();

  //to handel the disabling of the fields
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  //to set the uploaded audio URL to call the model with it {now displaying it for testing the functionality}
  const [audioURL, setAudioURL] = useState<string>("");

  //the custome hook to upload the audio file to edgeStore site
  const { loading, uploadFile } = useUpload();

  //define the zod custom validation schema for the form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //define the function to handle the form submit event
  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {
    setIsSubmiting(true);
    await uploadFile(audioFile, { temporary: true })
      .then((uploadedFileURL) => {
        setAudioURL(uploadedFileURL);
        console.log(`Uploaded File URL : ${uploadedFileURL}`);
      })
      .catch((error) => {
        console.log(`Error in uploading the file : ${error}`);
      });
    console.log(`Submitted values : `, fromValues);
    setIsSubmiting(false);
  };

  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
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
                        className="rounded-full w-max bg-gradient-to-r from-[#431147] from-30% to-black to-[125%] shadow-xl"
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

              <div className="w-full flex flex-col sm:flex-row md:flex-row justify-evenly">
                <FormField
                  control={form.control}
                  name="language"
                  disabled={isSubmiting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>language of the audio file</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="rounded-full">
                          <SelectTrigger>
                            <SelectValue placeholder="select the audio language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STT_Language.map((language: STTLanguage) => (
                            <SelectItem
                              key={language.audioLanguage}
                              value={language.audioLanguage}
                            >
                              {language.audioLanguage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="task"
                  disabled={isSubmiting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>task to be performed by the AI</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl className="rounded-full">
                          <SelectTrigger>
                            <SelectValue placeholder="select the task to preform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STT_Task.map((task: STTtask) => (
                            <SelectItem
                              key={task.taskType}
                              value={task.taskType}
                            >
                              {task.taskType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
              <Button variant={"ghost"} className="m-3">
                <Copy />
              </Button>
            </div>
            Results
            {loading ? (
              <Loader color="#000000" />
            ) : (
              <>
                {audioURL && (
                  <audio controls>
                    <source
                      id="audioSource"
                      type="audio/flac"
                      src={audioURL!}
                    />
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
