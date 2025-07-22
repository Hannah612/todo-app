import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid" 
import Link from "../navbar/Link";
import { SelectedPage } from "../shared/types";
import { CloudIcon } from "@heroicons/react/24/outline";

type Props = {
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({selectedPage, setSelectedPage} : Props) => {
  const flexBetween = "flex items-center justify-between";  
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navbarBackground = "bg-dark-blue opacity-90 z-10 rounded-b-lg";
  const [isHovered, setIsHovered] = useState(false);

    return <nav>
        <div 
            className={`${navbarBackground} ${flexBetween} fixed top-0  w-full py-6`} 
        >
            <div className={`${flexBetween} mx-auto w-5/6`}> 
                <div className={`${flexBetween} w-full gap-16`}>
                        <div 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                                <button
                                    className="rounded-full bg-secondary-500 p-2"
                                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                                >
                                    <Bars3Icon className="h-6 w-6 text-white" />
                                </button>
                            ) : (
                                <CloudIcon className="w-10 z-60"></CloudIcon>
                            )}
                        </div>

                
                    <div className={`${flexBetween} w-full`}>
                        <div className={`${flexBetween} gap-8 text-sm`}> 
                            {/*links */}
                            <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                            <Link page="Tasks" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {isMenuToggled && (
            <div className="fixed right-0 pb-20 rounded-md z-40 w-[300px] text-white bg-black-bg drop-shadow-xl flex flex-col">
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-white"/>
                    </button>
                </div>
                <div className="ml-[33%] flex flex-col gap-10 text-xl">
                    <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                    <Link page="Tasks" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                </div>
            </div>
        )}
    </nav>
}

export default Navbar;