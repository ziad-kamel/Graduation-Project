// import { auth } from "@clerk/nextjs"
// import Replicate from "replicate";

// const replicateKey = process.env.REPLICATE_API_TOKEN

// if (!replicateKey) {
//     throw  Error ("REPLICATE_API_TOKEN is not set") 
// }

// const replicate = new Replicate({
//     auth: replicateKey,
// });
  
// export async function POST(req: Request) {
//     try {
//         const {userId } = auth()
//         if (!userId) {
//             return Response.json({error:"Unauthorized"}, {status:400})
//       }
//       console.log("Calling API...")
        
//         const data = await req.formData();

//         const prediction = await replicate.predictions.create({
//           //Audio-ldm Model
//           version: "b61392adecdd660326fc9cfc5398182437dbe5e97b5decfb36e1a36de68b5b95",
//           //the prompt that will be submitted by a form on the frontend
//           input: {
//             text: data.get("prompt"),
//             duration: "5.0",
//             n_candidates: 3,
//             guidance_scale: 2.5
//           },
//         });
      
//         console.log("Print return from Post method")
//         console.log(prediction)
      
//         return Response.json(prediction, { status: 201 })
//     } catch (error) {
//         console.error(error)
//         return Response.json({error: "Interval server error"}, {status: 500}) 
//     }
// }


import { error } from "console";
import Replicate from "replicate";
const replicate=new Replicate({
    auth:process.env.REPLICATE_API_TOKEN,
})

export async function POST(request:Request) {
    try{
        const requsetBody= await request.json();

        const inputPrompt=requsetBody.inputs

        if(!inputPrompt){
            throw new Error("Input Not Found")
        }
        const output = await replicate.run(
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
          console.log(output);

          return new Response (JSON.stringify({output}), {status:200})

      // @ts-ignore
    }catch(error: Error){
        console.log("Error from API: ", error.massage);
        throw Error(error.massage)
    }
    
}