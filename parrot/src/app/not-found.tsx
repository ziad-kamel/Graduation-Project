import { Metadata } from "next";
import Link from "next/link";

export const metadata:Metadata={
  title:"page not found",
  icons: 'parrot.svg'
}

export default function NotFound() {
  return (
    <main className="text-center h-full flex justify-center items-center">
        <div>
            <img src="/notFound.png" width={500} height={200} alt="not found"/>
            <h1 className="text-3xl">Error 404 page not found</h1>
            <p>We could not find the page you were looking for.</p>
            <p>Go back to the <Link href={'/home'} className="underline">Home page</Link></p>
        </div>
    </main>
  )
}
