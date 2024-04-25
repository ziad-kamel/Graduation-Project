import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center h-full flex justify-center items-center">
        <div>
            <img src="/notFound.png" width={500} height={200} alt="not found"/>
            <p>We could not find the page you were looking for.</p>
            <p>Go back to the <Link href={'/home'} className="underline">Home page</Link></p>
        </div>
    </main>
  )
}
