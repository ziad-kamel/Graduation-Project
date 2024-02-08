import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
        {children}
        </ThemeProvider>
        <Image src={'/logo.png'} alt="parrot pic" draggable={false} width={80} height={80} style={{position:"fixed", right:"1rem" , bottom:"1rem"}}/>

      </body>
    </html>
    </ClerkProvider>
  );
}
