import { Note as NoteModel } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Creating interface bwcause we want to pass note data
interface NoteProps {
    note: NoteModel // note from prisma client
}
export default function Note({note}: NoteProps){
    // it will be the time now 
    const wasUpdated = note.updateAt > note.createdAt // will be true if we updated a note looks better

    // Here we want to render this in user readable form
    // will contain one of this two values in ternary operator form
    const createdUpdatedAtTimestamp = (
        wasUpdated ? note.updateAt : note.createdAt
    ).toDateString() // to make it in human readable form

    // then we return the ui
    return(
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>
                    {createdUpdatedAtTimestamp}
                    {wasUpdated && "(updated)"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-line">{note.content}</p>
            </CardContent>
        </Card>
    )
}