

import Replicate from "replicate";


export async function POST(request: Request) {
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    const requestBody = await request.json();
    const { audioURL } = requestBody.inputs;

    if (!audioURL) {
      throw new Error("audioURL not found");
    }

    // Call model with user input data
    // @ts-ignore
    const [denoised, enhanced] = await replicate.run(
      "lucataco/resemble-enhance:93266a7e7f5805fb79bcf213b1a4e0ef2e45aff3c06eefd96c59e850c87fd6a2",
      {
        input: {
          solver: "Midpoint",
          input_audio: audioURL,
          denoise_flag: false,
          prior_temperature: 0.5,
          number_function_evaluations: 64,
        },
      }
    );
    
    // Return the model results to the user
    return new Response(JSON.stringify({ denoised, enhanced }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Explicitly specify the type as 'any'
    // If an error occurs then throw it to be handled from the front-end {alert}
    console.log("Error from API: ", error.message);
    throw new Error(error.message);
  }
}
