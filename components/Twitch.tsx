import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import StreamCardContainer from "./StreamCardContainer";
import StreamCard from "./StreamCard";
import TopGames from "./TopGames";

import twitch from "../pages/api/twitch"
import { LiveStreamsData, TopGameData, UserData } from "../types/types";
import { useStreamsFilter } from "../hooks/useStreamsFilter";
import { useAppSelector } from "../store/hooks";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";
import { selectStreamer } from "../store/slices/streamer/streamerSlice";

import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";

const Twitch = () => {
    const { data: session, status } = useSession();

    const currentToken = session?.user?.token;
    
    const [topGames, setTopGames] = useState<TopGameData[]>([]);

    const recommendedStreams: LiveStreamsData[] = useAppSelector(selectRecommended);
    const followedStreamersLive: LiveStreamsData[] = useAppSelector(selectFollowedLive);
    const followsStreamers: UserData[] = useAppSelector(selectStreamer)
    const streamsFiltered: LiveStreamsData[] = useStreamsFilter(followsStreamers, recommendedStreams)!;

    useEffect(() => {
        const getGames = async () => {
            if(currentToken) {
                await twitch.get(`/games/top?first=9`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then((data) => setTopGames(data.data.data));
            }
        }
        getGames();
    }, [currentToken]);

    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedStreamersLive.length > 0 &&
                    <StreamCardContainer description="Followed Live Channels">
                        {followedStreamersLive.slice(0, 5).map((streamer) => (                
                            <StreamCard key={streamer.id+streamer.user_id} streamer={streamer} type='followed'/>
                        ))}
                    </StreamCardContainer> 
                }
                <StreamCardContainer description="Recommended Channels">
                    {streamsFiltered &&  streamsFiltered.slice(0, 5).map((streamer) => (
                        <StreamCard key={streamer.id+streamer.user_id} streamer={streamer} type='recommended'/>
                    ))}
                </StreamCardContainer>
                <TopGames topGames={topGames}/>
            </div>
        </div>
    )
} 

export default Twitch;
