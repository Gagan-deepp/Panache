import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }) {
    return (
        <main>
            <Navbar/>
            {children}
            <Footer />
        </main>
    );
}
