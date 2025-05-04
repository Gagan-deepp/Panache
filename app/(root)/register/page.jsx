import Image from 'next/image'
import { auth } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import RegisterForm from '@/components/RegisterForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GroupForm from '@/components/GroupForm'
import ClosedRegistration from '@/components/web_comp/ClosedRegistration'


const page = async () => {

    const session = await auth()

    if (session.role != "admin") redirect('/login')
    return (
        <div className='section_container' >
            <section className="grey_container rounded-3xl relative mt-12" >
                <Image src="/2.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Student <br /> Registration </h1>
            </section>


            <ClosedRegistration />

            {/* <Tabs defaultValue="single" className="w-full mt-12 ">
                <TabsList className="tab" >
                    <TabsTrigger value="single" className="tab" >Single Event</TabsTrigger>
                    <TabsTrigger value="group" className="tab" >Group Event</TabsTrigger>
                </TabsList>

                <TabsContent value="single">
                    <h1 className='sub-heading my-8 textColor' > Single Person Event </h1>
                    <RegisterForm />
                </TabsContent>
                <TabsContent value="group">
                    <h1 className='sub-heading my-8 textColor' > Group Event </h1>
                    <GroupForm />
                </TabsContent>
            </Tabs> */}
        </div>
    )
}

export default page