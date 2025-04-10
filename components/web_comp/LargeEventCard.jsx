import { ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';

const LargeEventCard = ({ event }) => {
    const { category, name, date, venue, faculty, rewards, description } = event;
    return (
        <li className="large-event-card group" >
            <div className="flex">
                <p className="event-card_btn" > {date || "Later..."} </p>

            </div>

            <div className="flex mt-5 gap-5" >
                <div className="flex-1">
                    <h2 className="text-[16px] font-medium line-clamp-1"> {name || "Test"} </h2>
                </div>

            </div>

            <div>
                <p className="event-card_desc" >{description || "Later..."}</p>
                <div className='event-card_img relative overflow-hidden' >
                    <Image src={`https://drive.google.com/uc?id=${event.image}` || "/1.png"} alt={event.name} fill={true} className="object-cover" />
                </div>
                {/* <img src="/1.png" alt="card_icon" className="event-card_img" /> */}
            </div>

            <div className="flex justify-between items-center gap-3 mt-3 w-full" >
                <div className="event-card_btn" >
                    <p className="text-16-medium" >{category}</p>
                </div>

                <Button className="event-card_btn" asChild >
                    <div >
                        <ChevronRightIcon />
                    </div>
                </Button>
            </div>

        </li>
    )
}

export default LargeEventCard