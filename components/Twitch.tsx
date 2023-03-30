import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from 'swr';

import StreamCardsContainer from "./StreamCardsContainer";
import TopGames from "./TopGames";

import twitch from "../pages/api/twitch"
import { LiveStreamsData, TopGameData, Follow } from "../types/types";

const Twitch = () => {
    const { data: session, status } = useSession();

    const currentToken = session?.user?.token;
    const userId = session?.user.id;
    
    const [topGames, setTopGames] = useState<TopGameData[]>([]);

    const { data: follows, error: followsError } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError } = useSWR<LiveStreamsData[], Error>(`/streams/followed?user_id=${userId}`);
	const { data: recommendationsList, error: recommendationsListError } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);

    const streamsRecommended = recommendationsList?.filter(item => !follows?.some(id => id.to_id === item.user_id))!

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

    if (!follows || !followedLive || !recommendationsList) return <div>Loading...</div>
    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">        
                {followedLive && followedLive.length > 0 && 
                    <StreamCardsContainer 
                        description="Followed Live Channels"
                        streamerData={followedLive}
                        type='followed'
                    />
                }
                {recommendationsList && recommendationsList.length > 0 && 
                <StreamCardsContainer 
                    description="Recommended Channels"
                    streamerData={streamsRecommended}
                    type='recommended'
                />
                }
                <TopGames topGames={topGames}/>
            </div>
        </div>
    );
} 

export default Twitch;
