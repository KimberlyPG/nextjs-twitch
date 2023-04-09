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
            return `/streams?&first=1&after=${previousPageData.pagination.cursor}`
		} 
	}

    const { data: recommendationsList, size, setSize, isLoading: recommendationsListIsLoading } = useSWRInfinite(getKey , fetcher, {refreshInterval: 20000});
    const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}&first=10`: null);
    const { data: topGames, error: topGamesError, isLoading: topGamesIsLoading } = useSWR<TopGameData[], Error>(`/games/top?first=9`);

    const changeSize = () => {
        setSize(size + 1);
    }

    const previousPage = () => {
        setSize(size - 1);
    }
    console.log(recommendationsList)
    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading || topGamesIsLoading || !topGames) return <TwitchSkeleton />
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive &&
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        streamerData={followedLive}
                        changeSize={changeSize}
                        previousPage={previousPage}
                    />
                }
                {recommendationsList &&
                    <StreamCardsContainer 
                        description="Recommended Channels"
                        streamerData={recommendationsList}
                        changeSize={changeSize}
                        previousPage={previousPage}
                    />
                }
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
