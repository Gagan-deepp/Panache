import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const page = () => {
    const data = [
        {
            title: "27th Jan",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Paricharcha  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1DuE8njLDYuPVxI3R0M-PZ48QmFpQ4D6D"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> The Sloganeer  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1tt5-utgvv_FS5XWrBXL7Pm0_YW7ixnii"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "29th Jan",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Poster Presentation  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1DuE8njLDYuPVxI3R0M-PZ48QmFpQ4D6D"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> The Mechanist  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1fyG8-TZdpPuocgrqYKydU042LcPWmtd4"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "30th Jan",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Nail Art  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1v0iUh5rqRIucTXT2vlRo8EppZY9g4OFp"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Istehaar  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1nJ7iGkA36zyXyA3cVhPu5rAdiFJqcgV0"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Espirit De Corps  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1FR-_WrnEDea-YncN6Ler9w0Fpa0GeVm9"
                                alt="hero template"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    const Febdata = [
        {
            title: "2nd Feb",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Sky Scrapper  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1xUJq2QITNx3bg28jWjPxfGWIXsfo4ixh"
                                alt="Sky Scrapper"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Solid Hai Boss  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1moC3vpqLP0nvhYTTGeBmzrGLEDI8UF_Y"
                                alt="Solid Hai Boss"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "3rd Feb",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Sand Art  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1OTma4wGnDueeDguNEEy7sdEI_Mf3TOl2"
                                alt="Sand Art"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Crossword  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1z6HfjZ9reBMpMFnu47KIHFFdJPodyruZ"
                                alt="Crossword"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "24th Feb",
            content: (
                <div className='flex flex-col gap-8' >
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Attire  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1nz17VegZXgjY6yrOuQ0Ip3Yat_HLRPjM"
                                alt="Attire"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-neutral-800 dark:text-neutral-200 text-lg md:text-2xl font-medium mb-4"> Sur Spardha  </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Image src="https://drive.google.com/uc?id=1z6HfjZ9reBMpMFnu47KIHFFdJPodyruZ"
                                alt="Sur Spardha"
                                width={500}
                                height={300}
                                className="rounded-lg object-cover h-20 md:h-32 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]" />
                        </div>
                    </div>
                    {/* Add other events for 24th Feb here */}
                </div>
            ),
        },
    ];
    
    return (
        <div className="section_container min-h-dvh" >
            <section className="grey_container !min-h-[330px]  rounded-3xl relative mt-12" >
                <Image src="/1.png" alt="background" fill={true} className=" !z-[-1] rounded-3xl opacity-[0.6] object-cover" quality={100} />
                <h1 className="heading"> Event Schedule </h1>
                <h3 className="sub-heading tag !text-lg"> Stay Tuned, Stay Thrilled – Here's the Line-Up! </h3>
            </section>

            <div className="w-full mt-16">

                <Tabs defaultValue="day1" className="flex flex-col">
                    <TabsList className="tab" >
                        <TabsTrigger value="day1" className="tab" >January</TabsTrigger>
                        <TabsTrigger value="day2" className="tab" >February</TabsTrigger>
                    </TabsList>

                    <TabsContent value="day1">
                        <div className="w-full my-8">
                            <Timeline data={data} />
                        </div>
                    </TabsContent>
                    <TabsContent value="day2">
                        <div className="w-full my-8">
                            <Timeline data={Febdata} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default page