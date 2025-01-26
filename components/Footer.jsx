import { navData } from '@/lib/data'
import { Copyright, Dot, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='min-h-[20vh] bg-cream shadow-md' >
            <div className='w-[90%] mx-auto flex flex-col items-center justify-center pt-10 pb-4 gap-4' >
                <div className='flex flex-col gap-4 w-full items-center justify-center' >
                    <Link href="/" className='text-2xl uppercase ' >
                        <Image src="/black_logo.svg" width={130} height={50} quality={100} alt='logo' />
                    </Link>
                    <div className='flex gap-5 mt-2 flex-wrap' >
                        {navData.map((item) => (
                            <Link href={item.link} key={item.title} className='text-sm flex gap-2 items-center' > <Dot /> {item.title} </Link>
                        ))}
                    </div>
                    <div className='flex gap-3' >
                        <Link href="/" className=' small_circle flex-center ' > <Instagram className=' text-cream size-5' /> </Link>
                        <Link href="/" className=' small_circle flex-center ' > <Youtube className=' text-cream size-5' /> </Link>
                    </div>
                </div>
                <div className='w-full flex-center text-xs tracking-wider pt-2 border-t-2 border-t-cream_black' > Copyright  <Copyright className='size-3 mx-1' />  2025 | Gagan | All rights reserved </div>
            </div>
        </footer>
    )
}

export default Footer