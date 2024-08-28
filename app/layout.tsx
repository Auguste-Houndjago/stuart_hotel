import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster"
import LocationFilter from "@/components/LocationFilter";
import MobileButton from "@/components/ui/ux/MobileButton";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stuart-hotel",
  description: "trouver l'hotel qui vous convient",
  icons: { icon: '/logo.svg' }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={inter.className}>

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          
            <Toaster/>

            <span className=" bg-[radial-gradient(circle_at_top_left,_#00000040,_transparent_50%),_radial-gradient(circle_at_bottom_right,_#00000040,_transparent_50%)] backdrop-blur-lg bg-opacity-30" >

            <main className="flex flex-col min-h-screen bg-sky-300 ">

       

            <section className="flex-grow " >

              <NavBar />
              <LocationFilter/>
        
                  <Container>
                      {children}
                  </Container>
                
                </section>
    
                
            
            </main>
            </span>
        
            
          
          
          </ThemeProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}

