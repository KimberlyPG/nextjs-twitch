import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import { BsTwitch, BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";

import SearchBar from "./SearchBar";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectToggle, createToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { useState } from "react";

const Topbar = () => { 
    const router = useRouter();
    const { data: session, status } = useSession();
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
            <SearchBar openSearchBar={openSearchBar} clickSearch={clickSearch} hideSearchBar={hideSearchBar} />       
            <div className={`flex flex-row justify-end items-center text-white sm:w-1/3 ${clickSearch && 'xs:hidden sm:flex'}`}>
                <RiLogoutCircleRLine 
                    className="cursor-pointer mr-10 text-white sm:text-2xl sm:flex xs:hidden hover:text-purple-500"
                    onClick={() => signOut({callbackUrl: "/login" })}
                />
                <Link 
                    href={{
                        pathname: `/profile/${session?.user.id}`, 
                        query:{state:(false)}, 
                    }} 
                >
                    <div className="flex items-center hover:opacity-80 cursor-pointer">
                        <h4 className="text-xs pr-2 hover:text-purple-500 xs:hidden lg:flex">{session?.user.name}</h4>
                        {session && 
                            <Image 
                                className="rounded-full md:w-8 md:h-8 xs:h-6 xs:w-6" 
                                src={session.user.image} 
                                alt={`${session.user.name} image`}
                                width={100}
                                height={100}
                                priority={true}
                            />
                        }
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Topbar;
