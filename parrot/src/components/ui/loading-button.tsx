// we use type instead of interface because then we can use union type to extend this component

import { Loader2 } from "lucide-react"
import { Button, ButtonProps } from "./button"

// we want it to take the props of the button from the shadcn Button
type LoadingButtonProps = {
    loading: boolean
} & ButtonProps


export default function ({
    children, // part of the normal button
    loading,
    ...props
}: LoadingButtonProps){
    return (
        <Button {...props} disabled={props.disabled || loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {children}
        </Button>
    )
}