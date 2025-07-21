import { motion } from "framer-motion";
import { OrderType, SelectedPage, SortType, type Task } from "../shared/types";
import { motionProps } from "../shared/types"
import TaskCheckbox from "../shared/TaskCheckbox";
import { useEffect, useState } from "react";
import NewTaskModal from "../modals/NewTaskModal";
import RemoveTaskModal from "../modals/RemoveTaskModal";
import FilterDropdown from "../shared/FilterDropdown";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Tasks = ({setSelectedPage}: Props) => {

   const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
   const [showRemoveTaskModal, setShowRemoveTaskModal] = useState<boolean>(false);
   const [tasks, setTasks] = useState<Task[]>([{
                                                title: "",
                                                description: "",
                                                priority_id: 0,
                                                completed: false,
                                                category_id: 0,
                                                due_date: new Date(),
                                                id: 0
                                            }]); 
   const [checkedItems, setCheckedItems] = useState<{ [key: string]: string}>({});
   const [sortBy, setSortBy] = useState<SortType>(SortType.Priority);
   const [order, setOrder] = useState<OrderType>(OrderType.ASC);
   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);


  /*
    Tasks can be sorted by completed, urgency, or date
    Future: drag tasks around for custom order, sort by unselected/selected
  */
  useEffect(() => {  //does this have to be in a
    fetch("http://localhost:8080/tasks/sort/"+ sortBy + "/" + order) 
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
      setIsFormSubmitted(false);
  }, [sortBy, order, checkedItems, isFormSubmitted]);

  return <section
        id="tasks"
        className="md:h-[600px] md:pb-0 " 
    >
        <motion.div 
            className="w-full pr-5 items-center justify-center mt-10 size-100 absolute"
            onViewportEnter={() => setSelectedPage(SelectedPage.Tasks)} //trigger func (go to homepage) when viewport is entered
        >
            {/* Main header */}
            <div className=" z-10 pl-10">
                {/* Headings */}
                <motion.div
                    className="md:flex"
                    {...motionProps}
                >
                <div>
                    <h4 className="font-bold font-montserrat text-[7vw] md:text-[4vw] ">Tasks</h4> {/*text always 5% of vw */}
                </div>
                <div className="ml-auto">
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
                    {tasks.map((task, _) => (
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
                    <button onClick={() => {setShowNewTaskModal(true)}} className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Add Task</button>
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