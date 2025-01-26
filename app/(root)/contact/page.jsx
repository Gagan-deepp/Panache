import Team from '@/components/Team'
import Image from 'next/image'

const page = () => {
    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container !min-h-[330px] rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Meet Our Team </h1>
                <p className='tag' > The Brains Behind The Breakthroughs </p>
            </section>

            <div className='w-full' >
                <Team />
            </div>
        </div>
    )
}

export default page
