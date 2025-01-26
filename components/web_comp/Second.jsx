import Image from "next/image"

const Second = () => {
    return (
        <div>
            <section className="section flex-col sm:flex-row sm:max-h-[70dvh]" >

                <div className="w-full flex flex-col gap-8 py-4 " >
                    <div className="flex gap-2 items-center" >
                        <div className="h-1 w-8 main_bg rounded-xl" />
                        <h1 className="title_heading uppercase textColor" > About SRGI </h1>
                    </div>

                    <div className="flex flex-col gap-4" >
                        SRGI aims to emerge as a center of excellence of national and global repute, fostering innovation and nurturing young minds to excel in their chosen fields while contributing meaningfully to society and industry.
                        <span>
                            SRGI is dedicated to empowering students by providing quality education, a multidisciplinary platform, and a dynamic learning environment. The institution focuses on building professional competence, enhancing employability, and meeting global standards through continuous improvement in teaching methodologies and industry-aligned programs.
                        </span>
                    </div>
                </div>

                <div className="relative w-full aspect-square rounded-xl " >
                    <Image src="/1.png" fill={true} className="object-cover rounded-xl" alt="banner" />
                </div>
            </section>


            <section className="w-full bg-transparent sm:max-h-[70dvh] flex gap-12 py-10 rounded-3xl mt-12 flex-col sm:flex-row-reverse" >

                <div className="w-full flex flex-col gap-8 py-4 " >
                    <div className="flex gap-2 items-center" >
                        <div className="h-1 w-8 main_bg rounded-xl" />
                        <h1 className="title_heading uppercase textColor" > About PANACHE </h1>
                    </div>

                    <div className="flex flex-col gap-4" >
                        SRGI aims to emerge as a center of excellence of national and global repute, fostering innovation and nurturing young minds to excel in their chosen fields while contributing meaningfully to society and industry.
                        <span>
                            SRGI is dedicated to empowering students by providing quality education, a multidisciplinary platform, and a dynamic learning environment. The institution focuses on building professional competence, enhancing employability, and meeting global standards through continuous improvement in teaching methodologies and industry-aligned programs.
                        </span>
                    </div>
                </div>

                <div className="relative w-full aspect-square rounded-xl " >
                    <Image src="/1.png" fill={true} className="object-cover rounded-xl" alt="banner" />
                </div>
            </section>
        </div>
    )
}

export default Second