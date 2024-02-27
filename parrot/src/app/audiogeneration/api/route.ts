import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  
  export async function POST(request: Request) {
      try{
          // Parse the request body as JSON
          const requestBody = await request.json();

          // destructure the data the parsed request body
          const {model_version , prompt, duration, normalization_strategy} = requestBody
  
        if(!model_version){
          throw new Error("model_version not found")
        }
        if(!prompt){
          throw new Error("prompt not found")
        }
        if(!duration){
          throw new Error("duration not found")
        }
        if(!normalization_strategy){
          throw new Error("strategy not found")
        }
          
        //call the model with the user input data
        const output = await replicate.run(
              "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
              {
                input: {
                  prompt: prompt,
                  duration: duration,
                  model_version:model_version,
                  normalization_strategy: normalization_strategy,
                }
              }
        );
            console.log(output);
  
          // return the model results to the user
          return Response.json({output})
  
        // @ts-ignore
      }catch(error: Error){
        console.log("Error from API: ", error.message);
        throw Error(error.message)
    }
      
  }