import { FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from 'next/router'
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/search/${name}`);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const handleClick = () => {
        router.push(`/search/${name}`);
    }

    return (
        <div className="flex flex-row justify-center items-center text-white">
            <form onSubmit={handleSubmit}>
                <input 
                    className="bg-gray-300 rounded lg:w-80 text-black pl-3 sm:w-60 xs:w-24 xs:text-xs sm:text-sm"
                    type="search"
                    placeholder="Search streamers..."
                    onChange={handleChange} 
                />
            </form>   
            <BsSearch 
                onClick={() => handleClick()}
                className="sx:text-sm sm:text-md ml-2 align-middle cursor-pointer hover:opacity-80"
            />
        </div>
    )
}

export default SearchBar;