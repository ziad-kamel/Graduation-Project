import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bird, Bot, Brain, PawPrint } from "lucide-react"
import Link from "next/link"

export function CustomePopover() {

  return (
    <Popover>
      <PopoverTrigger asChild className="fixed right-4 bottom-4 ">
        <Button variant="outline" className="rounded-full w-12 h-12 p-0">
            <Bird />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-fit m-4 bg-transparent grid gap-4 border-none">
            <Link href={`${process.env.MIND_SPARK_URL}`} target="_blank">
                <Button>
                    <Brain/>
                </Button>
            </Link>
        
            <Link href={`${process.env.ECHO_URL}`} target="_blank">
                <Button>
                    <PawPrint/>
                </Button>
            </Link>
        
            <Link href={'/'}>
                <Button>
                    <Bot/>
                </Button>
            </Link>
      </PopoverContent>
    </Popover>
  )
}
