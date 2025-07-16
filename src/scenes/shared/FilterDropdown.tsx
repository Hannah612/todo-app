import type { ChangeEvent } from "react";
import type { FilterTypes } from "./types";

/**
 * Filter Dropdown: provide the categories to filter by, pass the result to Tasks
 */
type Props = {
    setFilterBy: (filterBy: FilterTypes) => void;
}

const FilterDropdown = (
    {setFilterBy}: Props
) => {
    const inputStyles = `md:flex gap-2 mb-3 pr-10`;

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFilterBy(event.target.value as FilterTypes);
    };

    return (
        <div className={inputStyles}>
            <div className='md:flex md:mr-3'>
                <label className="font-bold underline">Filter By</label>
            </div>
            <select id="dropdown" onChange={handleChange} name="filter">
                <option value="3" className='font-red'>Relaxed</option>
                <option value="2" className='font-yellow'>Important</option>
                <option value="1" className='font-red'>Urgent</option>
            </select>
        </div>
    );
}

export default FilterDropdown;