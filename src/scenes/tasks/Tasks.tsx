import { motion } from "framer-motion";
import { SelectedPage, type Task } from "../shared/types";
import { motionProps } from "../shared/types"
import TaskCheckbox from "../shared/TaskCheckbox";
import { useEffect, useState } from "react";
import NewTaskModal from "../modals/NewTaskModal";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Tasks = ({setSelectedPage}: Props) => {

   const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
   const [tasks, setTasks] = useState<Task[]>([]);

   useEffect(() => {
    fetch("http://localhost:8080/tasks") // Replace with your Spring API URL
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


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
                <div>
                    {tasks.map((task, index) => (
                        <TaskCheckbox 
                            key={`${task.title}-${index}`}
                            title={task.title}
                            description={task.description}
                            priority={task.priority_id}
                            completed={task.completed}
                        ></TaskCheckbox>
                    ))}
                </div>
                <div className="flex gap-5 my-5 pb-10">
                    <button onClick={() => {setShowNewTaskModal(true); console.log(showNewTaskModal); }} className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Add Task</button>
                    <div className="flex gap-3">
                        <NewTaskModal show={showNewTaskModal} setShowNewTaskModal={setShowNewTaskModal}></NewTaskModal>
                    </div>

                    
                    <button className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black">Remove Task</button>
                </div>

            </motion.div>

        </motion.div>
  </section>
}

export default Tasks