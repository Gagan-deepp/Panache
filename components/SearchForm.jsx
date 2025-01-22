import Form from "next/form"
import { Search } from "lucide-react"
import SearchReset from "./SearchReset"

const SearchForm = ({ search }) => {
    return (
        <Form action="/events" scroll={false} className="search-form" >
            <input
                name="search"
                defaultValue={search}
                className="search-input"
                placeholder="Search Communities..."
            />

            <div className="flex gap-2" >
                {search && <SearchReset />}

                <button type="submit" className="search-btn text-white" >
                    <Search className="font-extrabold"/>
                </button>
            </div>
        </Form>
    )
}

export default SearchForm