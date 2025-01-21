import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import LargeEventCard from '@/components/web_comp/LargeEventCard'
import { eventData } from '@/lib/eventData'
import Image from 'next/image'

const page = () => {
    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container !min-h-[330px]  rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Events </h1>
                <h3 className="sub-heading"> Unite, Celebrate, and Create Memories Together! </h3>
            </section>
            <Dialog >
                <div className="card_grid" >
                    {
                        eventData.map((event) => {
                            return (
                                <div key={event.name} className="mt-8" >
                                    <DialogTrigger>
                                        <LargeEventCard event={event} />
                                    </DialogTrigger>
                                    <DialogContent>
                                        "TEst content"
                                    </DialogContent>
                                </div>
                            )
                        })
                    }
                </div>
            </Dialog>
        </div>
    )
}

export default page
