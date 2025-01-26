'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { NextButton, PrevButton, usePrevNextButtons } from '../EmblaCar'
import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

const TWEEN_FACTOR_BASE = 0.2

const Hero = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true , draggable : true })
    const tweenFactor = useRef(0)
    const tweenNodes = useRef([])

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

    const setTweenNodes = useCallback((emblaApi) => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__parallax__layer')
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi) => {
        if (!emblaApi) return;
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);


    const tweenParallax = useCallback((emblaApi, eventName) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === 'scroll';

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                const tweenNode = tweenNodes.current[slideIndex];
                if (!tweenNode) return; // Check if the node exists

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);
                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
                tweenNode.style.transform = `translateX(${translate}%)`;
            });
        });
    }, []);


    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenParallax(emblaApi);

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenParallax)
            .on('scroll', tweenParallax)
            .on('slideFocus', tweenParallax);

        return () => {
            emblaApi.off('reInit', setTweenNodes);
            emblaApi.off('reInit', setTweenFactor);
            emblaApi.off('reInit', tweenParallax);
            emblaApi.off('scroll', tweenParallax);
            emblaApi.off('slideFocus', tweenParallax);
        };
    }, [emblaApi, tweenParallax, setTweenNodes, setTweenFactor]);


    return (
        <div className="embla relative">
            <div className="absolute inset-0 z-[1]">
                <div className='relative w-full h-full hidden sm:flex justify-between items-center' >
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>
            <div className="absolute bottom-4 right-8 sm:block hidden z-[1]">
                <div className='flex gap-3 flex-col' >
                    <Link href="https://www.instagram.com/panachesrgi/?igsh=MWZyYmNsc2NsM3B6eQ%3D%3D#" target='_blank' className=' hero_circle flex-center ' > <Instagram className=' size-4 font-bold text-black-100 ' /> </Link>
                    <Link href="https://www.youtube.com/@panachesrgi-t7d" target='_blank' className=' hero_circle flex-center ' > <Youtube className=' size-4 font-bold text-black-100 ' /> </Link>
                </div>
            </div>
            <div className="embla__viewport z-50 " ref={emblaRef}>
                <div className="embla__container">
                    {sliderContent.map((slide, index) => (
                        <div className="embla__slide relative" key={index}>
                            <div className="embla__parallax">
                                <div className="embla__parallax__layer">
                                    <div className="embla__slide__img embla__parallax__img relative">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero