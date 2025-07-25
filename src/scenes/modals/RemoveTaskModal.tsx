import { XMarkIcon } from '@heroicons/react/24/solid';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { removeTasks } from '../../slices/removeTaskSlice';
import type { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { ResponseCodes } from '../shared/ResponseCodes';

type Props = {
    show: boolean;
    setShowRemoveTaskModal: (showRemoveTaskModal: boolean) => void;
    tasksToRemove: { [key: string]: string; };
    setTasksToRemove: (tasksToRemove: {}) => void;
}

const RemoveTaskModal = ({show, setShowRemoveTaskModal, tasksToRemove, setTasksToRemove}: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); 
            const formatted = formatTaskToRemoveBeforeSending();

              dispatch(removeTasks(formatted))
                  .unwrap()
                  .then((res: any) => {
                      if (res.status == ResponseCodes.OK) {
                        setShowRemoveTaskModal(false);
                        setTasksToRemove({});
                        toast.success("Task(s) deleted.")
                      }
              }).catch((err) => {
                   toast.error(err);
              })

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
            className='z-1000 mx-auto bg-[#194054] mt-[200px] rounded-md  max-w-96'
        >

                <div className='bg-[#0E2F3F] w-full rounded-t-md'>
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
                            <div className='ml-5 flex gap-8 pt-5'>
                                <div className="flex">
                                    <button onClick={onSubmit} className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Confirm</button>
                                </div>

                                
                                <div className="flex ">
                                    <button onClick={() => setShowRemoveTaskModal(false)} className="p-2 rounded-md bg-red hover:bg-white text-white ml-auto hover:text-black" >Cancel</button>
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