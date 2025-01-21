import UpdateForm from '@/components/UpdateForm'
import { auth } from '@/lib/actions/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'


const page = async () => {

    const session = await auth()

    if (session.role != "admin") redirect('/login')
    return (
        <div className='section_container' >
            <section className="grey_container !min-h-[330px]  rounded-3xl relative mt-12" >
                <Image src="/2.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Student <br /> Updation </h1>
            </section>

            <div className="w-full mt-12 ">
                <div value="single">
                    <h1 className='sub-heading my-8 ' > Update User  </h1>
                    <UpdateForm />
                </div>
            </div>
        </div>
    )
}

export default page