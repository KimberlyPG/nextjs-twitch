import { useSession } from "next-auth/react";
import useSWR from 'swr';

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";
import TwitchSkeleton from "./TwitchSkeleton";

import { LiveStreamsData, TopGameData, Follow } from "../types/types";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    
    const { data: follows, error: followsError } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError } = useSWR<LiveStreamsData[], Error>(`/streams/followed?user_id=${userId}`);
	const { data: recommendationsList, error: recommendationsListError } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);
    const { data: topGames, error: topGamesError } = useSWR<TopGameData[], Error>(`/games/top?first=9`);
    
    const streamsRecommended = recommendationsList?.filter(item => !follows?.some(id => id.to_id === item.user_id))!
    console.log("follows", follows, "recommendationsList", recommendationsList, "follosLive", followedLive)

    if (!follows || !followedLive || !recommendationsList || !topGames) return <TwitchSkeleton />
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
                        streamerData={streamsRecommended}
                    />
                }
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
