import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { BsTwitch, BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

import SearchBar from "./SearchBar";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectToggle, createToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { useState } from "react";
import TopbarMenu from "./TopbarMenu";

const Topbar = () => { 
    const router = useRouter();
    const dispatch = useAppDispatch(); 
    const toggleSidebar = useAppSelector(selectToggle);

    const [clickSearch, setClickSearch] = useState(false);

    const toggleButton = () => dispatch(createToggle(!toggleSidebar));
    const navigateHome = () => router.push('/');
    const openSearchBar = () => setClickSearch(true);
    const hideSearchBar = () => setClickSearch(false);
    
    return (
        <div className="flex text-white justify-between items-center py-2 px-5">
            <div className={`flex justify-start text-xs space-x-20 sm:w-1/3 ${clickSearch? 'xs:hidden sm:flex':'xs:flex'}`}>
                {toggleSidebar ? (
                    <BsArrowBarLeft 
                        onClick={toggleButton}
                        className="text-purple-400 text-lg hover:opacity-80 cursor-pointer"
                    />
                ):(
                    <BsArrowBarRight 
                        onClick={toggleButton} 
                        className="text-purple-400 text-lg hover:opacity-80 cursor-pointer"
                    />               
                )}
                <BsTwitch 
                    className={`text-purple-800 md:text-2xl xs:text-xl hover:opacity-80 cursor-pointer`}
                    onClick={navigateHome}
                />
            </div>
            <SearchBar 
                openSearchBar={openSearchBar} 
                clickSearch={clickSearch} 
                hideSearchBar={hideSearchBar} 
            />       
            <TopbarMenu  />
        </div>
    );
}

export default Topbar;
