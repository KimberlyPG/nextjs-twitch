import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { BsTwitch, BsSearch } from "react-icons/bs";
import { useRouter } from 'next/router'

import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectToggle, createToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { addSearchData } from "../store/slices/searchSlice/searchSlice";

const Topbar = () => { 
    const { data: session, status } = useSession()
    const currentToken = session?.user.token;
    
    const [name, setName] = useState("");
    
    const dispatch = useAppDispatch()

    const toggleSidebar = useAppSelector(selectToggle);
    const toggleButton = () => dispatch(createToggle(!toggleSidebar));

    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.twitch.tv/helix/search/channels?query=${name}&first=5`,
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
            router.push('/')
    }
           
    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const RedirectHome = () => {

    }
    
    return (
        <div className="flex flex-row justify-between pt-2 pb-1 items-center pl-5 pr-5">
            <BsTwitch 
                className="text-purple-800 text-2xl justify-start cursor-pointer hover:opacity-80"
                onClick={toggleButton}
            />
            <div className="flex justify-center text-white">
                <form onSubmit={handleSubmit}>
                    <input 
                        className="bg-gray-300 rounded w-80 text-black"
                        type="search"
                        onChange={handleChange} 
                    />
                    <button type="submit">
                        <BsSearch 
                            className="text-l ml-2 align-middle cursor-pointer hover:opacity-80"
                        />
                    </button>
                </form>   
            </div>
            <div className="flex flex-row justify-end text-white items-center">
                <h4 className="cursor-pointer pr-10 text-xs hover:text-purple-500" onClick={() => signOut({callbackUrl: "/login" })}>LOG OUT</h4>

                <h4 className="text-xs pr-2 hover:text-purple-500">{session?.user.name}</h4>
                <img className="rounded-full w-8 h-8 hover:opacity-80" src={session?.user.image} alt="" />
            </div>
        </div>
    )
}

export default Topbar;