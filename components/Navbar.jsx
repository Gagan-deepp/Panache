"use client"
import { logout } from '@/lib/actions/auth'
import { motion } from "framer-motion"
import { navData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import MobileNavigation from './MobileNav'
import { usePathname } from 'next/navigation'
import NavAuth from './NavAuth'

const Navbar = ({ username }) => {

    const pathName = usePathname()

    return (
        <header className='px-6 py-2 shadow-sm fixed top-0 left-0 right-0 bg-white z-50'  >
            <nav className='flex justify-between items-center' >
                <Link href="/" className='text-2xl uppercase ' >
                    <Image src="/logo.svg" width={130} height={50} quality={100} alt='logo' />
                </Link>

                <div className='sm:flex items-center gap-5 text-base hidden' >

                    {navData.map((item) => {
                        const isActive = item.link === pathName;
                        return (
                            <Link href={item.link} key={item.title} className={`group relative ${!isActive && "hover:scale-[0.8]"} ${isActive && "scale-[0.8] "}  transition-all duration-500 ease-[0.65, 0, 0.35, 1]`} >
                                <div className={` group-hover:text-black-2`} >
                                    {item.title}
                                </div>
                                {isActive && <motion.div layoutId='nav_circle' className='w-1 h-1 text-center bg-black-hover rounded-full  absolute -bottom-2 left-1/2' />}
                            </Link>
                        )
                    })}

                    {username ? (
                        <>
                            <NavAuth />
                            
                            <form action={logout}>
                                <button>
                                    Logout
                                </button>
                            </form>
                        </>) : (
                        <>
                            <Link href="/login" > Login </Link>
                        </>
                    )}
                </div>
                <MobileNavigation username={username} />
            </nav>
        </header>
    )
}

export default Navbar