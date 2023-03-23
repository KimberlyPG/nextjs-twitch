import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import StreamCardContainer from "./StreamCardContainer";
import StreamCard from "./StreamCard";
import TopGames from "./TopGames";

import twitch from "../pages/api/twitch"
import { LiveStreamsData, TopGameData } from "../types/types";
import { useStreamsFilter } from "../hooks/useStreamsFilter";
import { useAppSelector } from "../store/hooks";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectFollowed } from "../store/slices/followed/followedSlice";

const Twitch = () => {
    const { data: session, status } = useSession();

    const currentToken = session?.user?.token;
    
    const [topGames, setTopGames] = useState<TopGameData[]>([]);

    const recommendedStreams = useAppSelector(selectRecommended);
    const followedStreamersLive = useAppSelector(selectFollowedLive);
    const followed = useAppSelector(selectFollowed)

    const streamsFiltered: LiveStreamsData[] = useStreamsFilter(followed, recommendedStreams)!;

    useEffect(() => {
        if(currentToken) {
            const getGames = async () => {
                    await twitch.get(`/games/top?first=9`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                        }
                    })
                    .then((data) => setTopGames(data.data.data));
                }
            getGames();
        }
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
