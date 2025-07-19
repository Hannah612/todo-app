import AnchorLink from "react-anchor-link-smooth-scroll"
import type { SelectedPage } from "../shared/types";

//typescript = type/interface (interchangeable), just the type of the props to be used 
type Props = {
    page: string;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
}

function Link({
    page,
    selectedPage,
    setSelectedPage,
}: Props) {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;//lowercase, no spaces for href and id of page, treat as enum
  return (
    <AnchorLink
        className={`${selectedPage === lowerCasePage ? "text-rainbow" : "text-gray-50"}
            transition duration-500 hover:text-white
        `} //tailwind allows you to have smth like hover: color that allows a property to change when hovered over 
        href={`#${lowerCasePage}`}
        onClick={() => setSelectedPage(lowerCasePage)} //change state to selected page 
    >
        {page}
    </AnchorLink>
  )

  
}




export default Link