import type { ChangeEvent } from "react";
import type { OrderType, SortType } from "./types";

/**
 * Filter Dropdown: provide the categories to filter by, pass the result to Tasks
 */
type Props = {
    setSortBy: (sortBy: SortType) => void;
    setOrder: (order: OrderType) => void;
}

const FilterDropdown = (
    {setSortBy, setOrder}: Props
) => {

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as SortType);
    };

    const handleOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value as OrderType);
    };


    return (
        <div className='md:flex gap-2 mb-3ml-auto pb-5'>
            <div className="flex pb-2">
                <div className='md:flex md:mr-3'>
                    <label className="font-bold underline">Sort By</label>
                </div>
                <select className="ml-auto rounded-md text-black" id="dropdown" onChange={handleDropdownChange} name="filter">
                    <option value="priority_id">Priority</option>
                    <option value="due_date">Due Date</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="flex">
                <div className='md:flex md:mr-3'>
                    <label className="font-bold underline">Order By</label>
                </div>
                <select className="ml-auto rounded-md text-black" id="dropdown" onChange={handleOrderChange} name="filter">
                    <option value="asc">ASC</option>
                    <option value="desc">DESC</option>
                </select>
            </div>


        </div>
    );
}

export default FilterDropdown;