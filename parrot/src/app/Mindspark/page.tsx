import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"
import Link from "next/link"

export default function Home (){
    return(
        <main className="flex flex-col h-full items-center justify-center gap-5 text-white">
            <div className="flex items-center gap-4">
                <Image src={logo} alt="MindSpark logo" width={100} height={100} />
                <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">MindSpark</span>
            </div>
            <p className="max-w-prose text-center">
                An inteligent note-taking app ai integration,built with OpenAI, pinecone, Next.js, shadcnUi, Clerk and more 
            </p>
            <Button size="lg" asChild>
                <Link href="Mindspark/notes">Open </Link>
            </Button>
        </main>
    );
}