// import Error from "next/error";
import Replicate from "replicate";
import {auth} from "@clerk/nextjs";
// import type { NextApiRequest, NextApiResponse } from "next";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

if (!replicate) {
  throw  Error ("REPLICATE_API_TOKEN is not set") 
}


export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { audioURL } = requestBody.inputs;

    if (!audioURL) {
      throw new Error("audioURL not found");
    }
  
    //call model with user input data
    const apiOutput = await replicate.run(
      "lucataco/resemble-enhance:93266a7e7f5805fb79bcf213b1a4e0ef2e45aff3c06eefd96c59e850c87fd6a2",
      {
        input: {
          solver: "Midpoint",
          input_audio: "audioURL",
          denoise_flag: false,
          prior_temperature: 0.5,
          number_function_evaluations: 64


        },
      }
    );
    // return the model results to the user
    return new Response(JSON.stringify({ apiOutput }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // if an error occurs then throw it to be handled from the front-end {alert}
    console.log("Error from API: ", error.message);
    throw Error(error.message);
  }
}

//   if (req.method === "POST") {
//     // Extract the URL of the uploaded audio file from the request body
//     const { audioUrl } = req.body;

//     if (!audioUrl) {
//       return res.status(400).json({ error: "Audio URL is missing." });
//     }

//     const input = {
//       solver: "Midpoint",
//       input_audio: audioUrl,
//       denoise_flag: false,
//       prior_temperature: 0.5,
//       number_function_evaluations: 64,
//     };

//     try {
//       // Call the Replicate API for audio cleanup
//       const output = await replicate.run(
//         "lucataco/resemble-enhance:93266a7e7f5805fb79bcf213b1a4e0ef2e45aff3c06eefd96c59e850c87fd6a2",
//         { input }
//       );

//       // Send the enhanced audio back to the client
//       res.status(200).json({ enhancedAudio: output });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while processing the request." });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
