import { popular } from "@/lib/data"
import Link from "next/link"
import { Button } from "../ui/button"
import LargeEventCard from "./LargeEventCard"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import EventContent from "../EventContent"

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

        <div className="event_grid mx-auto " >
          {popular.map((event) => {
            return (
              <Dialog key={event.name} className="mt-8 cursor-pointer">
                <DialogTrigger className="w-full h-full">
                  <LargeEventCard event={event} />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
                  <EventContent event={event} />
                </DialogContent>
              </Dialog>
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