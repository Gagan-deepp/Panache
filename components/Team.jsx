"use client"
import { TeamData } from "@/lib/data";
import { useInView } from "framer-motion"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Team = () => {
    const [inViewId, setinViewId] = useState(null);

    return (
        <div className='w-full gap-28 flex items-start flex-col sm:flex-row' >
            <div className=" w-full sm:w-auto sm:flex-[0.8] py-[10vh]">
                {TeamData.map((team, i) => {
                    const ref = useRef();
                    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

                    useEffect(() => {
                        if (isInView) setinViewId(i);
                        if (!isInView && inViewId === i) setinViewId(null);

                    }, [isInView, inViewId, setinViewId])
                    return (
                        <div ref={ref} key={i} className={`flex flex-col gap-8 w-full transition-opacity ${isInView ? "opacity-100" : "opacity-75"} `} >
                            <div className="flex-center sm:hidden text-center mt-8" >
                                <h2 className="sub-heading !text-4xl" > {team.role} </h2>
                            </div>
                            <div className="flex justify-start sm:justify-evenly flex-wrap items-start gap-4 w-full py-10 sm:py-24" >
                                {team?.users?.map((member) => {
                                    return (
                                        <div key={member.name} className="bg-[#ddcecb] px-4 py-6 rounded-xl flex-center flex-col gap-3 min-w-[10rem]" >
                                            <div className="relative profile_image" >
                                                <Image src={`https://drive.google.com/uc?id=${member.image}`} alt={member.name} fill={true} className={`object-cover rounded-full saturate-150 ${team.role === "Cultural Team" && "object-top"} `} />
                                            </div>
                                            <div className="flex-center flex-col" >
                                                <h3 className="font-medium" > {member.name} </h3>
                                                <em className="text-[0.7rem] tracking-wide" > {member.role} </em>
                                            </div>

                                            <div className="h-[1px] rounded-xl bg-card_clr w-full" />
                                            <Link href={`tel:${member.phone}`} >
                                                <Button className="card_btn" >
                                                    {member.phone}
                                                </Button>
                                            </Link>
                                        </div>)
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className=' w-full sm:flex-[0.2] sticky top-0 h-dvh sm:flex hidden items-center' >
                <div className='relative w-full aspect-square' >
                    {TeamData.map((team, index) => {
                        return (
                            <div className={`${inViewId === index ? "opacity-100" : "opacity-0"} `} key={index} >
                                <div className="absolute inset-0 w-full h-full flex-center">
                                    <h2 className="sub-heading !font-bold" > {team.role.toUpperCase()} </h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Team