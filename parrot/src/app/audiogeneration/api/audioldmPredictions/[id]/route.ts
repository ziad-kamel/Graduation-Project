import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

export async function GET(req: Request,
  { params }: { params: { id: string } }) {
  try {
    const prediction = await replicate.predictions.get(params.id);
  
    // console.log("Print return from get method")
    // console.log(prediction)
  
    return Response.json(prediction, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({error: "Interval server error"}, {status: 500}) 
  }
}