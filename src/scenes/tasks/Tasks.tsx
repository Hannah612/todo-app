import { motion } from "framer-motion";
import { SelectedPage, type Task } from "../shared/types";
import { motionProps } from "../shared/types"
import TaskCheckbox from "../shared/TaskCheckbox";
import { useEffect, useState } from "react";

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Tasks = ({setSelectedPage}: Props) => {

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
            <div className="z-10  pl-10 ">
                {/* Headings */}
                <motion.div
                    {...motionProps}
                > {/* -mt is positioning the heading higher */}
                    <h4 className="font-bold font-montserrat text-[7vw] md:text-[4vw]">Tasks</h4> {/*text always 5% of vw */}

                </motion.div>
                </div>

            {/* Image on the right */}
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
                    <button className="p-2 rounded-md bg-green hover:bg-white text-white hover:text-black">Add Task</button>
                    <button className="p-2 rounded-md bg-red hover:bg-white text-white hover:text-black">Remove Task</button>
                </div>


            </motion.div>

        </motion.div>
  </section>
}

export default Tasks