import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/Container";
import { Toaster } from "@/components/ui/toaster"
import LocationFilter from "@/components/LocationFilter";
import MobileNavbar from "@/components/ui/ux/MobileNavbar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest:"/manifest.json",
  title: "infinite_hotel",
  description: "trouver la chambre qui vous convient",
  icons: { icon: '/Logo.png' }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
            <main className="flex svg flex-col min-h-screen bg-sky-300 dark:bg-secondary ">
            <section className="flex-grow " >

              <NavBar />
              <LocationFilter/>
        
                  <Container>
                      {children}
                  </Container>
                
                </section>

                
            </main>
           
            <span className="hidden w-full max-h-20 static bottom-0 "><MobileNavbar/> </span>

           <script type="module" async src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script async  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>

          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

