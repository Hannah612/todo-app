import { motion } from "framer-motion";
import { SelectedPage, type Task } from "../shared/types";
import { motionProps } from "../shared/types"
import TaskCheckbox from "../shared/TaskCheckbox";
import { useEffect, useRef, useState } from "react";
import NewTaskModal from "../modals/NewTaskModal";
import RemoveTaskModal from "../modals/RemoveTaskModal";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Tasks = ({setSelectedPage}: Props) => {

   const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
   const [showRemoveTaskModal, setShowRemoveTaskModal] = useState<boolean>(false);
   const [tasks, setTasks] = useState<Task[]>([]); 
   const [checkedItems, setCheckedItems] = useState<{ [key: number]: string}>({});




   useEffect(() => {  //does this have to be in a
    fetch("http://localhost:8080/tasks") 
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [showNewTaskModal, showRemoveTaskModal]);

  /*
    takes all the name/ids from checkedItems, and returns the task from the tasks object 
  */
    // const checkedItemsContents = (): Array<Task> => {
    //     if (Object.keys(checkedItems).length > 0) {
    //        console.log('Object.keys(checkedItems)');
    //        console.log(Object.keys(checkedItems));

    //     }
    //     return tasks;
    // }
    
  return <section
        id="tasks"
        className="gap-16 bg-gray-20 md:h-auto md:pb-0" 
    >
        <motion.div 
            className="w-5/6 items-center justify-center"
            onViewportEnter={() => setSelectedPage(SelectedPage.Tasks)} //trigger func (go to homepage) when viewport is entered
        >
            {/* Main header */}
            <div className=" z-10 pl-20 ">
                {/* Headings */}
                <motion.div
                    className="flex mx-auto"
                    {...motionProps}
                > {/* -mt is positioning the heading higher */}
                <div>
                    <h4 className="font-bold font-montserrat text-[7vw] md:text-[4vw]">Tasks</h4> {/*text always 5% of vw */}
                </div>
                <div className="ml-auto my-auto">
                    <h3>
                        <span className="text-green font-bold block">Low priority</span>
                        <span className="text-yellow block">Med priority</span>
                        <span className="text-red block">High priority</span>
                    </h3>
                </div>
                </motion.div>
                </div>

            
            <motion.div 
                className="z-10 md:mt-5 pl-10"
                {...motionProps}
            >
                {/* TODO: 
                 - option to sort tasks by priority, due date, or completed
                 - show date in better way on mobile in TaskCheckbox */}
                <div> 
                    {tasks.map((task, index) => (
                        <TaskCheckbox 
                            setCheckedItems={setCheckedItems}
                            key={`${index}`}
                            title={task.title}
                            index={(index).toString()}
                            description={task.description}
                            checkedItems={checkedItems}
                            priority={task.priority_id}
                            completed={task.completed}
                            due_date={task.due_date}
                        ></TaskCheckbox>
                    ))}
                </div>
                <div className="flex gap-5 my-5 pb-10">
                    <button onClick={() => {setShowNewTaskModal(true)}} className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Add Task</button>
                    <div className="flex gap-3">
                        <NewTaskModal show={showNewTaskModal} setShowNewTaskModal={setShowNewTaskModal}></NewTaskModal>
                    </div>

                    
                    <button onClick={() => {setShowRemoveTaskModal(true)}} className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black">Remove Task</button>
                    <div className="flex gap-3">
                        <RemoveTaskModal tasksToRemove={checkedItems} show={showRemoveTaskModal} setShowRemoveTaskModal={setShowRemoveTaskModal}></RemoveTaskModal>
                    </div>
                </div>

            </motion.div>

        </motion.div>
  </section>
}

export default Tasks