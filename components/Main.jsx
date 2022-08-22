import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import MainFollowed from "./Main-followed";
import MainStreams from "./Main-streams";
import MainGamesTop from "./Main-gamesTop";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFollowedData, cleanState } from "../store/slices/followedLive/followedLiveSlice";
import { addList, selectRecommended } from "../store/slices/recommended/recommendedSlice";

const Main = () => {
    const { data: session, status } = useSession();

    const [data, setData] = useState([]);
    const [gamesTop, setGamesTop] = useState([]);
    const [followed, setFollowed] = useState([]);
   
    const userId = session?.user.id;
    const currentToken = session?.user.token;

    const dispatch = useAppDispatch();

    useEffect(() => {
            const getStreams = async () => {
                if(currentToken) {
                    const information = await fetch(`https://api.twitch.tv/helix/streams?first=16`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        }
                    }
                    ).then(res => res.json());
    
                    dispatch(addList(information.data));
                    setData(information.data);
                }
                }
            getStreams();
    }, []);

    useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json())
                dispatch(cleanState({}));
                dispatch(addFollowedData(information.data))
                setFollowed(information.data)
                
            }
            }
        getFollowed();
    }, [])
 
    useEffect(() => {
        const getGames = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/games/top?first=9`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());

                setGamesTop(information.data);
            }
            }
        getGames();
    }, []);

    return (
        <div className="flex mx-2">
            <div className="text-white">

                <div className="pt-2">
                    <h1 className="pl-8 pb-5">Followed Live Channels</h1> 
                    <div className="flex flex-wrap mb-2 space-x-1">
                        {followed?.slice(0, 5).map((streamer) => (                
                            <MainFollowed key={streamer.id} streamer={streamer}/>
                        ))}
                    </div>
                </div>

                <div className="pt-10">
                    <h1 className="pl-8 pb-5">Recommended Channels</h1> 
                    <div className="flex flex-wrap mb-2 space-x-1">
                        {data &&  data?.slice(0, 5).map((streams) => (
                            <MainStreams key={streams.id} streams={streams}/>
                        ))}
                    </div>
                </div>

                <div className="pt-10">
                    <h1 className="pb-5">Top Games</h1> 
                    <div className="grid 2xl:grid-cols-6 3xl:grid-cols-9 xl:grid-cols-6">
                        {gamesTop &&  gamesTop?.map((games) => (
                            <MainGamesTop games={games}/>
                         ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
} 

export default Main;
