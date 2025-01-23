import SearchForm from "@/components/SearchForm"
import { eventData } from '@/lib/eventData'
import Image from 'next/image'
import { EventPagination } from "@/components/EventPagination"


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
    const filteredEvents = search ? filterEvent(search) : eventData

    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container !min-h-[330px]  rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Events </h1>
                <h3 className="sub-heading tag !text-lg "> Unite, Celebrate, and Create Memories Together! </h3>

                <SearchForm search={search} />
            </section>
            <EventPagination events={filteredEvents} />
        </div>
    )
}

export default page
