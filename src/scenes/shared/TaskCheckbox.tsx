import React, { useEffect, useState } from "react";

type Props = {
    title: string;
    description?: string;
    priority: number;
    completed: boolean;
}

const TaskCheckbox = (
    {title, description, priority, completed}: Props
) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    //if db already states completed, then check it on app
    useEffect(() => {
        setIsChecked(completed);
    }, [completed]);


    const handleChange = () => {
        setIsChecked(prev => !prev);
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
                <input type="checkbox" checked={isChecked} onChange={handleChange} className="flex flex-col flex-start"/>

                <div className="md:flex gap-3 w-full hover:bg-gray-50 " onClick={handleChange}>
                    
                    <div className="w-60 overflow-auto ">
                        <p className={`font-bold ${priorityColor}`}>{title}</p>
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