"use client"
import { Note as NoteModel } from "@prisma/client";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Creating interface bwcause we want to pass note data
interface NoteProps {
    note: NoteModel // note from prisma client
}
export default function Note({ note }: NoteProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)
    // it will be the time now 
    const wasUpdated = note.updateAt > note.createdAt // will be true if we updated a note looks better

    // Here we want to render this in user readable form
    // will contain one of this two values in ternary operator form
    const createdUpdatedAtTimestamp = (
        wasUpdated ? note.updateAt : note.createdAt
    ).toDateString() // to make it in human readable form

    // then we return the ui
    return (
        <div>
            <Card className="cursor-pointer transition-shadow hover:shadow-lg "
            onClick={()=> setShowEditDialog(true)}
            >
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
            <AddEditNoteDialog
                open={showEditDialog}
                setOpen={setShowEditDialog}
                noteToEdit={note}
            />
            </div>
    )
}