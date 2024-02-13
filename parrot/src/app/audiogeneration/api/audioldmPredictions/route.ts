import replicate, { getAudio } from "@/lib/audio-ldm"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const {userId } = auth()
        if (!userId) {
            return Response.json({error:"Unauthorized"}, {status:400})
        }

        // const audioGenrated = await getAudio(input)

        const prediction = await replicate.predictions.create({
            // specific version of audio-ldm
            version: "b61392adecdd660326fc9cfc5398182437dbe5e97b5decfb36e1a36de68b5b95",
        
            //the text prompt that will be submitted by a form on the frontend
            input: { test: body.get("prompt") },
            webhook: "http://localhost:3000//api/audioldmPredictons/replicate-webhook",
            webhook_events_filter: ["completed"]
          });
        
          if (prediction?.error) {
            return new Response(
              JSON.stringify({ detail: prediction.error.detail }),
              { status: 500 }
            );
          }
        
          return new Response(
            JSON.stringify(prediction),
            { status: 201 }
          );

    } catch (error) {
        console.error(error)
        return Response.json({error: "Interval server error"}, {status: 500}) 
    }
}

