import useMediaQuery from "../hooks/useMediaQuery";
import { motionProps, SelectedPage } from "../shared/types"
import Notepad  from "../../assets/Notepad.jpg"
import { motion } from "framer-motion"; //animation to move text from left to right on load

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
};

function Home({ setSelectedPage }: Props) {
    const isAboveMediumScreens = useMediaQuery("(min-width:1060px)"); //bool to see is it mobile or web

    return <section
        id="home"
        className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0" //md:h-full = media query only when it's above medium screen 
    >
        {/* Image and main header */}
        <motion.div 
            className="md:flex mx-auto w-5/6 items-center justify-center md:h-5/6"
            onViewportEnter={() => setSelectedPage(SelectedPage.Home)} //trigger func (go to homepage) when viewport is entered
        > {/* md = only if in web/bigger screens*/}
            {/* Main header */}
            <div className="z-10 mt-32 md:basis-3/5">
                {/* Headings */}
                <motion.div
                    className="md:-mt-20"
                    {...motionProps}
                > {/* -mt is positioning the heading higher */}
                    <div className="relative">{/* always set relative on parent img and absolute on child, this is the main title */}
                        <div className="before:absolute before:-top-20 before:z-[-1] md:before:content-leaves">
                            {/* <img alt="home-page-text" src={HomePageText} /> */}
                            <h4 className="flex font-bold font-montserrat text-[7vw] md:text-[4vw]">Notes</h4> {/*text always 5% of vw */}
                        </div>
                    </div>

                    <p className="mt-8 text-sm">
                        Note taking app made for taking notes!
                    </p>
                </motion.div>
                </div>

            {/* Image on the right */}
            <motion.div 
                className="flex justify-center z-10 md:ml-40 md:mt-16 md:justify-items-end"
                {...motionProps}
            >
                <img 
                    className="justify-center rounded-full mt-10 w-4/5 md:w-2/5 md:basis-[500px] md:mt-0"
                    alt="notepad" 
                    src={Notepad} 
                />
            </motion.div>
        </motion.div>

        <div className="h-[150px] w-full bg-dark-brown py-10"></div> {/*seperation line*/}

    </section>
}

export default Home