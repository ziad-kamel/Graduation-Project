
// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { TTSModel, TTSRequest, TTS_MODELS } from '../lib/types/TTSTypes';
import { Textarea } from "./ui/textarea";
// Define the validation schema for the form fields
const FormSchema = z.object({
  TTSModel: z.string({
    required_error: "Please select a Hugging Face sound model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Define the props interface for the GenerateSoundForm component
interface TextToSpeechFormProps {
  handleGetAudio: (request: TTSRequest) => void;
}

// Main component function
export function TextToSpeechForm({ handleGetAudio }: TextToSpeechFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);
    
    // Prepare the sound request object
    const soundRequest: TTSRequest = {
      modelUrl: data.TTSModel,
      text: data.text,
    };
    
    // Call the provided handler function with the sound request
    handleGetAudio(soundRequest);
    
    setFormSubmitting(false);
  }

  return (
    <div className="w-1/2">

      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-72">
          
          
          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Text
                  
                </FormLabel>
                <FormControl>
                  {/* Textarea component for entering text */}
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter your text here..."
                    {...field}
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="flex justify-between items-center">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="TTSModel"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>
                  Sound Model
                  
                </FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className=" ">
                      <SelectValue placeholder="Select a verified  to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {TTS_MODELS.map((model: TTSModel, index: number) => (
                      <SelectItem key={`${model.name}-${index}`} value={model.url}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

            {/* Submit button */}
            <Button type="submit" disabled={formSubmitting} className="w-40 h-14 rounded-[2rem] text-2xl text-white font-jura  shadow-xl" >
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
