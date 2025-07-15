import React, { useEffect, useState, type ChangeEvent } from "react";

type Props = {
    title: string;
    description?: string;
    priority: number;
    completed: boolean;
    due_date: string;
    setCheckedItems: (checkedItems: any) => void;
    checkedItems: any;
    index: string;
}

const TaskCheckbox = (
    {title, description, priority, completed, checkedItems, index, due_date, setCheckedItems}: Props
) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        //todo: go thru checked items again and see which ones are unchecked 
        // checkedItems = Object.keys(checkedItems).filter((item: any) => !item.checked);


        setCheckedItems(() => {
            return { ...checkedItems, [name]: title }
        });
    };


    const priorityMap: Record<number, string> = {
        1: "text-green",
        2: "text-yellow",
        3: "text-red",
    };

    const priorityColor = priorityMap[priority] ?? ""; // fallback if priority is unknown

    return (
        <div className="">
            <li className="flex gap-4">
                <input type="checkbox" name={index} title={title} onChange={handleChange} className="flex flex-col flex-start"/>

                <div className="gap-2 w-full hover:bg-gray-50 ">
                    
                    <div className="w-full overflow-auto flex">
                        <p className={`font-bold ${priorityColor}`}>{title}</p>
                        <p className="ml-auto">{due_date}</p>
                    </div>
                    <div className="">
                        <p>{description}</p>
                    </div>
                </div>
            </li>
        </div>

    );

}

export default TaskCheckbox;