import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import EditTaskModal from "../modals/EditTaskModal";
import type { Task } from "./types";

type Props = {
    task: Task;
    setCheckedItems: (checkedItems: any) => void;
    checkedItems: any;
    index: string;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
}

const TaskCheckbox = (
    {task, checkedItems, index, setCheckedItems, setIsFormSubmitted}: Props
) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        for (const key in checkedItems) {
            if (key.includes("false") || key.includes(name)) delete checkedItems[key];
        }

        if (checked) {
            setCheckedItems(() => {
                return { ...checkedItems, [name + "-" + checked]: task.title } 
            });
        }
    };
   const [showEditTaskModal, setShowEditTaskModal] = useState<boolean>(false);

    const date = new Date(task.due_date)
    const priorityMap: Record<number, string> = {
        1: "text-green",
        2: "text-yellow",
        3: "text-red",
    };
    
    const formatDateTime = (field: number) => {
        return field.toString().length < 2 ? "0" + field : field;
    }

    const priorityColor = priorityMap[task.priority_id] ?? ""; 
    const completed = `text-gray-400`;
    return (
        <div>
            <li className={`flex gap-4 rounded-md ${task.completed ? "hover:bg-green-light-bg" : "hover:bg-transparent"}`}>
                <input type="checkbox" name={index} title={task.title} onChange={handleChange} className="flex flex-col flex-start"/>

                <div className={`gap-2 w-full `}>
                    
                    <div className="w-full overflow-auto flex">
                        <span className={`font-bold ${priorityColor} flex`}>
                            {task.completed ? (
                                <>
                                    <p className={completed}>{task.title}</p>
                                    <CheckBadgeIcon className={`${completed} w-5 ml-2`}></CheckBadgeIcon>
                                </>
                                ) : (
                                    task.title
                            )}
                        </span>


                    <p className="ml-auto"> {date.getFullYear()}-{formatDateTime(date.getMonth()+1)}-{formatDateTime(date.getDate())}</p>
                    </div>
                    <div className="flex">
                        {task.completed ? (
                            <>
                                <p className={`${completed}`}>{task.description}</p>
                            </>
                        ) : (
                            <>
                                <p>{task.description}</p>
                                <PencilIcon onClick={() => setShowEditTaskModal(true)} className="w-5 m-3 ml-auto"></PencilIcon>
                                <div>
                                    <EditTaskModal task={task} setIsFormSubmitted={setIsFormSubmitted} showEditTaskModal={showEditTaskModal} setShowEditTaskModal={setShowEditTaskModal}></EditTaskModal>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </li>
        </div>

    );
}

export default TaskCheckbox;