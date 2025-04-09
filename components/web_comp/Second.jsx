"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

const Second = () => {
    const [count, setCount] = useState(0)
    const handleClick = (type) => {
        if (count === 10) {
            setCount(0)
            alert(type === "srgi" ? "College chutiya hai !!" : "Fuck Panache")
            return
        }
        setCount(prev => prev + 1)
    }
    return (
        <div>
            <section className="section flex-col sm:flex-row sm:max-h-[70dvh]" >

                <div className="w-full flex flex-col gap-8 py-4 " >
                    <div className="flex gap-2 items-center" >
                        <div className="h-1 w-8 main_bg rounded-xl" />
                        <h1 className="title_heading uppercase textColor" > About SRGI </h1>
                    </div>

                    <div className="flex flex-col gap-4" >
                        SRGI aims to emerge as a center of excellence of national and global repute, fostering innovation and nurturing young minds to excel in their chosen fields while contributing meaningfully to society and industry.
                        <span>
                            SRGI is dedicated to empowering students by providing quality education, a multidisciplinary platform, and a dynamic learning environment. The institution focuses on building professional competence, enhancing employability, and meeting global standards through continuous improvement in teaching methodologies and industry-aligned programs.
                        </span>
                    </div>
                </div>

                <motion.div whileTap={{ scale: 0.9 }} transition={{ ease: "easeInOut", duration: 0.4 }} className="relative w-full aspect-square rounded-xl cursor-pointer " onClick={() => handleClick("srgi")} >
                    <Image src="/srgi.avif" fill={true} className="object-cover rounded-xl" alt="banner" />
                </motion.div>
            </section>


            <section className="w-full bg-transparent sm:max-h-[70dvh] flex gap-12 py-10 rounded-3xl mt-12 flex-col sm:flex-row-reverse" >

                <div className="w-full flex flex-col gap-8 py-4 " >
                    <div className="flex gap-2 items-center" >
                        <div className="h-1 w-8 main_bg rounded-xl" />
                        <h1 className="title_heading uppercase textColor" > About PANACHE </h1>
                    </div>

                    <div className="flex flex-col gap-4" >
                        Panache is the ultimate celebration of talent, innovation, and creativity! It’s more than just a college fest—it's a vibrant platform where minds meet, ideas collide, and memories are created.
                        With an exciting mix of cyber events, cultural showcases, technical challenges, and general events, Panache offers something for everyone.

                        <span>
                            Join us to experience the energy, the thrill, and the spirit of togetherness as we celebrate excellence and diversity. Panache is where the ordinary transforms into the extraordinary. Stay tuned and be part of the legacy!
                        </span>
                    </div>
                </div>

                <motion.div whileTap={{ scale: 0.9 }} transition={{ ease: "easeInOut", duration: 0.4 }} className="relative w-full aspect-square rounded-xl " onClick={() => handleClick("panache")} >
                    <Image src="/panache.jpg" fill={true} className="object-cover rounded-xl" alt="banner" />
                </motion.div>
            </section>
        </div>
    )
}

export default Second