import OpenAI from "openai"

const apiKey=process.env.OPENAI_API_KEY
if (!apiKey){
    throw  Error ("OPENAI_API_KEY is not set") 
}
const openai=new OpenAI({apiKey})

export default openai


// Making a function that make embedding for the input (text)
// takes an input 
export async function getEmbedding(text:string) {
    const response = await openai.embeddings.create({
        model:"text-embedding-ada-002", // we use text-embedding-ada-002 because cheap for the calling
        input: text // make embedings for the input of the function
    })
    
    const embedding = response.data[0].embedding // the embedding is a huge array of numbers

    if(!embedding) throw Error("Error generating embedding.") // Never happens
    console.log(embedding)
    return embedding
}