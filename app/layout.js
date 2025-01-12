import { Toaster } from "@/components/ui/toaster";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"]
});


export const metadata = {
  title: "Panache",
  description: "SR Groups of Institue, College Fest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
