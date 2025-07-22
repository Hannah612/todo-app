import { motionProps, SelectedPage } from "../shared/types"
import Notepad  from "../../assets/Notepad.jpg"
import { motion } from "framer-motion"; 

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

function Home({ setSelectedPage }: Props) {

    return <section
        id="home"
        className="gap-16  py-10 md:h-full md:pb-0"
    >
        <motion.div 
            className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
            onViewportEnter={() => setSelectedPage(SelectedPage.Home)} 
        > 
            <div className="z-10 mt-32 md:basis-3/5">
                <motion.div
                    className="md:-mt-20"
                    {...motionProps}
                > 
                    <div className="relative">
                        <div className="before:absolute before:-top-20 before:z-[-1] md:before:content-leaves">
                            <h4 className="flex font-bold font-montserrat text-[7vw] md:text-[4vw]">To Do</h4> 
                        </div>
                    </div>

                    <p className="mt-8 text-sm">
                       Stay on top of tasks with this app!
                    </p>
                </motion.div>
                </div>

            <motion.div 
                className="flex justify-center md:ml-40 md:mt-16 md:justify-items-end"
                {...motionProps}
            >
                <img 
                    className="justify-center rounded-full mt-10 w-4/5 md:w-2/5 md:basis-[500px] md:mt-0 z-0"
                    alt="notepad" 
                    src={Notepad} 
                />
            </motion.div>
        </motion.div>
    </section>
}

export default Home;