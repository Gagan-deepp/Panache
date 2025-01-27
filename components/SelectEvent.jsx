import { armCategory, eventName, onlineGames } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const SelectEvent = ({ events, category, i = 0, setEvents, game = false, value, arm = false }) => {

    // Events = no of event choosen
    //Category == which category student choose - on the basis of category we filter event if category previous choosen
    //Selected eventName = ["Online gaming" , "Treseasure Safari"]
    const selectedEvents = game
        ? events.filter((_, index) => index !== i).map((event) => event.game)
        : events.filter((_, index) => index !== i).map((event) => event.eventName);

    // Filtered event names or categories
    const filteredEventNames = arm
        ? armCategory.filter((category) => !selectedEvents.includes(`Arm Wrestling - ${category}`)) // Exclude already selected weight categories
        : game
            ? onlineGames?.filter((event) => !selectedEvents.includes(event))
            : category === "Cyber" && selectedEvents.includes("Online Gaming")
                ? eventName[category]
                : eventName[category]?.filter((event) => !selectedEvents.includes(event)) || [];

    return (
        <Select value={value} onValueChange={(val) => {
            const updatedEvents = [...events];
            if (arm) {
                updatedEvents[i].eventName = `Arm Wrestling - ${val}`; // Update arm wrestling category
            } else if (game) {
                updatedEvents[i].eventGame = val; // Update online game
            } else {
                updatedEvents[i].eventName = val; // Update event name
            }
            setEvents(updatedEvents);
        }} >
            <SelectTrigger className="startup-form_select">
                <SelectValue
                    placeholder={
                        arm
                            ? "Select Weight Category"
                            : game
                                ? "Select Online Game"
                                : "Select Event Name"
                    }
                />
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