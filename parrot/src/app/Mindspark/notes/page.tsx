import Note from "@/components/Note";
import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";


export const metadata:Metadata={
    title:"MindSpark-Note",

}
export default async function NotePage(){
const {userId} = auth()

if(!userId) throw Error("userId undefined");

const allNotes = await prisma.note.findMany({where:{userId}})

    return( 
    <div className="h-[35rem] ">
        <ScrollArea className="h-full">
            <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ">

        {allNotes.map((note) => (
            <Note note={note} key={note.id}/> // this note component we created that expect note and unique key
        ))}
        {allNotes.length === 0 && (
            <div className="col-span-full text-center text-white">
                {"You don't have any notes yet. Why don't you create one?"}
            </div>
        )}
            </div>
        </ScrollArea>
    
    </div>
    )
}


    
