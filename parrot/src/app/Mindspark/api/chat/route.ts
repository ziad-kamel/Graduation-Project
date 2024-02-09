import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import {OpenAIStream, StreamingTextResponse} from "ai"

export async function POST(req:Request) {

    try {
        const body = await req.json();
        // This the type of openai Accept
        const messages: ChatCompletionMessage[] = body.messages;

        // This array of messages
        const messagesTruncated = messages.slice(-6) // want the bot to remember the last 6 messages that has been passed because we don't want the embedding to long for ai issues

        const embedding = await getEmbedding(
            // we want a single string from this array of messages
            messagesTruncated.map((message) => message.content).join("\n") // want this messages with line breaking
        )
        //Testing
        // -It will be like that
        // Hey, what's my manhawa 
        // Your manhawa is soloLeveling
        // Thank you 

        const {userId} = auth();
        // To go to pinecone and get the meassages that is similar to our vector embedding ones (The meaning are similar)
        const vectorQueryResponse = await notesIndex.query({ // pinecone we exported
            vector: embedding,
            topK: 1, // this topk the result we want to return from chatgpt if we want more we will increase it but the free tier we want to ask about 4 different notes
            filter: {userId} // we want to filter it with this particular user
        })

        const relevantNotes = await prisma.note.findMany({
            where:{
                id:{
                    // That return the ids that from mongodb to pincone
                    in: vectorQueryResponse.matches.map((match) => match.id) // the result we get back from pincone we want to take each map to the id
                }
            }
        })

        //Testing
        console.log("Relevant notes found: ", relevantNotes)

        const systemMessage: ChatCompletionMessage ={
            role:"assistant", // For instructions
            content: "You are an intelligent note-taking app. You answer the user's question based on their existing notes." + // each message needs a contenet
            "The relevant notes for this query are:\n" +
            relevantNotes.map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`).join("\n\n")
        }
        //Testing
        // Title: manhawa
        // Content:
        // the content of the manhawa

        // making the response to chatgpt
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // cheapest one 🙂
            stream: true,
            messages: [systemMessage, ...messagesTruncated] // to send last 6 messages
        })
         // for the frontend 🙂
        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    } 
}