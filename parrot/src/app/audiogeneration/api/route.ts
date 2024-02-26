import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  
  export async function POST(request: Request) {
      try{
          // Parse the request body as JSON
          const requestBody = await request.json();

          // destructure the data the parsed request body
          const inputPrompt = requestBody.input
  
          if(!inputPrompt){
            throw new Error("inputPrompt not found")
          }
          
        //call the model with the user input data
        const apiOutput = await replicate.run(
              "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
              {
                input: {
                  top_k: 250,
                  top_p: 0,
                  prompt: inputPrompt,
                  duration: 5,
                  temperature: 1,
                  continuation: false,
                  model_version: "stereo-large",
                  output_format: "wav",
                  continuation_start: 0,
                  multi_band_diffusion: false,
                  normalization_strategy: "peak",
                  classifier_free_guidance: 3
                }
              }
        );
            console.log(apiOutput);
  
          // return the model results to the user
          return new Response(JSON.stringify({apiOutput}), {status: 200});
  
        // @ts-ignore
      }catch(error: Error){
        console.log("Error from API: ", error.message);
        throw Error(error.message)
    }
      
  }