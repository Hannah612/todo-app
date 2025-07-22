import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { CalendarStyling, type Input, type Task } from "../shared/types";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

type Props = {
    setShowEditTaskModal: (showEditTaskModal: boolean) => void;
    showEditTaskModal: boolean;
    task: Task;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
}


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EditTaskModal = ({task, setShowEditTaskModal, showEditTaskModal, setIsFormSubmitted}: Props) => {
    const inputStyles = `md:flex gap-2 mr-10 ml-5 mb-3 pr-10 text-black`
    const titleStyle = `font-bold text-white`;
    const [dueDate, onChange] = useState<Value>(new Date());
    const {
        register, 
        reset,
        getValues,
        setValue,
        formState: {dirtyFields}
    } = useForm<Input>({
            defaultValues: {
                title: task.title, 
                description: task.description ?? "",
                completed: task.completed, 
                priority_id: task.priority_id,
                due_date: task.due_date,
            },
            mode: "onChange", //validate on input change
        });

    const onSubmit = async (e: any) => {
            e.preventDefault(); 
        try {
            console.log(getValues());
            const response = await fetch("http://localhost:8080/tasks/" + task.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(getValues()),
            });

            if (response.ok) {
                toast.success("Form submitted!")
                setIsFormSubmitted(true);
                setShowEditTaskModal(false);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };

    useEffect(() => {
        const dueDateEvent = new CustomEvent("due_date", {
            detail: {
                name: "due_date",
                value: dueDate,
            },
        });
        setValue("due_date", dueDateEvent.detail.value as Date)
    }, [dueDate])

    useEffect(() => {
        const submitBtn = document.getElementById("submitButton");
        if (submitBtn) {
            if (Object.keys(dirtyFields).length > 0 || dueDate?.toLocaleString() !== (new Date(task.due_date)).toLocaleString()){
                (submitBtn as HTMLButtonElement).disabled = false;
            }
            else (submitBtn as HTMLButtonElement).disabled = true;
        }
    },[Object.keys(dirtyFields).length, dueDate]);

  return (
    <Modal
        isOpen={showEditTaskModal}
        className='z-1000 mx-auto bg-[#194054] mt-[100px] rounded-md max-w-[500px] max-h-[600px] overflow-auto'
    >
        <div>
            <div className='bg-[#0E2F3F] w-full rounded-t-md sticky top-0'>
                <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowEditTaskModal(false)}/>
                <div className='flex'>
                    <p className='mx-auto font-bold'>Edit Task</p>
                </div>
            </div>
            
               <form
                    onSubmit={onSubmit}
                >   
                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>*Title</label>
                        </div>
                        <input 
                            type="text" 
                            placeholder={task.title}
                            disabled
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Description</label>
                        </div>
                        <textarea
                            placeholder="Description"
                            rows={5}
                            cols={30} //make this flex
                            {...register("description")}
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Completed</label>
                        </div>
                        <input 
                            className="flex flex-col flex-start"
                            type="checkbox" 
                            {...register("completed")}
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3 '>
                            <label className={titleStyle}>Priority</label>
                        </div>
                        <select {...register("priority_id", {valueAsNumber: true})}>
                            <option value={1} className='font-green'>Low</option>
                            <option value={2} className='font-yellow'>Med</option>
                            <option value={3} className='font-red'>High</option>
                        </select>
                    </div>

                     <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Due Date</label>
                        </div>
                        <CalendarStyling>
                            <Calendar key="calendar" defaultValue={task.due_date} onChange={onChange}/>
                        </CalendarStyling>
                    </div>
                    <div className="flex mt-5 mb-5">
                        <DisabledButtonStyling
                            onSubmit={onSubmit}
                            id="submitButton"
                            disabled
                            className="rounded-lg ml-4 bg-primary-100 px-3 py-2 transition duration-500 hover:text-black hover:bg-white "
                        >
                            Submit
                        </DisabledButtonStyling>
                        <div className="ml-auto pr-5">
                            <button onClick={() => { setShowEditTaskModal(false); reset();}} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black" >Cancel</button>
                        </div>
                    </div>

                </form>
        </div>
    </Modal>
  )
}




const DisabledButtonStyling = styled.button`
  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

Modal.setAppElement('#root');

export default EditTaskModal;