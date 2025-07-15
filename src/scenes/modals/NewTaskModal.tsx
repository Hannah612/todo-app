import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState, type ChangeEvent } from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
/*
    NewTaskModal: a modal that open when add task is pressed, and shows a form for the new task input
*/
type Props = {
    show: boolean;
    setShowNewTaskModal: (showNewTaskModal: boolean) => void;
}


const NewTaskModal = ({show, setShowNewTaskModal}: Props) => {
    const inputStyles = `md:flex gap-2 mr-10 ml-5 mb-3 pr-10`
    const [inputs, setInputs] = useState({});
    const [validationMessage, setValidationMessage] = useState({});
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [priority, setPriority] = useState<number>(0);
    const titleStyle = `font-bold`;
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
                setValidationMessage("Form submitted successfully!");
                setInputs({ name: "", email: "" }); 
                setShowNewTaskModal(false);
            } else {
                setValidationMessage("Failed to submit the form. Please try again.");
            }
        } catch (error) {
            setValidationMessage("An error occurred. Please try again later.");
        }
  };

    const handleChange = (e: any) => { //add the new inputs to the object to send to backend
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        console.log(name);
        console.log(value);
        setInputs(values => ({...values, [name]: value}))
    }

    const handleCompletedCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(e.target.checked);
        handleChange(e);
    };

    const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPriority(Number(e.target.value));
        handleChange(e);
    };

    return (
    
        <Modal
            isOpen={show}
            className='z-1000 mx-auto mt-[250px] bg-gray-50  p-0 ml-7 mr-7 bottom-0 rounded-md pb-3 max-w-96'
        >
            <div>
                <div className='bg-primary-100 w-full rounded-t-md'>
                    <XMarkIcon className='basis-1/5 ml-auto w-5' onClick={() => setShowNewTaskModal(false)}/>
                    <div className='flex'>
                        <p className='mx-auto font-bold'>Add New Task</p>
                    </div>
                </div>

                {/** Add New Task form*/}
                <form
                    // target="_blank" //go to another page on submit
                    onSubmit={onSubmit}
                >   
                    <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>*Title</label>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Title"
                            name="title"
                            required
                            value={inputs.title || ""} 
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>
                    {errors.title && (
                        <p className="text-primary-500">
                            {errors.title.type === "required" && "This field is required."}
                            {errors.title.type === "maxLength" && "Max length is 100 char."}
                        </p>
                    )}

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
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Priority</label>
                        </div>
                        <select id="dropdown" value={inputs.priority_id || ""}  name="priority_id" onChange={handlePriorityChange}>
                            <option value="3" className='font-red'>Relaxed</option>
                            <option value="2" className='font-yellow'>Important</option>
                            <option value="1" className='font-red'>Urgent</option>
                        </select>
                    </div>

                    {/* <InputLabel id="priority" className={titleStyle}>Priority</InputLabel>
                    <Select
                        labelId="priority"
                        id="priority"
                        value={priority}
                        label="Priority"
                        onChange={handlePriorityChange}
                    >
                        <MenuItem className='font-red' value={3}>Relaxed</MenuItem>
                        <MenuItem value={2}>Important</MenuItem>
                        <MenuItem value={1}>Urgent</MenuItem>
                    </Select> */}

                     <div className={inputStyles}>
                        <div className='md:flex md:mr-3'>
                            <label className={titleStyle}>Due Date</label>
                        </div>
                        <input  //make sure its in the correct format, or provide a calendar 
                            type="text" 
                            placeholder="Due Date"
                            name="due_date"
                            value={inputs.due_date || ""} 
                            onChange={handleChange}
                        />
                    </div>

   
    
                    
                    <button
                        type="submit"
                        className="mt-5 rounded-lg ml-4 bg-primary-100 px-3 py-2 transition duration-500 hover:text-white"
                    >
                        Submit
                    </button>
                </form>

            </div>
        </Modal>

  )
}

Modal.setAppElement('#root')

export default NewTaskModal