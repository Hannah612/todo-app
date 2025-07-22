import Navbar from "./scenes/navbar/Navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "../src/scenes/shared/types";
import Home from "./scenes/home/Home";
import Tasks from "./scenes/tasks/Tasks";
import { ToastContainer } from "react-toastify";
import Footer from "./scenes/footer/Footer";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home); //typescript inferred types can find the type for you by default, but better to be explicit
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => { //useEffect updates dynamically 
    const handleScroll = () => {
      if (window.scrollY === 0) {
        //at top of page 
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home); 
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll); 
  })
  return <div className="app bg-scroll">
    <Navbar 
      selectedPage={selectedPage} 
      setSelectedPage={setSelectedPage}
    />
    <Home setSelectedPage={setSelectedPage} />
    <Tasks setSelectedPage={setSelectedPage} />
    <Footer />
    <ToastContainer/> 
  </div>
}

export default App;