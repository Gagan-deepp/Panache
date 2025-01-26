"use client"
import { logout } from '@/lib/actions/auth'
import { motion } from "framer-motion"
import { navData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import MobileNavigation from './MobileNav'
import { usePathname } from 'next/navigation'
import NavAuth from './NavAuth'
import { useEffect, useState } from 'react'

const Navbar = ({ username }) => {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            setScrolled(scrollPosition > windowHeight * 0.9)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    const pathName = usePathname()

    return (
        <header className='px-6 py-2 fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md z-30 '  >
            <nav className='flex justify-between items-center' >
                {scrolled || pathName != "/" ?
                    <Link href="/" className='text-2xl uppercase ' >
                        <Image src="/black_logo.svg" width={130} height={50} quality={100} alt='logo' />
                    </Link> :
                    <Link href="/" className='text-2xl uppercase ' >
                        <Image src="/logo.svg" width={130} height={50} quality={100} alt='logo' />
                    </Link>}

                <div className='sm:flex items-center gap-5 text-base hidden' >

                    {navData.map((item) => {
                        const isActive = item.link === pathName;
                        return (
                            <Link href={item.link} key={item.title} className={`group relative ${!isActive && "hover:scale-[0.8]"} ${isActive && "scale-[0.8] "}  transition-all duration-500 ease-[0.65, 0, 0.35, 1] ${scrolled || pathName != "/" ? "text-black-3" : "text-white-1"}`} >
                                <div className={`  ${scrolled || pathName != "/" ? "group-hover:text-black-3/60" : "group-hover:text-white/60"} `} >
                                    {item.title}
                                </div>
                                {isActive && <motion.div layoutId='nav_circle' className='w-1 h-1 text-center bg-black-hover rounded-full  absolute -bottom-2 left-1/2' />}
                            </Link>
                        )
                    })}

                    {username ? (
                        <>
                            <NavAuth pathName={pathName} scrolled={scrolled} />

                            <form action={logout}>
                                <button className={`${scrolled || pathName != "/" ? "text-black-3" : "text-white-1"} group relative hover:scale-[0.8] transition-all duration-500 ease-[0.65, 0, 0.35, 1] `} >
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