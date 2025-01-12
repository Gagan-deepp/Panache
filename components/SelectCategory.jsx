import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { eventCategory } from "@/lib/data";

const SelectCategory = ({ events, value, setEvents, i }) => {

    const handleChange = (selectedCategory) => {
        const updatedEvents = [...events];
        updatedEvents[i].category = selectedCategory;
        updatedEvents[i].eventName = '';
        setEvents(updatedEvents);
    }
    return (
        <Select value={value} onValueChange={(val) => handleChange(val)} >
            <SelectTrigger className="startup-form_select">
                <SelectValue placeholder="Select a Community" />
            </SelectTrigger>
            {eventCategory?.length > 0 && (
                <SelectContent className="select_content" >
                    {eventCategory.map((event, i) => (
                        <SelectItem className="select_item" value={event.name} key={i} >
                            {event.name}
                        </SelectItem>))}
                </SelectContent>)
            }
        </Select>
    )
}

export default SelectCategory
