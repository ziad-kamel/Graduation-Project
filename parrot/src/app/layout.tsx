import { CustomePopover } from "@/components/Popover";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";


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
          <EdgeStoreProvider>
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
          </EdgeStoreProvider>
        {/* <Link href={`${process.env.MIND_SPARK_URL}`} target="_blank">
          <Image src={'/mindspark-logo.png'} alt="mindspark pic" draggable={false} width={60} height={60} style={{position:"fixed", right:"1rem" , bottom:"1rem"}}/>
        </Link> */}

        <CustomePopover/>
      </body>
    </html>
    </ClerkProvider>
  );
}