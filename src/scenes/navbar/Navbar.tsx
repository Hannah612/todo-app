import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid" //24 = size of icon
import Link from "../navbar/Link";
import { SelectedPage } from "../shared/types";
import { CloudIcon } from "@heroicons/react/24/outline";


type Props = {
    isTopOfPage: boolean;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({isTopOfPage, selectedPage, setSelectedPage} : Props) => {
  const flexBetween = "flex items-center justify-between"; //common layout to align items left and right in navbar  
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navbarBackground = "bg-dark-blue opacity-90 z-10 rounded-b-lg";
  const [isHovered, setIsHovered] = useState(false);

    return <nav>
        <div 
            className={`${navbarBackground} ${flexBetween} fixed top-0  w-full py-6`} //flexBetween spaces all the nav bar elements correctly, fixed sticky top navbar
        >
            <div className={`${flexBetween} mx-auto w-5/6`}> 
                {/*mx-auto is centers in middle, then inner div rep 83% of width (5/6 percentage) */}
                <div className={`${flexBetween} w-full gap-16`}>
                    {/* Left side img */}
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

                
                    <div className={`${flexBetween} w-full`}> {/*div for the button */}
                        <div className={`${flexBetween} gap-8 text-sm`}> {/*gap = gap between each element*/}
                            {/*links */}
                            <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                            <Link page="Tasks" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Mobile menu modal */}
        {isMenuToggled && (
            <div className="fixed right-0 pb-20 rounded-md z-40 w-[300px] text-white bg-black-bg drop-shadow-xl flex flex-col">
                { /* Close icon in modal */}
                <div className="flex justify-end p-12">
                    <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                        <XMarkIcon className="h-6 w-6 text-white"/>
                    </button>
                </div>
                {/* Menu items in model */}
                <div className="ml-[33%] flex flex-col gap-10 text-xl"> {/*flex-col = flex vertically*/}
                    {/*links */}
                    <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                    <Link page="Tasks" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> 
                </div>
            </div>
        )}
    </nav>
}

export default Navbar;