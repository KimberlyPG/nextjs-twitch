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
        <div className={`flex justify-center items-center text-white  ${clickSearch && "xs:w-full"}`}>   
            <BiArrowBack 
                className={`text-2xl mr-3 text-gray-400 sm:hidden ${clickSearch ? "flex":"hidden"}`} 
                onClick={hideSearchBar} 
            />
            <div 
                className={`flex items-center sm:bg-gray-800 rounded-l-full lg:w-80 sm:w-60 
                    ${clickSearch && "xs:w-full xs:bg-gray-800"}`}
            >
                <BsSearch 
                    onClick={openSearchBar}
                    className="m-2 sx:text-sm sm:text-md sm:ml-2 align-middle cursor-pointer hover:opacity-80 sm:hidden"
                />
                <form onSubmit={handleSubmit} className={`flex my-2 sm:w-full ${clickSearch && "xs:w-full"}`}>
                    <input 
                        className={`w-full ml-2 pl-2 bg-gray-800 text-gray-100 sm:text-md xs:text-sm outline-0 
                            ${clickSearch ? "xs:w-full": "xs:hidden sm:flex"}`}
                        type="search"
                        placeholder="Search streamers..."
                        onChange={handleChange} 
                    />
                </form>   
            </div>
            <div 
                className={`h-full rounded-r-full align-middle cursor-pointer hover:opacity-80 bg-gray-900 
                    ${clickSearch ? "flex":"xs:hidden sm:flex"}`}
            >
                <BsSearch 
                    onClick={() => handleClick()}
                    className="text-lg h-full mx-3 m-2"
                />
            </div>
        </div>
    )
}

export default SearchBar;