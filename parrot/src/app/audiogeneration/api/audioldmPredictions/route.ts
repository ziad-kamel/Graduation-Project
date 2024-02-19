import { auth } from "@clerk/nextjs"
import Replicate from "replicate";

const replicateKey = process.env.REPLICATE_API_TOKEN

if (!replicateKey) {
    throw  Error ("REPLICATE_API_TOKEN is not set") 
}

const replicate = new Replicate({
    auth: replicateKey,
});
  
export async function POST(req: Request) {
    try {
        const {userId } = auth()
        if (!userId) {
            return Response.json({error:"Unauthorized"}, {status:400})
      }
      console.log("Calling API...")
        
        const data = await req.formData();

        const prediction = await replicate.predictions.create({
          //Audio-ldm Model
          version: "b61392adecdd660326fc9cfc5398182437dbe5e97b5decfb36e1a36de68b5b95",
          //the prompt that will be submitted by a form on the frontend
          input: {
            text: data.get("prompt"),
            duration: "5.0",
            n_candidates: 3,
            guidance_scale: 2.5
          },
        });
      
        console.log("Print return from Post method")
        console.log(prediction)
      
        return Response.json(prediction, { status: 201 })
    } catch (error) {
        console.error(error)
        return Response.json({error: "Interval server error"}, {status: 500}) 
    }
}

