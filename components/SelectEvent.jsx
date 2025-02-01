import { armCategory, eventName, onlineGames } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SelectEvent = ({ events, category, i = 0, setEvents, game = false, value, arm = false }) => {
    // Selected events (excluding the current index)
    const selectedEvents = game
        ? events.filter((_, index) => index !== i).map((event) => event.game)
        : events.filter((_, index) => index !== i).map((event) => event.eventName);

    // Determine the event list based on category
    let filteredEventNames = [];

    if (category === "General") {
        filteredEventNames = eventName["General"] || []; // Show all general events
    } else if (arm) {
        filteredEventNames = armCategory.filter((category) => !selectedEvents.includes(`Arm Wrestling - ${category}`)); // Exclude selected weight categories
    } else if (game) {
        filteredEventNames = onlineGames?.filter((event) => !selectedEvents.includes(event));
    } else if (category === "Cyber" && selectedEvents.includes("Online Gaming")) {
        filteredEventNames = eventName[category];
    } else {
        filteredEventNames = eventName[category]?.filter((event) => !selectedEvents.includes(event)) || [];
    }

    return (
        <Select
            value={value}
            onValueChange={(val) => {
                const updatedEvents = [...events];
                if (arm) {
                    updatedEvents[i].eventName = `Arm Wrestling - ${val}`;
                } else if (game) {
                    updatedEvents[i].eventGame = val;
                } else {
                    updatedEvents[i].eventName = val;
                }
                setEvents(updatedEvents);
            }}
        >
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
                <SelectContent className="select_content">
                    {filteredEventNames.map((event, index) => (
                        <SelectItem className="select_item" value={event} key={index}>
                            {event}
                        </SelectItem>
                    ))}
                </SelectContent>
            )}
        </Select>
    );
};

export default SelectEvent;
