import Replicate from "replicate";

const replicateKey = process.env.REPLICATE_API_TOKEN

if (!replicateKey) {
    throw  Error ("REPLICATE_API_TOKEN is not set") 
}

const replicate = new Replicate({
    auth: replicateKey,
});
  
export default replicate 

export async function getAudio(prompt: string) {
    //const prompt = "A man is speaking under the water."

    const response = await replicate.run(
        "haoheliu/audio-ldm:b61392adecdd660326fc9cfc5398182437dbe5e97b5decfb36e1a36de68b5b95",
        {
          input: {
                text: prompt,
                duration:"15.0"
          }
        }
    );
    
    
    if (!response) throw Error("Error generating")
    console.log(response);
    return response
}



