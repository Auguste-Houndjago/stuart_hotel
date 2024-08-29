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
import MobileNavBar from "@/components/ui/ux/MobileNavbar";
import Navbar from "@/components/ui/ux/MobileNavbar";
import MobileNavbar from "@/components/ui/ux/MobileNavbar";


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
            <main className="flex flex-col min-h-screen bg-sky-300 dark:bg-secondary ">
            <section className="flex-grow " >

              <NavBar />
              <LocationFilter/>
        
                  <Container>
                      {children}
                  </Container>
                
                </section>
                <span className="flex md:hidden"><MobileNavbar/></span>
                
            </main>
           

           <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

