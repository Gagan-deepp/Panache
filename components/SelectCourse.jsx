"use client"

import { Check, ChevronsUpDown, Dot } from "lucide-react"
import { cn } from "@/lib/utils"
import { courses } from "@/lib/courseData"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

export const SelectCourse = ({ value, setCourse, setBranch }) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen} className="w-1/2" >
            <PopoverTrigger asChild className="" >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between items-center"
                >
                    {value
                        ? <p className="!text-black-2" > {value}</p>
                        : <p className="textColor flex gap-2 items-center" > <Dot className="!text-bg_dot" /> Select Course </p>}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 !bg-black-3 !px-0">
                <Command className="startup-form_select" >
                    <CommandInput placeholder="Search Course..." className="h-9" />
                    <CommandList className="mt-2" >
                        <CommandEmpty className="text-white" >No Course found.</CommandEmpty>
                        <CommandGroup className="select_content" >
                            {Object.keys(courses).map((course) => (
                                <CommandItem
                                    key={course}
                                    value={course}
                                    className="select_item"
                                    onSelect={(currentValue) => {
                                        setCourse(currentValue === value ? "" : currentValue)
                                        setBranch(currentValue === value && "")
                                        setOpen(false)
                                    }}
                                >
                                    {course}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === course ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}