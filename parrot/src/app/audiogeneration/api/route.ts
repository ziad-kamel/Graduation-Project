import Replicate from "replicate";

export async function POST(request: Request) {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });
        
        const requestBody = await request.json();
        const {model_version, prompt, duration, normalization_strategy} = requestBody;
    
        if(!model_version){
            throw new Error("model version not specified")
        }
    
        if(!prompt){
            throw new Error("prompt not specified")
        }
    
        if(!duration){
            throw new Error("duration not specified")
        }
    
        if(!normalization_strategy){
            throw new Error("normalization strategy not specified")
        }

        const output = await replicate.run(
            "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
            {
            input: {
                prompt: prompt,
                duration: duration,
                model_version: model_version,
                normalization_strategy: normalization_strategy,
                }
            }
        );
        console.log(output);
    
        console.log(requestBody);
        
        return Response.json({output});
    } catch (error) {
        // @ts-ignore
        return Response.json({Error_message: error.message})
    }
}