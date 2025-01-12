import LoginForm from '@/components/LoginForm'
import { auth } from '@/lib/actions/auth'
import Image from 'next/image'
const page = async () => {
    const session = await auth()

    return (
        <div className='section_container' >

            <section className="grey_container rounded-3xl relative mt-8" >
                <Image src="/2.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Admin <br /> Login </h1>
            </section>

            <LoginForm />
        </div>
    )
}

export default page