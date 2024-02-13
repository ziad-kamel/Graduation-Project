import Replicate from "replicate";

const replicateKey = process.env.REPLICATE_API_TOKEN

if (!replicateKey) {
    throw  Error ("REPLICATE_API_TOKEN is not set") 
}

const replicate = new Replicate({
    auth: replicateKey,
  });

export async function getAudio(text: string) {
    const response = await replicate.run(
        "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        {
          input: {
                model_version: "stereo-melody-large",
                prompt: text,
                duration: 15,
                top_k:1
            }
        }
      );

    if (!response) throw Error("Error generating")
    console.log(response);
    return response
}


