import { useSession, signOut } from "next-auth/react";
import { BsTwitch, BsSearch } from "react-icons/bs";

const Topbar = ({ handleChange, handleSubmit}) => { 
    const { data: session, status } = useSession()
    
    return (
        <div className="flex flex-row justify-between pt-2 pb-1 items-center pl-5 pr-5">
            <BsTwitch className="text-purple-800 text-2xl justify-start cursor-pointer hover:opacity-80"/>
            <div className="flex justify-center text-white">
                <form onSubmit={handleSubmit}>
                    <input 
                        className="bg-gray-300 rounded w-80 text-black"
                        type="search"
                        onChange={handleChange} 
                    />
                    <button type="submit">
                        <BsSearch className="text-l ml-2 align-middle cursor-pointer hover:opacity-80"/>
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