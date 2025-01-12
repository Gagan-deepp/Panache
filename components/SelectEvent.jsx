import { eventName } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const SelectEvent = ({ events, category, i, setEvents }) => {

    const selectedEvents = events.filter((_, index) => index !== i).map((event) => event.eventName);
    const filteredEventNames = eventName[category]?.filter((event) => !selectedEvents.includes(event)) || [];

    return (
        <Select onValueChange={(val) => {
            const updatedEvents = [...events];
            updatedEvents[i].eventName = val;
            setEvents(updatedEvents);
        }} >
            <SelectTrigger className="startup-form_select">
                <SelectValue placeholder="Select Event Name" />
            </SelectTrigger>
            {filteredEventNames?.length > 0 && (
                <SelectContent className="select_content" >
                    {filteredEventNames.map((event, index) => (
                        <SelectItem className="select_item" value={event} key={index} >
                            {event}
                        </SelectItem>))}
                </SelectContent>)
            }
        </Select>
    )
}

export default SelectEvent