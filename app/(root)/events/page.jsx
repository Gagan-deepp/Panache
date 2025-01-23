import EventCard from "@/components/EventCard"
import EventContent from "@/components/EventContent"
import SearchForm from "@/components/SearchForm"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import LargeEventCard from '@/components/web_comp/LargeEventCard'
import { filterEvent } from "@/lib/actions/Events"
import { eventData } from '@/lib/eventData'
import Image from 'next/image'

const page = async ({ searchParams }) => {
    const search = (await searchParams).search || null

    const filterEvent = (text) => {
        // Convert the input text to lowercase for case-insensitive comparison
        const lowerCaseText = text.toLowerCase();

        // Filter the eventData
        return eventData.filter(event => {
            // Check if the text matches any of the specified fields
            return (
                event.category.toLowerCase().includes(lowerCaseText) ||
                event.name.toLowerCase().includes(lowerCaseText) ||
                event.venue.toLowerCase().includes(lowerCaseText) ||
                event.faculty.toLowerCase().includes(lowerCaseText)
            );
        });
    };
    const searchData = search && filterEvent(search)
    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container !min-h-[330px]  rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Events </h1>
                <h3 className="sub-heading tag !text-lg "> Unite, Celebrate, and Create Memories Together! </h3>

                <SearchForm search={search} />
            </section>
            <div className="card_grid mt-8" >
                {
                    (searchData ? searchData : eventData).map((event) => {
                        return (
                            <Dialog key={event.name} className="mt-8" >
                                <DialogTrigger asChild className="w-full h-full" >
                                    <LargeEventCard event={event} />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
                                    <EventContent event={event} />
                                </DialogContent>
                            </Dialog>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page
