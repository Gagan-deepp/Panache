import { navData } from '@/lib/data'
import { Copyright, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='min-h-[30vh] bg-cream shadow-md' >
            <div className='w-[90%] mx-auto flex flex-col justify-between pt-10 pb-4 gap-4' >
                <div>
                    <div className='flex flex-col gap-4' >
                        <h1 className='sub-heading' > Browse The Fest </h1>
                        <div className='flex flex-col gap-2 mt-2' >
                            {navData.map((item) => (
                                <Link href={item.link} key={item.title}> {item.title} </Link>
                            ))}
                        </div>
                        <div className='flex gap-3' >
                            <Link href="/" className=' small_circle flex-center ' > <Instagram className=' text-cream size-5' /> </Link>
                            <Link href="/" className=' small_circle flex-center ' > <Youtube className=' text-cream size-5' /> </Link>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className='w-full flex-center text-xs tracking-wider pt-2 border-t-2 border-t-cream_black' > Copyright  <Copyright className='size-3 mx-1' />  2025 | Gagan | All rights reserved </div>
            </div>
        </footer>
    )
}

export default Footer