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
        const  {audioURL, taskName, audioLanguage} = requestBody.inputs

        //check for any of the inputs is not provided
        if(!audioURL){
            throw new Error("audioURL not found")
        }
        if(!taskName){
            throw new Error("taskName not found")
        }
        if(!audioLanguage){
            throw new Error("audioLanguage not found")
        }

        //call the model with the user input data
        const apiOutput = await replicate.run(
            "vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c",
            {
                input: {
                    audio: audioURL,
                    task: taskName,
                    language: audioLanguage,
                }
            }
        );
        
        // return the model results to the user
        return new Response(JSON.stringify({apiOutput}), {status: 200, headers:{"Content-Type": "application/json",}});
    } catch (error: Error) {
        // if an error occurs then throw it to be handled from the front-end {alert}
        console.log("Error from API: ", error.message);
        throw Error(error.message)
    }
    
}