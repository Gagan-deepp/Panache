"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import LargeEventCard from "@/components/web_comp/LargeEventCard"
import EventContent from "@/components/EventContent"

const ITEMS_PER_PAGE = 10

export const EventPagination = ({ events }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE)

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentEvents = events.slice(startIndex, endIndex)

    return (
        <>
            <div className="card_grid mt-8">
                {currentEvents.map((event) => (
                    <Dialog key={event.name} className="mt-8">
                        <DialogTrigger asChild className="w-full h-full">
                            <LargeEventCard event={event} />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
                            <EventContent event={event} />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

