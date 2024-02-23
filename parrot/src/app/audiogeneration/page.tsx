"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  prompt: z.string({ required_error: "Please enter a prompt" }),
  duration: z.string({ required_error: "Please enter a duration" }),
  model_version: z.string(),
  normalization_strategy: z.string(),
});

export default function audioGenerationpPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (fromValues: z.infer<typeof FormSchema>) => {
    console.log(Number(fromValues.duration));
  };

  return (
    <div className="flex flex-row h-full">
      <div className="w-72 "></div>
      <div className="w-full p-14">
        <div className="flex flex-col justify-between items-center h-full">
          <h1 className="text-5xl font-bold text-white font-jura">
            Generative Audio
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>duration</FormLabel>
                    <FormControl>
                      <Input type="number" min={3} max={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model_version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>model version</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select a model version" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Map through available sound models */}
                        <SelectItem key={"x"} value={"x"}>
                          x
                        </SelectItem>
                        <SelectItem key={"y"} value={"y"}>
                          y
                        </SelectItem>
                        <SelectItem key={"z"} value={"z"}>
                          z
                        </SelectItem>
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
                    <FormLabel>normalization strategy</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" ">
                          <SelectValue placeholder="Select a strategy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* Map through available sound models */}
                        <SelectItem key={"a"} value={"a"}>
                          a
                        </SelectItem>
                        <SelectItem key={"b"} value={"b"}>
                          b
                        </SelectItem>
                        <SelectItem key={"c"} value={"c"}>
                          c
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Generate</Button>
            </form>
          </Form>

          <div className="flex flex-col justify-evenly items-center w-10/12 h-1/3 bg-[#c3c3c38c] rounded-md ">
            <div className="flex justify-evenly w-[40rem]">
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">
                audio_1
              </Button>
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">
                audio_2
              </Button>
            </div>
            <div className="flex justify-evenly w-[40rem]">
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">
                audio_3
              </Button>
              <Button className="w-64 h-14 rounded-[2rem] bg-white text-black ">
                audio_4
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
