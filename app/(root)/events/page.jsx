import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Events </h1>
                <h3 className="sub-heading"> Unite, Celebrate, and Create Memories Together! </h3>
            </section>

        </div>
    )
}

export default page
