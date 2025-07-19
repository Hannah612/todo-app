import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, type ChangeEvent } from "react";
import EditTaskModal from "../modals/EditTaskModal";

type Props = {
    title: string;
    description?: string;
    priority: number;
    completed: boolean;
    due_date: Date;
    setCheckedItems: (checkedItems: any) => void;
    setShowEditTaskModal: (showEditTaskModal: boolean) => void;
    showEditTaskModal: boolean;
    checkedItems: any;
    index: string;
}

const TaskCheckbox = (
    {title, description, priority, completed, checkedItems, index, due_date, setShowEditTaskModal, showEditTaskModal, setCheckedItems}: Props
) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        //update previous checkedItems 
        for (const key in checkedItems) {
            if (key.includes("false") || key.includes(name)) delete checkedItems[key];
        }

        if (checked) {
            setCheckedItems(() => {
                return { ...checkedItems, [name + "-" + checked]: title } //key: e.g.0-true
            });
        }
    };

    const date = new Date(due_date);
    const priorityMap: Record<number, string> = {
        1: "text-green",
        2: "text-yellow",
        3: "text-red",
    };
    
    const formatDateTime = (field: number) => {
        return field.toString().length < 2 ? "0"+field : field;
    }

console.log(showEditTaskModal);
    const priorityColor = priorityMap[priority] ?? ""; // fallback if priority is unknown

    return (
        <div>
            <li className={`flex gap-4 rounded-md ${completed ? "hover:bg-green-light-bg" : "hover:bg-transparent"}`}>
                <input type="checkbox" name={index} title={title} onChange={handleChange} className="flex flex-col flex-start"/>

                <div className={`gap-2 w-full `}>
                    
                    <div className="w-full overflow-auto flex">
                        <p className={`font-bold ${priorityColor} flex`}>
                            {completed ? (
                                <>
                                    {title}
                                    <CheckBadgeIcon className="text-green w-5 ml-2"></CheckBadgeIcon>
                                </>
                                ) : (
                                    title
                                )}
                        </p>


                    <p className="ml-auto"> {date.getFullYear()}-{formatDateTime(date.getMonth()+1)}-{formatDateTime(date.getDate())}</p>
                    </div>
                    <div className="flex">
                        <p>{description}</p>
                            <PencilIcon onClick={() => setShowEditTaskModal(true)} className="w-5 m-3 ml-auto"></PencilIcon>
                        <div>
                            <EditTaskModal showEditTaskModal={showEditTaskModal} setShowEditTaskModal={setShowEditTaskModal}></EditTaskModal>
                        </div>
                    </div>
                </div>
            </li>
        </div>

    );
}

export default TaskCheckbox;