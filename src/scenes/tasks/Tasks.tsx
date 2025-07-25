import { motion } from "framer-motion";
import { OrderType, SelectedPage, SortType, type Task } from "../shared/types";
import { motionProps } from "../shared/types"
import TaskCheckbox from "../shared/TaskCheckbox";
import { useEffect, useState } from "react";
import NewTaskModal from "../modals/NewTaskModal";
import RemoveTaskModal from "../modals/RemoveTaskModal";
import FilterDropdown from "../shared/FilterDropdown";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, searchTasks } from "../../slices/getTasksSlice";
import type { AppDispatch } from "../../store";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Tasks = ({setSelectedPage}: Props) => {
    const  { tasks } = useSelector((state: any) => state.tasks); 
    const dispatch = useDispatch<AppDispatch>();

   const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
   const [showRemoveTaskModal, setShowRemoveTaskModal] = useState<boolean>(false);
   const [checkedItems, setCheckedItems] = useState<{ [key: string]: string}>({});
   const [sortBy, setSortBy] = useState<SortType>(SortType.Priority);
   const [order, setOrder] = useState<OrderType>(OrderType.ASC);
   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
   const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTasks({sortBy, order}));
    // dispatch(searchTasks(encodeURIComponent(search))); //apply search filter if there is a query
    setIsFormSubmitted(false);
  }, [dispatch, isFormSubmitted, checkedItems, order, sortBy, search]);

  return <section
        id="tasks"
        className="md:h-[600px] md:pb-0" 
    >
        <motion.div 
            className="w-full pr-5 items-center justify-center mt-10 size-100"
            onViewportEnter={() => setSelectedPage(SelectedPage.Tasks)}
        >
            <div className=" z-10 pl-10">
                <motion.div
                    className="md:flex"
                    {...motionProps}
                >
                <div>
                    <h4 className="font-bold font-montserrat text-[7vw] md:text-[4vw] ">Tasks</h4> 
                </div>

                <div className="ml-auto">
                    <div className="flex">
                        <input
                            id="searchField"
                            className="w-full rounded-sm mr-3 text-black"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
   
                    <h3 className="flex">
                        <span className="font-bold block underline">Priority Colors</span>
                        <div className="ml-auto flex pb-2">
                            <span className="text-green font-bold block pl-5">Low</span>
                            <span className="text-yellow block pl-5">Med</span>
                            <span className="text-red block pl-5">High</span>
                        </div>
 
                    </h3>
                    <FilterDropdown
                        setSortBy={setSortBy}
                        setOrder={setOrder}
                    >
                    </FilterDropdown>
                </div>
                </motion.div>
                </div>

            
            <motion.div 
                className="z-10 md:mt-5 pl-10 "
                {...motionProps}
            >
                <div className="max-h-[300px] md:max-h-[400px] rounded-md overflow-auto p-3 bg-transparent"> 
                    {tasks.map((task: any, _: any) => (
                        <TaskCheckbox 
                            setIsFormSubmitted={setIsFormSubmitted}
                            setCheckedItems={setCheckedItems}
                            key={`${ task.id }`}
                            index={(task.id).toString()}
                            checkedItems={checkedItems}
                            task={task}
                        ></TaskCheckbox>
                    ))}
                </div>

                <div className="flex gap-5 my-5 pb-10">
                    <button onClick={() => {setShowNewTaskModal(true)}} className="p-2 rounded-md bg-green-btn hover:bg-white text-white hover:text-black">Add Task</button>
                    <div>
                        <NewTaskModal showNewTaskModal={showNewTaskModal} setIsFormSubmitted={setIsFormSubmitted} setShowNewTaskModal={setShowNewTaskModal}></NewTaskModal>
                    </div>
                    <button onClick={() => {setShowRemoveTaskModal(true)}} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black">Remove Task</button>
                    <div>
                        <RemoveTaskModal tasksToRemove={checkedItems} setTasksToRemove={setCheckedItems} show={showRemoveTaskModal} setShowRemoveTaskModal={setShowRemoveTaskModal}></RemoveTaskModal>
                    </div>
                </div>

            </motion.div>

        </motion.div>
  </section>
}

export default Tasks