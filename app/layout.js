import { Toaster } from "@/components/ui/toaster";
import { Source_Sans_3 } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import { auth } from "@/lib/actions/auth";
import AuthHydration from "@/components/AuthHydration";

const Source_Sans = Source_Sans_3({
  variable: "--font-source_sans",
  subsets: ["latin"],
  style: "italic",
  weight: ["200", "300", "400", "500", "600", "700"]
});


export const metadata = {
  title: "Panache",
  description: "SR Groups of Institue, College Fest",
};

export default async function RootLayout({ children }) {

  const user = await auth()
  const initialUsername = user?.username || null

  return (
    <html lang="en">
      <body className={`${Source_Sans.variable} antialiased`}>
        <AuthHydration initialUsername={initialUsername} />
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
