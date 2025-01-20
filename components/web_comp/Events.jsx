import { popular } from "@/lib/data"
import { Button } from "../ui/button"
import Link from "next/link"
import EventCard from "../EventCard"

const Events = () => {
  return (
    <section className="section" >
      <div className="flex flex-col gap-10 w-full" >
        <div className="flex flex-col gap-4" >
          <div className="flex gap-2 items-center flex-row-reverse sm:flex-row" >
            <h1 className="title_heading uppercase " > Discover The Events </h1>
            <div className="h-1 w-8 bg-black_light rounded-xl" />
          </div>
          <em className="text-sm" > A Journey Through Fun, Friendship, and Festivity Awaits – Let’s Make It Memorable Together! </em>
        </div>

        <div className="event_grid w-[90%] mx-auto " >
          {popular.map((event) => {
            return (
              <EventCard key={event.name} event={event} />
            )
          })}
        </div>

        <div className="w-full text-center" >
          <Button className="bg-card_clr text-cream hover:scale-[0.9] hover:bg-card_clr_light transition-all duration-200 ease-in-out " >
            <Link href="/events" className="" >
              All Events
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Events