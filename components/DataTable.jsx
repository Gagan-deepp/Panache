"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { eventName, onlineGames } from "@/lib/data";
import { cn, formatDate } from '@/lib/utils';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, CalendarIcon, Download } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "rollno",
        header: "Roll No",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("rollno")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                >
                    Name
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "event",
        header: "Event",
        cell: ({ row }) => (
            <div>
                {row.getValue("event").map((item, i) => (
                    <p key={i}>{item}{i < row.getValue("event").length - 1 ? ', ' : ''}</p>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "token",
        header: "Token ID",
        cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("token")}</div>,
    },
]

export const DataTable = ({ data, category }) => {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [selectedEvent, setSelectedEvent] = useState("all");
    const [selectedDate, setSelectedDate] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    })

    const allEventNames = useMemo(() => {
        let events = ["all"];
        if (category === "All") {
            events = [...events, ...Object.values(eventName).flat()];
        } else {
            if (category === "Cyber") {
                events = [...events, ...onlineGames];
            }
            events = [...events, ...(eventName[category].filter((item) => item != "Online Gaming") || [])];
        }

        return events;
    }, [category]);

    const filteredData = useMemo(() => {
        let filtered = data
        if (selectedEvent !== "all") {
            filtered = data.filter(item => item.event.includes(selectedEvent));
        }
        if (selectedDate) {
            filtered = filtered.filter((item) => {
                return item.createdAt.split("T")[0] === selectedDate.toISOString().split("T")[0]
            })
        }
        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }
        return filtered
    }, [selectedEvent, selectedDate, searchTerm, data])

    const table = useReactTable({
        data: filteredData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    const exportToExcel = () => {
        const exportData = filteredData.map((item) => ({
            "Roll No": item.rollno,
            Name: item.name,
            Email: item.email,
            Events: item.event.join(", "),
            Token: item.token,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);

        // Add category heading at the top
        const heading = `Category: ${category} - Date: ${selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}`;
        XLSX.utils.sheet_add_aoa(ws, [[heading]], { origin: "A1" });

        // Merge heading cells across all columns
        const mergeRange = { s: { r: 0, c: 0 }, e: { r: 0, c: Object.keys(exportData[0]).length - 1 } };
        ws["!merges"] = [mergeRange];

        // Add table headers (Row 2)
        XLSX.utils.sheet_add_aoa(ws, [Object.keys(exportData[0])], { origin: "A2" });

        // Add the data starting from Row 3
        XLSX.utils.sheet_add_json(ws, exportData, { origin: "A3", skipHeader: true });

        // Styling: Use cell styles (Category Heading + Headers)
        ws["A1"].s = {
            font: { bold: true, sz: 14 }, // Bold, larger font size for category
            alignment: { horizontal: "center" }, // Center-align the heading
        };

        const headerStyle = {
            font: { bold: true }, // Bold font for headers
            alignment: { horizontal: "center" }, // Optional: Center-align headers
        };

        const headerRange = XLSX.utils.decode_range(ws["!ref"]);
        for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
            const headerCell = XLSX.utils.encode_cell({ r: 1, c: C }); // Headers are in row 2 (r: 1)
            if (ws[headerCell]) {
                ws[headerCell].s = headerStyle;
            }
        }

        // Auto-size columns for better visibility
        const colWidths = Object.keys(exportData[0]).map((key) => ({
            wch: Math.max(key.length, ...exportData.map((row) => String(row[key]).length)),
        }));
        ws["!cols"] = colWidths;

        // Append sheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "Students");

        // Generate and download the Excel file
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `students_data_${category}_${selectedEvent}_${selectedDate ? selectedDate.toISOString().split("T")[0] : ""}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        table.setPageIndex(0);
    }, [selectedEvent]);

    useEffect(() => {
        setSelectedDate(null)
    }, [data])

    return (
        <div className="w-full">

            <h3 className="small-heading" > {category} Details - {selectedDate && selectedDate.toISOString().split("T")[0]}  </h3>

            <div className="flex items-center justify-between py-4 flex-wrap gap-5">
                
                <div className='flex gap-5 flex-wrap' >
                    <Button onClick={exportToExcel} >
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? formatDate(selectedDate) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                className="bg-white"
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    if (date) {
                                        const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                                        setSelectedDate(adjustedDate)
                                    } else {
                                        setSelectedDate(null)
                                    }
                                    setCalendarOpen(false)
                                }}
                                initialFocus
                                toDate={new Date()}
                                fromDate={new Date(2023, 0, 1)} // Adjust this date as needed
                                disabled={(date) => date > new Date() || date < new Date("2023-01-01")}
                            />
                        </PopoverContent>
                    </Popover>

                    <Select
                        value={selectedEvent}
                        onValueChange={setSelectedEvent}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent className="!bg-white-1" >
                            {allEventNames.map((eventName) => (
                                <SelectItem key={eventName} value={eventName}>
                                    {eventName === "all" ? "All Events" : eventName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <div className="rounded-md border mt-8">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} Total Entries.
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    onClick={() => {
                        const newPageSize = table.getState().pagination.pageSize + 10
                        table.setPageSize(newPageSize)
                    }}
                >
                    Show More
                </Button>
            </div>
        </div>
    )
}