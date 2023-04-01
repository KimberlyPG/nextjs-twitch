import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from 'swr';
import { MdSearchOff } from 'react-icons/md';

import SearchList from "../../components/SearchList";

import { SearchChannels } from "../../types/types";

const Search: NextPage = () => {
    const router = useRouter();
    const userName = router?.query?.name;

    const { data: results, error: followsError } = useSWR<SearchChannels[]>(`/search/channels?query=${userName}&first=8`);

    if(followsError) return <div>Something went wrong</div>
    if(!results) return <div>Loading...</div>
    return (
        <>
            {results.length > 0 ? (    
                <div className="pt-10 font-roboto">
                    {results.map((streams: SearchChannels) => (
                        <SearchList key={streams.id} streams={streams}/>
                    ))}
                </div>
            ):(
                <div className="flex flex-col h-full w-full items-center justify-center pb-20 px-5">
                    <MdSearchOff className="text-purple-500 md:text-8xl xs:text-6xl" />
                    <p className="text-center md:text-2xl xs:text-sm font-bold">
                        No results found for <span className="text-orange-500">{userName}</span>
                    </p>
                    <p className="text-center md:text-xl xs:text-xs font-semibold">
                        Make sure all words are spelled correctly or try different keywords
                    </p>
                </div>
            )}
        </>
    );
};

export default Search;
