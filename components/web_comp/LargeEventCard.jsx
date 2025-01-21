import { ChevronRightIcon, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

const LargeEventCard = ({ event }) => {
    const { _createdAt, name, members, author, _id, description, image, title, category } = "Test";
    return (
        <li className="large-event-card group" >
            <div className="flex">
                <p className="event-card_date" >
                    108/01/252
                </p>

            </div>

            <div className="flex mt-5 gap-5" >
                <div className="flex-1">
                    <h2 className="text-[16px] font-medium line-clamp-1"> {name || "Test"} </h2>
                </div>

            </div>

            <div>
                <p className="event-card_desc" >
                    {description || "Loream sfjbeyf sfbefy sdfeyfe sdfffsfffffffffffffff"}
                </p>

                <img src="/1.png" alt="card_icon" className="event-card_img" />
            </div>

            <div className="flex justify-between items-center gap-3 mt-3 " >
                <Link href={`/?search=${category?.toLowerCase()}`} className="event-card_btn" >
                    <p className="text-16-medium !text-white-1" >
                        {category || "Category"}
                    </p>
                </Link>

                <Button className="event-card_btn" asChild >
                    <Link href={`/community/${_id}`} >
                        <ChevronRightIcon />
                    </Link>
                </Button>
            </div>

        </li>
    )
}

export default LargeEventCard