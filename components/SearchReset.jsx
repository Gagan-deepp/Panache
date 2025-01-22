'use client'

import { X } from "lucide-react";
import Link from "next/link";

const SearchReset = () => {

    const reset = () => {
        const form = document.querySelector('.search-form')
        if (form) form.reset();
    }

    return (
        <button type="reset" onClick={reset}>
            <Link href="/events" className="search-btn text-white-1" >
                <X className="font-bold"/>
            </Link>
        </button>
    )
}

export default SearchReset
