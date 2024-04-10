import NavBar from "@/components/NavBar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
          <NavBar/>
        
        <div className="flex h-full">
            {/* <SideBar/> */}
            {children}
        </div>
      </>
    );
  }