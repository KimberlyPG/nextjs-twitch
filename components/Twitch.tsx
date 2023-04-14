import { useSession } from "next-auth/react";
import useSWR from 'swr';
import useSWRInfinite from "swr/infinite";

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";
import TwitchSkeleton from "./TwitchSkeleton";

import { LiveStreamsData, TopGameData, Follow, StreamersData } from "../types/types";
import usePaginationFetcher from "../hooks/usePaginationFetcher";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const fetcher = usePaginationFetcher();
    
    const getKey = (pageIndex: number, previousPageData: StreamersData) => {
        if(pageIndex == 0) {
            return `/streams?&first=5`
        }
        if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams?&first=5&after=${previousPageData.pagination.cursor}`
        } 
    }

    const changeSize = () => {
        if(size === 2) {
            setSize(size - 1);
        } 
        if(size === 1) {
            setSize(size + 1);
        }
    }
    
    const { data: recommendationsList, size, setSize, isLoading: recommendationsListIsLoading } = useSWRInfinite(getKey , fetcher, {refreshInterval: 20000});
    const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
    const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = 
    useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}&first=11`: null);  
    const { data: topGames, error: topGamesError, isLoading: topGamesIsLoading } = useSWR<TopGameData[], Error>(`/games/top?first=9`);

    
    if(followsError || followedLiveError || topGamesError) return <div>Something went wrong</div>
    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading || topGamesIsLoading || !topGames) return <TwitchSkeleton />
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive && followedLive.length > 0 &&
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        followedData={followedLive}
                    />
                }
                <button className={`text-sm text-purple-500 text-center w-full ${followedLive && followedLive.length <= 10 && "hidden"}`} >
                    Show all
                </button>
                {recommendationsList &&
                    <StreamCardsContainer 
                        description="Recommended Channels"
                        recommendedData={recommendationsList}
                    />
                }
                <button className="text-sm text-purple-500 text-center w-full" onClick={() => changeSize()}>
                    {size === 1 ? "Show more": recommendationsListIsLoading ? "Loading":"Show less"}
                </button>
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
