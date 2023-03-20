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