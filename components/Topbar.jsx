import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useState } from "react";
import { BsTwitch, BsSearch, BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectToggle, createToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { addSearchData, cleanState } from "../store/slices/searchSlice/searchSlice";

const Topbar = () => { 
    const { data: session, status } = useSession()
    const currentToken = session?.user.token;
    
    const [name, setName] = useState("");
    
    const dispatch = useAppDispatch()

    const toggleSidebar = useAppSelector(selectToggle);
    const toggleButton = () => dispatch(createToggle(!toggleSidebar));

    const router = useRouter();
    const navigateHome = () => router.push('/');
    const navigateSearch = () => router.push('/search');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(cleanState([]));
        axios.get(`https://api.twitch.tv/helix/search/channels?query=${name}&first=8`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                }
            }
            ).then((data) => {
                data.data.data.map((info) => {
                    dispatch(addSearchData(info)); 
                })
            }); 
            navigateSearch();
    }
           
    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }
  
    return (
        <div className="flex flex-row text-white justify-between items-center py-2 px-5">
            <div className="flex justify-start cursor-pointer text-xs space-x-5">
                {toggleSidebar ? (
                    <BsArrowBarLeft 
                        onClick={toggleButton}
                        className="text-purple-400 text-sm hover:opacity-80"
                    />
                ):(
                    <BsArrowBarRight 
                        onClick={toggleButton} 
                        className="text-purple-400 text-sm hover:opacity-80"
                    />
                    
                )

                }
                <BsTwitch 
                    className="text-purple-800 md:text-2xl xs:text-xl hover:opacity-80"
                    onClick={navigateHome}
                />
            </div>

            <div className="flex justify-center text-white">
                <form onSubmit={handleSubmit}>
                    <input 
                        className="bg-gray-300 rounded lg:w-80 text-black pl-3 sm:w-60 xs:w-24"
                        type="search"
                        onChange={handleChange} 
                    />
                    <button type="submit">
                        <BsSearch 
                            className="sx:text-sm sm:text-md ml-2 align-middle cursor-pointer hover:opacity-80"
                        />
                    </button>
                </form>   
            </div>

            <div className="flex flex-row justify-end text-white items-center">
                <RiLogoutCircleRLine 
                    className="cursor-pointer mr-10 text-white sm:text-2xl sm:flex xs:hidden hover:text-purple-500"
                    onClick={() => signOut({callbackUrl: "/login" })}
                />

                <Link href={{pathname: '/profile', query:{name: (session?.user.name), id: (session?.user.id), image: (session?.user.image), state:(false) }}}>
                    <div className="flex items-center hover:opacity-80 cursor-pointer">
                        <h4 className="text-xs pr-2 hover:text-purple-500 xs:hidden lg:flex">{session?.user.name}</h4>
                        <img className="rounded-full md:w-8 md:h-8 xs:h-6 xs:w-6" src={session?.user.image} alt="" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Topbar;