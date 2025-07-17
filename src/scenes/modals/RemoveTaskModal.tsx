import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Modal from 'react-modal';
/*
    RemoveTaskModal: remove a task from the list 
*/
type Props = {
    show: boolean;
    setShowRemoveTaskModal: (showRemoveTaskModal: boolean) => void;
    tasksToRemove: { [key: string]: string; };
    setTasksToRemove: (tasksToRemove: {}) => void;
}


const RemoveTaskModal = ({show, setShowRemoveTaskModal, tasksToRemove, setTasksToRemove}: Props) => {
    const [validationMessage, setValidationMessage] = useState({});

    const onSubmit = async (e: any) => {
            e.preventDefault(); 
        try {
            const formatted = formatTaskToRemoveBeforeSending();
            const response = await fetch("http://localhost:8080/tasks/delete-multiple-tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formatted),  //change the format of this to be [{id: 0, description:""}, {}] 
            });
            setShowRemoveTaskModal(false);
            if (response.ok) {
                //clear all the checkboxes
                setTasksToRemove({});
            } else {
            }
        } 

        catch (error) {
            setValidationMessage("An error occurred. Please try again later.");
        }
    };

  

    const formatTaskToRemoveBeforeSending = () => {
        let newKey = "";
        let arrayOfTasks = [];
        let tasks = Object.entries(tasksToRemove);
        for (let [key, value] of tasks) {
            let tempObj: Record<string, string> = {};

            newKey = key.substring(0, key.length - 5);
            tempObj["id"] = newKey;
            tempObj["title"] = value;
            console.log(tempObj["id"])
            arrayOfTasks.push(tempObj);
        }

        return arrayOfTasks;
    };

    return (
    
        <Modal
            isOpen={show}
            className='z-1000 mx-auto mt-[250px] bg-gray-50  p-0 ml-7 mr-7 bottom-0 rounded-md  max-w-96'
        >

                <div className='bg-primary-100 w-full rounded-t-md'>
                    <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowRemoveTaskModal(false)}/>
                    <div className='flex'>
                        <p className='mx-auto font-bold'>Remove Tasks</p>
                    </div>
                </div>

                <div className="gap-5 my-5 pb-5">
                    {Object.entries(tasksToRemove).length > 0 ? (
                        <>
                            <p className='ml-5 font-bold'>Are you sure you want to remove these tasks?</p>
                                <ul className="list-inside list-disc max-h-[200px] overflow-auto">
                                    {Object.values(tasksToRemove).map((task:string, index:number) => (
                                            <li key={index} className='ml-5 italic'>{task}</li>
                                    ))}
                                </ul>
                            <div className='ml-5 flex gap-8'>
                                <div className="flex">
                                    <button onClick={onSubmit} className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Confirm</button>
                                </div>

                                
                                <div className="flex ">
                                    <button onClick={() => setShowRemoveTaskModal(false)} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black" >Cancel</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='ml-5'>Please choose tasks to delete.</p>
                        </>
                    )}


                </div>
        </Modal>

  )
}

Modal.setAppElement('#root')

export default RemoveTaskModal;