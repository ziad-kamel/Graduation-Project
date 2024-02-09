import { notesIndex } from "@/lib/db/pinecone"
import prisma from "@/lib/db/prisma"
import { getEmbedding } from "@/lib/openai"
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "@/lib/validation/note"
import {auth} from "@clerk/nextjs"
export async function POST(req: Request){
    try{
        const body = await req.json()

        const parseResult = createNoteSchema.safeParse(body)

        if (!parseResult.success){
            console.error(parseResult.error)
            return Response.json({error:"Interval server error"}, {status: 400})
        }


        const {title, content} = parseResult.data

        const {userId} = auth()

        if (!userId){
            return Response.json({error:"Unauthorized"}, {status: 401})

        }

        // we want to generate the embeddings
        const embedding = await getEmbedingForNote(title, content)
        // store this embeddings to search for in pinecone
        // if the database fail for some reason we don't to save the note without the embedding and vice versa
        // we can do this by wraping this to operation in transaction
        // multiple database operation

        const note = await prisma.$transaction(async (tx) =>{
            const note = await tx.note.create({ // to be part of transaction
                data: {
                    title,
                    content,
                    userId
                }
            })

            // upsert for making entry in pinecone database
            await notesIndex.upsert([
                // defining the data we want to store in pinecone
                {
                    id: note.id,
                    values: embedding,
                    metadata: {userId} // the embedding for a particular user
                }
            ])
            return note

        })

        

        return Response.json({note}, {status: 201})

    }catch(error){
        console.error(error)
        return Response.json({error: "Interval server error "}, {status: 500}) 
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json()

        const parseResult = updateNoteSchema.safeParse(body)

        if (!parseResult.success){
            console.error(parseResult.error)
            return Response.json({error:"Interval server error"}, {status: 400})
        }


        const { id, title, content } = parseResult.data
        const note = await prisma.note.findUnique({ where: { id } })
        if (!note) {
            return Response.json({error: "Note not found"}, {status: 404});
        }

        const {userId} = auth()

        if (!userId || userId !== note.userId){
            return Response.json({error:"Unauthorized"}, {status: 401})
        }

        // the embedding part as above
        const embedding = await getEmbedingForNote(title, content)

        const updatedNote = await prisma.$transaction(async (tx) => {
            const updatedNote = await tx.note.update({
                where: { id }, 
                data: {
                    title,
                    content
                }
            })

            await notesIndex.upsert([
                {
                    id, // id of the note we updating
                    values: embedding,
                    metadata: {userId}
                }
            ])
            return updatedNote
        })

        
        return Response.json({updatedNote}, {status: 200})
    } catch (error) {
        console.error(error)
        return Response.json({error: "Interval server error "}, {status: 500}) 
    }
}

export async function DELETE (req: Request) {
    try {
        const body = await req.json()

        const parseResult = deleteNoteSchema.safeParse(body)

        if (!parseResult.success){
            console.error(parseResult.error)
            return Response.json({error:"Interval server error"}, {status: 400})
        }


        const {id} = parseResult.data
        const note = await prisma.note.findUnique({ where: { id } })
        if (!note) {
            return Response.json({error: "Note not found"}, {status: 404});
        }

        const {userId} = auth()

        if (!userId || userId !== note.userId){
            return Response.json({error:"Unauthorized"}, {status: 401})
        }

        await prisma.$transaction(async (tx) => {
            await tx.note.delete ({where: {id}})
            await notesIndex.deleteOne(id)
        })

        

        return Response.json({message: "Note deleted"}, {status: 200})
    } catch (error) {
        console.error(error)
        return Response.json({error: "Interval server error "}, {status: 500}) 
    }
}

// For structuring the upcoming note
async function getEmbedingForNote(title:string, content: string | undefined) {
    return getEmbedding(title + "\n \n" + content ?? "")
}