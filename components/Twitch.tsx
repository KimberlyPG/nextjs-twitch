import { useSession } from "next-auth/react";
import useSWR from 'swr';
import useSWRInfinite from "swr/infinite";
import { useContext, useState } from "react";

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";
import TwitchSkeleton from "./TwitchSkeleton";

import { LiveStreamsData, TopGameData, Follow, StreamersData } from "../types/types";
import usePaginationFetcher from "../hooks/usePaginationFetcher";
import { FilterContext } from "../context/filter.context";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const fetcher = usePaginationFetcher();

    const { setFirst, first, nextPage, setNextPage } = useContext(FilterContext);

    const getKey = (pageIndex: number, previousPageData: StreamersData) => {
		if(pageIndex == 0) {
			return `/streams?&first=${first}`
		}
		if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams?&first=${5}&after=${previousPageData.pagination.cursor}`
		} 
	}

    const { data: recommendationsList, size, setSize, isLoading: recommendationsListIsLoading } = useSWRInfinite(getKey , fetcher, {refreshInterval: 20000});
    const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}&first=10`: null);
    const { data: topGames, error: topGamesError, isLoading: topGamesIsLoading } = useSWR<TopGameData[], Error>(`/games/top?first=9`);

    const changeSize = () => {
        if(size === 2) {
            setSize(size - 1);
        } 
        if(size === 1) {
            setSize(size + 1);
        }
    }

    const recommended = [];
    recommendationsList?.forEach((element) => {
        recommended.push(element.data.filter((item: LiveStreamsData) => !followedLive?.some(id => id.user_id === item.user_id)))
    })    
    
    if(recommended.length > 0) {
        if(recommended[0]?.length !== 5) {     
            let sum = 5 - recommended[0]?.length;
            setFirst(first + sum);
        }
        // if(size === 2 && recommended[1]?.length !== 5 ) {
        //     let sum = 5 - recommended[1]?.length;
        //     setNextPage(nextPage + sum);
        // }
    }
    console.log(recommended)
    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading || topGamesIsLoading || !topGames) return <TwitchSkeleton />
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive &&
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        streamerData={followedLive}
                    />
                }
                {recommendationsList &&
                    <StreamCardsContainer 
                        description="Recommended Channels"
                        streamerData={recommended}
                    />
                }
                {/* <button className="text-sm text-purple-500 text-center w-full" onClick={() => changeSize()}>
                    {size === 1 ? "Show more":"Show less"}
                </button> */}
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
