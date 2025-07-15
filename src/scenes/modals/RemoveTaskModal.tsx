import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState, type ChangeEvent } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import type { Task } from '../shared/types';
/*
    RemoveTaskModal: remove a task from the list 
*/
type Props = {
    show: boolean;
    setShowRemoveTaskModal: (showRemoveTaskModal: boolean) => void;
    tasksToRemove: { [key: number]: string; };
}


const RemoveTaskModal = ({show, setShowRemoveTaskModal, tasksToRemove}: Props) => {
    const [validationMessage, setValidationMessage] = useState({});

    const onSubmit = async (e: any) => {
            e.preventDefault(); 
        try {
            await fetch("http://localhost:8080/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(""),
            });
            setShowRemoveTaskModal(false);
        } catch (error) {
            setValidationMessage("An error occurred. Please try again later.");
        }
  };

    return (
    
        <Modal
            isOpen={show}
            className='z-1000 mx-auto mt-[250px] bg-gray-50  p-0 ml-7 mr-7 bottom-0 rounded-md  max-w-96'
        >

                <div className='bg-primary-100 w-full rounded-t-md'>
                    <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowRemoveTaskModal(false)}/>
                    <div className='flex'>
                        <p className='mx-auto font-bold'>Add New Task</p>
                    </div>
                </div>

                <div className="gap-5 my-5 pb-5">
                    <p className='ml-5 h-28'>Are you sure you want to remove these tasks?</p>
                    {/* show array of tasks to remove with type Tasks */}
                    <div>


                    </div>

                    <div className='ml-5 flex gap-8'>
                        <div className="flex">
                            <button className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Confirm</button>
                        </div>

                        
                        <div className="flex ">
                            <button onClick={() => setShowRemoveTaskModal(false)} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black" >Cancel</button>
                        </div>
                    </div>

                </div>
        </Modal>

  )
}

Modal.setAppElement('#root')

export default RemoveTaskModal;