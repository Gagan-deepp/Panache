import { DataTable } from "@/components/DataTable"
import { fetchEventData } from "@/lib/actions/Events"
import { eventCategory } from "@/lib/data"
import Link from "next/link"


const page = async({ searchParams }) => {
    const category = (await searchParams).category;
    const eventData = await fetchEventData(category)

    return (
        <div className="section_container min-h-dvh !py-16" >
            <div className="w-full">
                <div className="tab rounded-xl" >
                    {
                        eventCategory.map((event, i) => (
                            <Link key={i} href={`/view?category=${event.name}`} className="startup-card_btn tab justify-center" >
                                {event.name}
                            </Link>
                        ))
                    }
                </div>
                {category && eventData.status === "SUCCESS" && (
                    <div className="mt-8" >
                        <h1 className="sub-heading" > {category} Details  </h1>
                        <DataTable data={JSON.parse(eventData.users)} category={category} />
                    </div>)}
            </div>
        </div>

    )
}

export default page