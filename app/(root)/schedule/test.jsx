'use client'

import { Teams } from "@/lib/data"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import React, { useEffect, useRef, useState } from 'react'

const Team = () => {

    const [inViewId, setinViewId] = useState(null);

    return (
        <div className="flex w-full gap-20 items-start" >

            {/* USERS */}
            <div className="w-full py-[10vh]" >
                {Teams.map((team, index) => {

                    const ref = useRef();
                    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

                    useEffect(() => {
                        if (isInView) setinViewId(index);
                        if (!isInView && inViewId === index) setinViewId(null);

                    }, [isInView, inViewId, setinViewId])

                    return (
                        <div ref={ref} className={`flex flex-col gap-8 ${isInView ? "opacity-100" : "opacity-75"} `} key={index} >
                            <div className="flex-center sm:hidden text-center" >
                                <h2 className="sub-heading" > {team.role} </h2>
                            </div>

                            <ul className="py-8 sm:py-16 grid sm:grid-cols-2 place-items-center gap-5 text-3xl transition-opacity"  >

                                {team.users.map((user, i) => {
                                    return (
                                        <li key={i} className={`py-16 text-3xl transition-opacity flex-center flex-col ${isInView ? "opacity-100" : "opacity-75"} `} >
                                            <div className="achievement_circle relative" >
                                                <Image src={user.icon} fill className="rounded-full" alt="user" quality={100} />
                                            </div>
                                            <div className="text-center mt-3" >
                                                <h3 className="text-xl-medium" > {user.name} </h3>
                                                <em className="text-small-normal opacity-75" > {user.role} </em>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>


            {/* ROLE */}
            <div className="w-full sticky top-0 sm:flex h-screen items-center hidden " >
                <div className="relative w-full aspect-square" >
                    {Teams.map((team, i) => {
                        return (
                            <div key={i} className={` transition-opacity ${i == inViewId ? "opacity-100" : "opacity-0"}`} >
                                <div className="absolute inset-0 w-full h-full flex-center" >
                                    <h2 className="sub-heading" > {team.role} </h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Team