import { CalendarIcon, MapPinIcon, UserIcon, GiftIcon, BookOpenIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const EventContent = ({ event }) => {
    const { category, date, venue, faculty, rewards, description } = event;
    return (
        <ScrollArea className="h-[60vh]" >
            <div className="flex flex-col gap-6">
                <div className="event-card_btn w-fit" >
                    <p className="text-16-medium !text-white-1" >{category}</p>
                </div>
                <div className="grid grid-cols-2 gap-4" >
                    <div className="flex gap-2 items-center" > <CalendarIcon className="w-5 h-5 text-muted-foreground" /> <span> {date || "Pending"} </span>  </div>
                    <div className="flex gap-2 items-center" > <MapPinIcon className="w-5 h-5 text-muted-foreground" /> <span> {venue || "Pending"} </span>  </div>
                    <div className="flex gap-2 items-center col-span-2 " > <UserIcon className="w-5 h-5 text-muted-foreground" /> <span> {faculty || "Pending"} </span>  </div>
                </div>
                <div className="w-full h-[0.1rem] rounded-xl bg-card_clr_light/50" />
                <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center" > <BookOpenIcon className="w-5 h-5 mr-2" />Description </h3>
                    <p className="text-black_light">{description}</p>
                </div>

                <div className="w-full h-[0.1rem] rounded-xl bg-card_clr_light/50" />
                <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center" ><GiftIcon className="w-5 h-5 mr-2" />Rewards</h3>
                    <p className="text-black_light">{rewards || "Will be declared soon"}</p>
                </div>
            </div>
        </ScrollArea>
    )
}

export default EventContent