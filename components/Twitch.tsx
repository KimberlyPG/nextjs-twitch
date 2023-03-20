import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import StreamCard from "./StreamCard";
import StreamCardContainer from "./StreamCardContainer";
import TopGames from "./TopGames";

import twitch from "../pages/api/twitch"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFollowedData, cleanState } from "../store/slices/followedLive/followedLiveSlice";
import { addList } from "../store/slices/recommended/recommendedSlice";
import { useStreamsFilter } from "../hooks/useStreamsFilter";
import { LiveStreamsData, TopGameData } from "../types/types";
import { selectStreamer } from "../store/slices/streamer/streamerSlice";

const Twitch = () => {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    
    const userId = session?.user?.id;
    const currentToken = session?.user?.token;
    
    const [streams, setStreams] = useState<LiveStreamsData[]>([]);
    const [followedStreams, setFollowedStreams] = useState<LiveStreamsData[]>([]);
    const [topGames, setTopGames] = useState<TopGameData[]>([]);

    const followsStreamers = useAppSelector(selectStreamer)
    const streamsFiltered: LiveStreamsData[] = useStreamsFilter(followsStreamers, streams)!;

    useEffect(() => {
        const getStreams = async () => {
            if(currentToken) {
                await twitch.get(`/streams?first=12`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then((data) => {
                    dispatch(addList(data.data.data));
                    setStreams(data.data.data);
                })
            }
        }
        getStreams();
    }, [currentToken, dispatch]);

    useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                await twitch.get(`/streams/followed?user_id=${userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then((data) => {
                    dispatch(cleanState({}));
                    dispatch(addFollowedData(data.data.data))
                    setFollowedStreams(data.data.data)            
                })
            }
        }
        getFollowed();
    }, [currentToken, dispatch, userId])
 
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
                {followedStreams.length > 0 &&
                    <StreamCardContainer description="Followed Live Channels">
                        {followedStreams.slice(0, 5).map((streamer) => (                
                            <StreamCard key={streamer.id} streamer={streamer} type='followed'/>
                        ))}
                    </StreamCardContainer> 
                }
                <StreamCardContainer description="Recommended Channels">
                    {streamsFiltered &&  streamsFiltered.slice(0, 5).map((streamer) => (
                        <StreamCard key={streamer.id} streamer={streamer} type='recommended'/>
                    ))}
                </StreamCardContainer>
                <TopGames topGames={topGames}/>
            </div>
        </div>
    )
} 

export default Twitch;
