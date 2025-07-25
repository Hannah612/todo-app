import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState} from 'react';
import Calendar from 'react-calendar'; //https://www.npmjs.com/package/react-calendar
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { CalendarStyling, type Input } from '../shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { postTask } from '../../slices/postTaskSlice';
import type { AxiosResponse } from 'axios';
import type { AsyncThunkAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../../store';
import { ResponseCodes } from '../shared/ResponseCodes';
/*
    NewTaskModal: a modal that open when add task is pressed, and shows a form for the new task input
*/
type Props = {
    showNewTaskModal: boolean;
    setShowNewTaskModal: (showNewTaskModal: boolean) => void;
    setIsFormSubmitted: (isFormSubmitted: boolean) => void;
}


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewTaskModal = ({setIsFormSubmitted, showNewTaskModal, setShowNewTaskModal}: Props) => {
    const inputStyles = `md:flex gap-2 mr-10 mt-3 ml-5 pr-10 text-black`
    const dispatch = useDispatch<AppDispatch>();

    const titleStyle = `font-bold text-white`;
    const [dueDate, onChange] = useState<Value>(new Date());
    const {
        register, 
        reset,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<Input>({
            defaultValues: {
                title: "", 
                description: "",
                completed: false, 
                priority_id: 1,
                due_date: new Date(),
            },
            mode: "onChange", //validate on input change
        });

    const onSubmit = async (e: any) => {
            e.preventDefault(); 
            dispatch(postTask(getValues()))
                .unwrap()
                .then((res: any) => {
                    if (res.status == ResponseCodes.TASK_CREATED) {
                        toast.success("Form submitted!")
                        setIsFormSubmitted(true);
                        setShowNewTaskModal(false);
                        reset();
                    }
            }).catch((err) => {
                 toast.error(err);
            })
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


    return (
        <Modal
            isOpen={showNewTaskModal}
            className='z-1000 mx-auto bg-[#194054] mt-[100px] rounded-md max-w-[500px] max-h-[600px] overflow-auto'
        >
            <div>
                <div className='bg-[#0E2F3F] w-full rounded-t-md sticky top-0'>
                    <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowNewTaskModal(false)}/>
                    <div className='flex'>
                        <p className='mx-auto font-bold'>Add New Task</p>
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
                            placeholder="Title"
                            required
                            {...register("title", {
                                required: "This field is required.",
                                maxLength: {
                                    value: 100,
                                    message: "Max length is 100 chars."
                                }
                            })}
                        />
                    </div>
                    {errors.title && (
                        <p className="text-red pl-5 pt-0">
                            {errors.title.type === "required" && errors.title.message?.toString()}
                            {errors.title.type === "maxLength" && errors.title.message?.toString()}
                        </p>
                    )}

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
                        <select {...register("priority_id")}>
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
                            <Calendar key="calendar" value={dueDate || ""} onChange={onChange}/>
                        </CalendarStyling>
                    </div>
                    <div className="flex mt-5 mb-5">
                        <button
                            onSubmit={onSubmit}
                            className="rounded-lg ml-4 bg-primary-100 px-3 py-2 transition duration-500 hover:text-black hover:bg-white "
                        >
                            Submit
                        </button>
                        <div className="ml-auto pr-5">
                            <button onClick={() => setShowNewTaskModal(false)} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black" >Cancel</button>
                        </div>
                    </div>

                </form>

            </div>
        </Modal>

  )
  
}

Modal.setAppElement('#root')

export default NewTaskModal;