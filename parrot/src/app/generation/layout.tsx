import SideBar from "@/components/SideBar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex flex-row h-full">
            <SideBar/>
            {children}
        </div>
    );
  }