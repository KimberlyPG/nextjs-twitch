import { useSession } from "next-auth/react";
import { FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from 'next/router'
import { BsSearch } from "react-icons/bs";

import twitch from "../pages/api/twitch";
import { useAppDispatch } from "../store/hooks";
import { addSearchData, cleanState } from "../store/slices/searchSlice/searchSlice";
import { SearchChannels } from "../types/types";

const SearchBar = () => {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch(); 
    const router = useRouter();
    const [name, setName] = useState<string>("");
    
    const currentToken = session?.user.token;

    const navigateSearch = () => router.push(`/search/${name}`);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(cleanState([]));
        await twitch.get(`/search/channels?query=${name}&first=8`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                }
            })
            .then((data) => {
                data.data.data.map((results: SearchChannels[]) => {
                    dispatch(addSearchData(results)); 
                })
            }); 
        navigateSearch();
    }
           
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }
    
    return (
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
    )
}

export default SearchBar;