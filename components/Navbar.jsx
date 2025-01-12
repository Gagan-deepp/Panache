import { auth } from '@/lib/actions/auth'
import Link from 'next/link'

const Navbar = async () => {
    const session = await auth()
    return (
        <header className='px-6 py-2 shadow-sm fixed top-0 left-0 right-0 bg-white z-50'  >
            <nav className='flex justify-between items-center' >
                <Link href="/" className='text-2xl uppercase ' > Panache </Link>

                <div className='flex items-center gap-5 text-base' >
                    {
                        session && session?.username ?
                            (
                                <>
                                    <Link href="/register" > Registration </Link>
                                    <Link href="/view" > View Participants </Link>
                                </>
                            )
                            : (
                                <>
                                    <Link href="/login" > Login </Link>
                                    <Link href="/view" > View Participants </Link>
                                </>

                            )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar