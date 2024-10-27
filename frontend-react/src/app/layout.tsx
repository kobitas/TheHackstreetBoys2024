import { Source_Sans_3, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-source-sans",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Fulda Hackathon",
  description: "from the hackstreetsboy",
  icons: {
    icon: [{ url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${poppins.variable}`}>
      <body className="bg-background min-h-screen font-sourceSans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
