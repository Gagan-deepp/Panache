import { DataTable } from "@/components/DataTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { eventCategory } from "@/lib/data"


const page = () => {
    return (
        <div className="section_container min-h-dvh !py-12" >
            <Tabs defaultValue="Cultural" className="w-full">
                <TabsList>
                    {
                        eventCategory.map((event, i) => (
                            <TabsTrigger value={event.name} key={i}> {event.name} </TabsTrigger>
                        ))
                    }
                </TabsList>

                <TabsContent value="Cultural"><DataTable /></TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </div>

    )
}

export default page
