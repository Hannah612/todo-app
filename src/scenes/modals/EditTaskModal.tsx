import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import type { Input, Task } from "../shared/types";
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

//placeholders should be the existing task
const EditTaskModal = ({task, setShowEditTaskModal, showEditTaskModal, setIsFormSubmitted}: Props) => {
    const inputStyles = `md:flex gap-2 mr-10 ml-5 mb-3 pr-10 text-black`
    const titleStyle = `font-bold text-white`;
    const [inputs, setInputs] = useState<Input>({
        title: task.title, 
        description: task.description || "",
        completed: task.completed, 
        priority_id: task.priority_id,
        due_date: task.due_date,
    });
    const [dueDate, onChange] = useState<Value>(new Date());
    const {
        register, 
        reset,
        formState: { errors }
        
    } = useForm({
            defaultValues: {
                title: task.title, 
                description: task.description || "",
                completed: task.completed, 
                priority_id: task.priority_id,
                due_date: task.due_date,
            },
            mode: "onChange", //validate on input change
        });

    const onSubmit = async (e: any) => {
            e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8080/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });

            if (response.ok) {
                toast.success("Form submitted!")
                setIsFormSubmitted(true);
                setShowEditTaskModal(false);
                reset();
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
  };

    const handleChange = (e: any) => { //add the new inputs to the object to send to backend
        let value = "";
        let name = "";
        if (e.hasOwnProperty("target")) {
            name = e.target.name;
            if (e.target.type === "checkbox") {
                value = e.target.checked;
            } else value = e.target.value;
        } else {
            name = e.detail.name;
            value = e.detail.value;
        }
        console.log(name, value);
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        const dueDateEvent = new CustomEvent("due_date", {
            detail: {
                name: "due_date",
                value: dueDate,
            },
        });
        handleChange(dueDateEvent);
    }, [dueDate])

    useEffect(() => {
        const {id, category_id, ...restOfTask}: Task = task;
        const submitBtn = document.getElementById("submitButton");
        if (submitBtn) {
            console.log(restOfTask);
            console.log(inputs);
            console.log(Object.keys(restOfTask).some((key: string) => restOfTask[key] !== inputs[key]));
            if (
                Object.keys(restOfTask).some((key: string) => restOfTask[key] !== inputs[key])
            ){
                (submitBtn as HTMLButtonElement).disabled = false;
            } else (submitBtn as HTMLButtonElement).disabled = true;
        }

    }, [inputs])

  return (
    <Modal
        isOpen={showEditTaskModal}
        className='z-1000 mx-auto bg-[#194054] mt-[200px] rounded-md max-w-96 max-h-[500px] overflow-auto'
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
                            <label className={titleStyle}>*Title: <span> {task.title} </span></label>
                        </div>
                    </div>
         
                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Description</label>
                        </div>
                        <textarea
                            placeholder={task.description || ""}
                            rows={5}
                            cols={30} //make this flex
                            {...register("description", {
                                onChange: (e) => handleChange(e)
                            })}
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Completed</label>
                        </div>
                        <input 
                            className="flex flex-col flex-start"
                            type="checkbox" 
                            {...register("completed", {
                                onChange: (e) => handleChange(e)
                            })}
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3 '>
                            <label className={titleStyle}>Priority</label>
                        </div>
                        <select {...register("priority_id", { onChange: (e) => handleChange(e) })}>
                            <option value={3} className='font-red'>Low</option>
                            <option value={2} className='font-yellow'>Med</option>
                            <option value={1} className='font-red'>High</option>
                        </select>
                    </div>

                     <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Due Date</label>
                        </div>
                        <CalendarStyling>
                            <Calendar key="calendar" value={dueDate || ""} onChange={onChange}/>
                        </CalendarStyling>
                    </div>
                    <div className="flex mt-5 mb-5">
                        <DisabledButtonStyling
                            id="submitButton"
                            type="submit"
                            className="rounded-lg ml-4 bg-primary-100 px-3 py-2  hover:text-black hover:bg-white "
                            disabled={true}
                       >
                            Submit
                        </DisabledButtonStyling>
                        <div className="ml-auto pr-5">
                            <button onClick={() => setShowEditTaskModal(false)} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black" >Cancel</button>
                        </div>
                    </div>

                </form>
        </div>
    </Modal>
  )
}


const CalendarStyling = styled.div`
  .react-calendar__tile--now {
    background: #e6efe6;
  }

  .react-calendar__tile--active {
    background: #fa9de9;
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: #fa9de9;
  }

  .react-calendar__tile--active:enabled:focus {
    background: #fa9de9;
  }

  .react-calendar {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: white;
  }
`;

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