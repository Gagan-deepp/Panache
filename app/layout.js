import { Toaster } from "@/components/ui/toaster";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Source_Sans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
