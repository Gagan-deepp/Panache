import { DataTable } from "@/components/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchEventData } from "@/lib/actions/Events"
import { eventCategory } from "@/lib/data"


const page = () => {
    return (
        <div className="section_container min-h-dvh !py-16" >
            <Tabs defaultValue="Cultural" className="w-full">
                <TabsList className="tab rounded-xl" >
                    {
                        eventCategory.map((event, i) => (
                            <TabsTrigger value={event.name} key={i} className="tab" > {event.name} </TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    eventCategory.map((event, i) => (
                        <TabsContent value={event.name} key={i} >
                            <TableContainer category={event.name} />
                        </TabsContent>
                    ))
                }
            </Tabs>
        </div>

    )
}

export default page

const TableContainer = async ({ category }) => {
    const eventData = await fetchEventData(category)
    return (
        <div className="mt-8" >
            <h1 className="sub-heading" > {category} Details  </h1>
            <DataTable data={JSON.parse(eventData.users)} category={category} />
        </div>
    )
}