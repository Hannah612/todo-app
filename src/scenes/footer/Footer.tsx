import { motion } from "framer-motion";
import { motionProps } from "../shared/types";

type Props = {
}

const Footer = ({  }: Props) => {
  return <section
        id="footer"
        className="h-[80px] pb-0 bg-dark-blue" 
    >
        <motion.div 
            {...motionProps}
        >
            <div className="w-full pt-5 text-sm text-gray-50">
                <p className="flex justify-end pr-5">Author: Hannah Ng </p>
                <p className="flex justify-end pr-5">Email: hannahng500@gmail.com </p>
            </div>

        </motion.div>
  </section>
}

export default Footer