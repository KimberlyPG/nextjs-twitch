import { useSession } from "next-auth/react";
import useSWR from 'swr';

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";
import TwitchSkeleton from "./TwitchSkeleton";

import { LiveStreamsData, TopGameData, Follow } from "../types/types";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    
    const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}`: null);
	const { data: recommendationsList, error: recommendationsListError, isLoading: recommendationsListIsLoading } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);
    const { data: topGames, error: topGamesError, isLoading: topGamesIsLoading } = useSWR<TopGameData[], Error>(`/games/top?first=9`);
    
    const recommendedStreams = recommendationsList?.filter(item => !follows?.some(id => id.to_id === item.user_id))!
    console.log(followedLive)

    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading || topGamesIsLoading || !topGames) return <TwitchSkeleton />
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive && followedLive.length > 0 &&
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        streamerData={followedLive}
                    />
                }
                {recommendationsList &&
                    <StreamCardsContainer 
                        description="Recommended Channels"
                        streamerData={recommendedStreams}
                    />
                }
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
