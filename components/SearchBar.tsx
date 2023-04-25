import { FC, FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from 'next/router'
import { BsSearch } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi"

type SearchBarProps = {
    openSearchBar: () => void,
    hideSearchBar: () => void,
    clickSearch: boolean,
}

const SearchBar: FC<SearchBarProps> = ({ openSearchBar, clickSearch, hideSearchBar}) => {
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
        <div className={`flex justify-end items-center sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-full ${clickSearch && "xs:w-full"}`}>
            <BiArrowBack 
                className={`text-2xl mr-3 text-gray-400 sm:hidden ${clickSearch ? "flex":"hidden"}`} 
                onClick={hideSearchBar} 
            />
            <form className="relative xs:w-full xs:text-xs sm:text-sm"  onSubmit={handleSubmit}>
                <input 
                    onClick={openSearchBar}
                    className={`peer cursor-pointer relative z-10 w-9 h-9 pl-8 xs:rounded-full sm:rounded-r-none sm:border border-gray-600 
                    bg-transparent outline-none focus:pr-4 focus:border-purple-400 sm:w-full sm:pl-8 sm:focus:pl-16 placeholder:italic
                    ${clickSearch && "xs:w-full xs:pl-16 xs:border"}`} 
                    type="search" 
                    onChange={handleChange}
                    value={name}
                    placeholder="Search for a show... "
                />
                <BsSearch 
                    className="absolute inset-y-0 my-auto h-8 w-12 p-2 pl-2 px-3.5 border-r border-transparent text-lg text-gray-400 align-middle 
                    cursor-pointer peer-hover:opacity-80 peer-focus:border-gray-300 sm:peer-focus:flex sm:hidden peer-focus:text-purple-400"
                />
            </form>
            <div className="cursor-pointer rounded-r-full border border-l-0 border-gray-600 align-middle hover:opacity-80 bg-gray-800 xs:hidden sm:flex">
                <BsSearch 
                    onClick={() => handleClick()}
                    className="text-lg h-full mx-3 m-2"
                />
            </div>
        </div>
    );
}

export default SearchBar;
