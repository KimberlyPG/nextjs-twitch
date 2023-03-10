import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { BsTwitch, BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";

import SearchBar from "./SearchBar";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectToggle, createToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";

const Topbar = () => { 
    const router = useRouter();
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch(); 

    const toggleSidebar = useAppSelector(selectToggle);
    const toggleButton = () => dispatch(createToggle(!toggleSidebar));

    const navigateHome = () => router.push('/');

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
            <SearchBar />       
            <div className="flex flex-row justify-end text-white items-center">
                <RiLogoutCircleRLine 
                    className="cursor-pointer mr-10 text-white sm:text-2xl sm:flex xs:hidden hover:text-purple-500"
                    onClick={() => signOut({callbackUrl: "/login" })}
                />
                <Link 
                    href={{
                        pathname: '/profile', 
                        query:{name: (session?.user.name), id: (session?.user.id), image: (session?.user.image), state:(false)}, 
                    }} 
                    as={`/profile/${session?.user.name}`}
                >
                    <div className="flex items-center hover:opacity-80 cursor-pointer">
                        <h4 className="text-xs pr-2 hover:text-purple-500 xs:hidden lg:flex">{session?.user.name}</h4>
                        <img 
                            className="rounded-full md:w-8 md:h-8 xs:h-6 xs:w-6" 
                            src={session?.user.image} 
                            alt={`${session?.user.name} image`}
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Topbar;
