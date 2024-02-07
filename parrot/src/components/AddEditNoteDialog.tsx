import { CreateNoteSchema, createNoteSchema } from "@/lib/validation/note"
import { useForm } from "react-hook-form"
import {zodResolver}from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import LoadingButton from "./ui/loading-button"
import { useRouter } from "next/navigation"
import { Note } from "@prisma/client"
import { useState } from "react"
interface AddEditNoteDialogProps {
    open: boolean // deside if the dialog will be showm or not
    setOpen: (open: boolean) => void, // we will triger this callback when we click close button inside the dialog
    noteToEdit?: Note
}


export default function AddEditNoteDialog({open, setOpen, noteToEdit}: AddEditNoteDialogProps){
    const [deleteInProgress, setDeleteInProgress] = useState(false)
    const router = useRouter()
// this tells the hook form what the data we want in this form
const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),   // what the acctual form validation with the acctual zod schema not just a type

    // we made this because we made the lenght in zod schema min(1) to type the message we want
    defaultValues: {
        title: noteToEdit?.title || "",
        content: noteToEdit?.content || ""
    }
}) // this component shadcn usese to get the form component useForm


  // this the data we excpect
 async function onSubmit(input:CreateNoteSchema) {
     try {
         if (noteToEdit) {
            const response = await fetch("/Mindspark/api/notes", {
                method: "PUT", // To make a post request
                body: JSON.stringify({
                    id: noteToEdit.id,
                    ...input
                })
            })
            if (!response.ok) {
                throw Error("Status code: " + response.status)
            }
         } else {
             // make a request to our backend route handler
        const response = await fetch("/Mindspark/api/notes", {
            method: "POST", // To make a post request
            body: JSON.stringify(input)
        })
        
        if (!response.ok) {
            throw Error("Status code: " + response.status)
        }
        form.reset()
        }
        
        router.refresh() //refresh the server component
        setOpen(false) // to change the state

    } catch (error) {
        console.error(error)
        alert("Something went wrong. Please try again.")
    }
    }
    
    async function deleteNote() {
        if (!noteToEdit) return 
        setDeleteInProgress (true)
        try {
            const response = await fetch("/Mindspark/api/notes", {
                method: "DELETE", // To make a delete request
                body: JSON.stringify({
                    id: noteToEdit.id,
                })
            })
            if (!response.ok) {
                throw Error("Status code: " + response.status)
            }
            router.refresh() //refresh the server component
            setOpen(false) // to change the state
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setDeleteInProgress(false)
        }
}

 return (
    // open : if the dialog is opened and setopen trigered if we close the Dialog
    // the way form work described more in shadcn documentation
    //<FormMessage /> : automaticaly shows the error message from the createnoteshema("Title is required")
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                 <DialogTitle>
                     {noteToEdit?"Edit Note": "Add Note"}
                </DialogTitle>
            </DialogHeader>
            <Form {...form}> 
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                    control={form.control} //control single input field in the form
                    name="title" // the name of the form we told hook form we expect CreateNoteSchema
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Note title</FormLabel>
                            <FormControl>
                                <Input placeholder="Note title" {...field}/>
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )} //render the input field itself
                    
                    />
                    
                    <FormField
                    control={form.control} //control single input field in the form
                    name="content" // the name of the form we told hook form we expect CreateNoteSchema
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Note content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Note content" {...field}/>
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )} //render the input field itself
                    />
                     <DialogFooter className="gap-1 sm:gap-0">
                         {noteToEdit && (
                             <LoadingButton
                                 variant="destructive"
                                 loading={deleteInProgress}
                                 disabled={form.formState.isSubmitting}
                                 onClick={deleteNote}
                                 type="button"
                             >
                                 Delete note
                             </LoadingButton>
                         )}
                         <LoadingButton type="submit"
                             loading={form.formState.isSubmitting}
                             disabled={deleteInProgress}
                         >
                            Submit
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
 )
}