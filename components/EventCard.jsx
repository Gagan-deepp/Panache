import { IndianRupee, MapPin } from "lucide-react"
import Image from "next/image"

const EventCard = ({ event }) => {
    return (
        <div className="flex flex-col p-4 gap-6 event_card" >
            <div className="relative min-h-[8rem] w-full rounded-xl" >
                <Image src="/1.png" fill={true} alt="event_background" className="object-cover aspect-square rounded-xl" />
            </div>

            <div>
                <h3> {event.name} </h3>
                <em> {event.name} </em>
            </div>

            <div className="w-full flex items-center justify-between" >
                <div className="flex gap-1 items-center" > <MapPin className="size-4" /> <span className="text-xs" > {event.location || "CS Seminar"} </span> </div>
                <div className="flex gap-1 items-center" > <IndianRupee className="size-3" /> <span className="text-xs" > {event.cost || "50"} </span></div>
            </div>
        </div>
    )
}

export default EventCard
