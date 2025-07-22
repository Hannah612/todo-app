//https://www.youtube.com/watch?app=desktop&v=I2NNxr3WPDo&t=0s
import Navbar from "./scenes/navbar/Navbar";//refers to index.tsx without having to put it in the path
import { useEffect, useState } from "react";
import { SelectedPage } from "../src/scenes/shared/types";
import Home from "./scenes/home/Home";
import Tasks from "./scenes/tasks/Tasks";
import { ToastContainer } from "react-toastify";
import Footer from "./scenes/footer/Footer";

//manages the whole page structure

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home); //typescript inferred types can find the type for you by default, but better to be explicit
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => { //useEffect updates dynamically 
    const handleScroll = () => {
      if (window.scrollY === 0) {
        //at top of page 
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home); //selected page will change color in navbar if mobile menu item modal is open
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll); //window type objects should have event listener 
    return () => window.removeEventListener("scroll", handleScroll); //remove when leave the page 
  })
  return <div className="app bg-scroll">
    <Navbar 
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
    />
    <Home setSelectedPage={setSelectedPage} />
    <Tasks setSelectedPage={setSelectedPage} />
    <ToastContainer/>
    <Footer setSelectedPage={setSelectedPage}/>

  </div>
}

export default App;