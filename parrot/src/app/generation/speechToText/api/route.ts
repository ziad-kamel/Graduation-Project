import Replicate from "replicate";

// create a instance of replicate to call it's api models
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
    });


export async function POST(request: Request) {
    
    try {
        // Parse the request body as JSON
        const requestBody = await request.json();

        // destructure the data the parsed request body
        const  {audioURL} = requestBody.inputs

        //check for any of the inputs is not provided
        if(!audioURL){
            throw new Error("audioURL not found")
        }

        //call the model with the user input data
        //@ts-ignore
        const {transcription} = await replicate.run(
            "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
            {
                input: {
                    audio: audioURL,
                }
            }
        );
        
        // return the model results to the user
        return new Response(JSON.stringify({transcription}), {status: 200, headers:{"Content-Type": "application/json",}});
        //@ts-ignore
    } catch (error: Error) {
        // if an error occurs then throw it to be handled from the front-end {alert}
        console.log("Error from API: ", error.message);
        throw Error(error.message)
    }
    
}