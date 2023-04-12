import { useSession } from "next-auth/react";
import useSWR from 'swr';
import useSWRInfinite from "swr/infinite";

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";
import TwitchSkeleton from "./TwitchSkeleton";

import { LiveStreamsData, TopGameData, Follow, StreamersData } from "../types/types";
import usePaginationFetcher from "../hooks/usePaginationFetcher";
import useFilterRecommendations from "../hooks/useFilterRecommendations";
import { useContext } from "react";
import { FilterContext } from "../context/filter.context";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const fetcher = usePaginationFetcher();
    const { first, second } = useContext(FilterContext);
    
    const getKey = (pageIndex: number, previousPageData: StreamersData) => {
        if(pageIndex == 0) {
            return `/streams?&first=${first}`
        }
        if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams?&first=${second}&after=${previousPageData.pagination.cursor}`
        } 
    }

    const getFollowedLiveKey = (pageIndex: number, previousPageData: StreamersData) => {
        if(pageIndex == 0) {
            return `/streams/followed?user_id=${userId}&first=15`
        }
        if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams/followed?user_id=${userId}&first=10&after=${previousPageData.pagination.cursor}`
        } 
    }

    const { data: recommendationsList, size, setSize, isLoading: recommendationsListIsLoading } = useSWRInfinite(getKey , fetcher, {refreshInterval: 20000});
    const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
    // const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}&first=10`: null);
    const { data: followedLive, size: flSize, setSize: flSetSize, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWRInfinite(getFollowedLiveKey, fetcher, {refreshInterval: 20000});
    const { data: topGames, error: topGamesError, isLoading: topGamesIsLoading } = useSWR<TopGameData[], Error>(`/games/top?first=9`);
    
    const followedLiveArray: Array<LiveStreamsData[]> = [];
    followedLive?.forEach((element) => {
        if(follows){
            followedLiveArray.push(element.data)
        }
    })     

    const recommended = useFilterRecommendations(recommendationsList, followedLiveArray, size)

    const changeSize = () => {
        if(size === 2) {
            setSize(size - 1);
        } 
        if(size === 1) {
            setSize(size + 1);
        }
    }

    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading || topGamesIsLoading || !topGames) return <TwitchSkeleton />
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive && followedLive.length > 0 &&
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        streamerData={followedLiveArray}
                    />
                }
                {recommendationsList &&
                    <StreamCardsContainer 
                        description="Recommended Channels"
                        streamerData={recommended}
                    />
                }
                <button className="text-sm text-purple-500 text-center w-full" onClick={() => changeSize()}>
                    {size === 1 ? "Show more": recommended[1]?.length !==5 ? "Loading..." : "Show less"}
                </button>
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
