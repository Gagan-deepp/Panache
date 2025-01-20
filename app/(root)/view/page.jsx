import { DataTable } from "@/components/DataTable"
import { GroupDataTable } from "@/components/GroupDataTable"
import { fetchEventData, fetchGroupEventData } from "@/lib/actions/Events"
import { eventCategory } from "@/lib/data"
import { Eraser } from "lucide-react"
import Link from "next/link"


const page = async ({ searchParams }) => {
    const category = (await searchParams).category;
    const group = (await searchParams).group || false;
    const eventData = !group && await fetchEventData(category)
    const groupEventData = group && category && (await fetchGroupEventData(category))
    return (
        <div className="section_container min-h-dvh !py-16" >

            {/* SINGLE DATA */}

            <div className="w-full">

                <div className="flex items-center gap-5" >
                    <h1 className="my-8 sub-heading"> Single Events Data </h1>
                    <Link href={`/view`} className="flex items-center text-blue-800 underline" >
                        ( <Eraser className="size-4" /> Clear )
                    </Link>
                </div>

                <div className="custom_tab rounded-xl" >
                    {
                        eventCategory.map((event, i) => {
                            let isActive = event.name === category && !group
                            return (
                                <Link key={i} href={`/view?category=${event.name}`} className={`startup-card_btn custom_tab justify-center ${isActive && "!bg-[#0e0e12] !text-grey-2"} `} >
                                    {event.name}
                                </Link>
                            )
                        })
                    }
                </div>

                {category && eventData.status === "SUCCESS" && (
                    <div className="mt-8" >
                        <h3 className="small-heading" > {category} Details  </h3>
                        <DataTable data={JSON.parse(eventData.users)} category={category} />
                    </div>)}
            </div>

            {/* GROUP DATA */}

            <div className="w-full">

                <div className="flex items-center gap-5" >
                    <h1 className="my-8 sub-heading"> Group Event Data </h1>
                    <Link href={`/view`} className="flex items-center text-blue-800 underline" >
                        ( <Eraser className="size-4" /> Clear )
                    </Link>
                </div>

                <div className="custom_tab rounded-xl" >
                    {
                        eventCategory.map((event, i) => {
                            let isActive = event.name === category && group
                            return (
                                <Link key={i} href={`/view?category=${event.name}&group=true`} className={`startup-card_btn custom_tab justify-center ${isActive && "!bg-[#0e0e12] !text-grey-2"} `} >
                                    {event.name}
                                </Link>
                            )
                        })
                    }
                </div>

                {category && groupEventData.status === "SUCCESS" && (
                    <div className="mt-8" >
                        <h3 className="small-heading" > {category} Details  </h3>
                        <GroupDataTable data={JSON.parse(groupEventData.groups)} category={category} />
                    </div>)}
            </div>
        </div>

    )
}

export default page