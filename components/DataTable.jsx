"use client"

import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { eventCategory, eventName } from "@/lib/data"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowUpDown, Download } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'

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
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
        accessorKey: "uuid",
        header: "Token ID",
        cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("uuid")}</div>,
    },
]

export const DataTable = ({ data, category }) => {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const eventCategories = eventName[category]
    const [selectedEvent, setSelectedEvent] = useState("all");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    })

    const allEventNames = useMemo(() => {
        return category === "All"
            ? ["all", ...Object.values(eventName).flat()]
            : ["all", ...(eventName[category] || [])];
    }, [category]);

    const filteredData = useMemo(() => {
        if (selectedEvent === "all") {
            return data;
        }
        return data.filter(item => item.event.includes(selectedEvent));
    }, [data, selectedEvent]);

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
        const exportData = filteredData.map(item => ({
            "Roll No": item.rollno,
            "Name": item.name,
            "Email": item.email,
            "Events": item.event.join(", "),
            "UUID": item.uuid
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, `students_data_${category}_${selectedEvent}.xlsx`);
    };
    useEffect(() => {
        table.setPageIndex(0);
    }, [selectedEvent]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4 flex-wrap gap-5">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue() ?? "")}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className='flex gap-5' >
                    <Button onClick={exportToExcel} >
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                    </Button>
                    <Select
                        value={selectedEvent}
                        onValueChange={setSelectedEvent}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select event" />
                        </SelectTrigger>
                        <SelectContent>
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
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
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