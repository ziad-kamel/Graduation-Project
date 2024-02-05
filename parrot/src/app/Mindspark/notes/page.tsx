import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs"
import { Metadata } from "next"


export const metadata:Metadata={
    title:"MindSpark-Note",

}
export default async function NotePage(){
const {userId} = auth()

if(!userId) throw Error("userId undefined");

const allNotes = await prisma.note.findMany({where:{userId}})

    return <div>{JSON.stringify(allNotes)}</div>
}


    
