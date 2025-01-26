'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const Hero = () => {

    const sliderContent = [
        {
            heading: "WELCOME TO THE GRAND EVENT",
            subDetails: "CYBER - TECHNICAL - GENERAL - CULTURAL",
            btnClr: "btn_bg",
            imageSrc: "/banner0.jpg",
        },
        {
            heading: "CYBER EVENTS",
            subDetails: "Explore the world of cyber events.",
            imageSrc: "/banner1.jpg",
            btnClr: "btn_bg",
        },
        {
            heading: "TECHNICAL EVENTS",
            subDetails: "Showcase your technical skills and innovations.",
            imageSrc: "/banner2.jpg",
            btnClr: "purple_bg",
        },
        {
            heading: "GENERAL EVENTS",
            subDetails: "Enjoy a variety of fun and exciting activities.",
            imageSrc: "/banner3.jpg",
            btnClr: "brown_bg",
        },
    ];

    return (
        <>
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-dvh w-screen overflow-hidden"
            >
                {sliderContent.map((slide, index) => (
                    <SwiperSlide key={index} >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black-200/50 to-70% pointer-events-none">
                            <div className="z-[1] w-full h-full flex px-12 flex-col text-white justify-center">
                                <div className="max-w-[35rem] w-full min-w-[25rem]relative flex flex-col">
                                    <div className={` ${slide.btnClr} w-fit rounded-full p-4`}>
                                        <h1 className=" text-lg sm:text-3xl font-bold">{slide.heading}</h1>
                                    </div>
                                    <div className="relative max-w-[15rem]sm:max-w-[30rem] w-full h-[10rem] sm:h-[14rem]">
                                        <Image src="/logo.svg" alt="logo" fill quality={100} />
                                    </div>
                                    <div className={`${slide.btnClr} w-fit rounded-xl p-2`}>
                                        <h3 className=" text-sm sm:text-base font-bold">{slide.subDetails}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image src={slide.imageSrc} fill alt="hero image" quality={100} className="object-cover z-[-1]" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Hero