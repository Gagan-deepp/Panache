import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/actions/auth";

export default async function RootLayout({ children }) {
    const session = await auth();
    return (
        <main>
            <Navbar username={session.username} />
            {children}
            <Footer />
        </main>
    );
}
