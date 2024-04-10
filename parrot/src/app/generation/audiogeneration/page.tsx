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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Audio_Generation_Version,
  Normalization_Strategy,
  audioGenerationInputs,
  audioGenerationVersion,
  normalizationStrategy,
} from "@/lib/types/audioGenTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import usePostAudioGeneration from "../../hooks/usePostAudioGeneration";

const FormSchema = z.object({
  prompt: z.string({ required_error: "Please enter a prompt" }),
  duration: z.string({ required_error: "Please enter a duration" }),
  model_version: z.string(),
  normalization_strategy: z.string(),
});

export default function audioGenerationpPage() {
  const [outputAudioURL, setOutputAudioURL] = useState<string>("");
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const { isloading, audioGeneration } = usePostAudioGeneration();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {
    setIsSubmiting(true);

    const inputs: audioGenerationInputs = {
      model_version: fromValues.model_version,
      prompt: fromValues.prompt,
      duration: Number(fromValues.duration),
      normalization_strategy: fromValues.normalization_strategy,
    };

    const {output} = await audioGeneration(inputs);

    setOutputAudioURL(output);
    setIsSubmiting(false);
  };

  return (
      <main className="w-full p-14">
        <div className="flex flex-col justify-around items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Audio Generation
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-1/2 flex flex-col gap-8"
            >
              <FormField
                control={form.control}
                name="prompt"
                disabled={isSubmiting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="Let the audio in your mind be real"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between ">
                <FormField
                  control={form.control}
                  name="model_version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model version: </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmiting}
                      >
                        <FormControl>
                          <SelectTrigger className=" ">
                            <SelectValue placeholder="Select a model version" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Audio_Generation_Version.map(
                            (modelVersion: audioGenerationVersion) => (
                              <SelectItem
                                key={modelVersion.model_version}
                                value={modelVersion.model_version}
                              >
                                {modelVersion.model_version}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="normalization_strategy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Strategy: </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmiting}
                      >
                        <FormControl>
                          <SelectTrigger className=" ">
                            <SelectValue placeholder="Select a strategy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Normalization_Strategy.map(
                            (modelStrategy: normalizationStrategy) => (
                              <SelectItem
                                key={modelStrategy.strategy}
                                value={modelStrategy.strategy}
                              >
                                {modelStrategy.strategy}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  disabled={isSubmiting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration: </FormLabel>
                      <FormControl>
                        <Input type="number" min={3} max={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center">

              <Button
                disabled={isSubmiting}
                type="submit"
                className="w-48 h-12 rounded-full text-2xl text-white font-jura shadow-xl"
              >
                Generate
              </Button>
              </div>

            </form>
          </Form>

          <div className="flex flex-col justify-evenly items-center w-1/2 h-1/4 bg-secondary rounded-md ">
            {isloading ? (
              <Loader color="#FFFFFF" />
            ) : (
              <>
                {outputAudioURL && (
                  <audio controls>
                    <source src={outputAudioURL} />
                  </audio>
                )}
              </>
            )}
          </div>
        </div>
      </main>
  );
}