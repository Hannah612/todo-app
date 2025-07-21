import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, type ChangeEvent } from "react";
import Modal from 'react-modal';
import type { Input, Task } from "../shared/types";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import styled from "@emotion/styled";

type Props = {
    setShowEditTaskModal: (showEditTaskModal: boolean) => void;
    showEditTaskModal: boolean;
    task: Task;
}


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

//placeholders should be the existing task
const EditTaskModal = ({task, setShowEditTaskModal, showEditTaskModal}: Props) => {
    const inputStyles = `md:flex gap-2 mr-10 ml-5 mb-3 pr-10 text-black`
    const [inputs, setInputs] = useState<Input>({
        title:"", 
        description: "",
        completed: "", 
        priority_id: "",
        due_date: new Date(),
    });
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [priority, setPriority] = useState<number>(0);
    const titleStyle = `font-bold text-white`;
    const [dueDate, onChange] = useState<Value>(new Date());
    
    const {
        register, 
        trigger, //validate form if needed
        formState: { errors }
    } = useForm();


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
                setShowEditTaskModal(false);
            } else {
            }
        } catch (error) {
        }
  };
  //maybe make a seperate component for handling forms?
      const handleChange = (e: any) => { 
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
  
      const handleCompletedCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
          setIsCompleted(e.target.checked);
          handleChange(e);
      };
  
      const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
          setPriority(Number(e.target.value));
          handleChange(e);
      };

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
                            <label className={titleStyle}>Description</label>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Description"
                            name="description"
                            value={inputs.description || ""} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Completed</label>
                        </div>
                        <input type="checkbox" name="completed" value={inputs.completed || false}  onChange={handleCompletedCheckboxChange} className="flex flex-col flex-start"/>
                    </div>

                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3 '>
                            <label className={titleStyle}>Priority</label>
                        </div>
                        <select id="dropdown" value={inputs.priority_id || ""}  name="priority_id" onChange={handlePriorityChange}>
                            <option value="3" className='font-red'>Low</option>
                            <option value="2" className='font-yellow'>Med</option>
                            <option value="1" className='font-red'>High</option>
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
                            type="submit"
                            className="rounded-lg ml-4 bg-primary-100 px-3 py-2 transition duration-500 hover:text-white"
                        >
                            Submit
                        </button>
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

Modal.setAppElement('#root');

export default EditTaskModal;