import { motion } from "framer-motion";
import { SelectedPage } from "../shared/types";

type Props = {
    setSelectedPage: (selectedPage: SelectedPage) => void;
}

const Footer = ({ setSelectedPage }: Props) => {
  return <section
        id="tasks"
        className="h-11 md:pb-0" 
    >
        <motion.div 
            className="w-full pr-5 items-center justify-center mt-10 size-100 absolute"
            onViewportEnter={() => setSelectedPage(SelectedPage.Footer)} //trigger func (go to homepage) when viewport is entered
        >

        </motion.div>
    </section>
  
}

export default Footer