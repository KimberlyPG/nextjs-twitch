import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import SearchList from "./Search-list";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFollowedData, cleanState } from "../store/slices/followedLive/followedLiveSlice";
import { selectSearch } from "../store/slices/searchSlice/searchSlice";

const Principal = () => {
    const { data: session, status } = useSession();

    const [data, setData] = useState([]);
    const [gamesTop, setGamesTop] = useState([]);
    const [followed, setFollowed] = useState([]);

    const userId = session?.user.id;
    const currentToken = session?.user.token;

    const dispatch = useAppDispatch();

    const results = useAppSelector(selectSearch);

    useEffect(() => {
            const getStreams = async () => {
                if(currentToken) {
                    const information = await fetch(`https://api.twitch.tv/helix/streams?first=4`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        }
                    }
                    ).then(res => res.json());
    
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
                const information = await fetch(`https://api.twitch.tv/helix/games/top?first=6`,
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
        <div className="flex">
            <div className="text-white h-screen overflow-y-scroll scrollbar-hide">
                    <div className="flex flex-col pt-10">
                        {results?.map((streams) => (
                            <SearchList key={streams.id} streams={streams}/>
                        ))}
                    </div>
                
                <div className="pt-2">
                    <h1 className="pl-8 pb-5">Followed Live Channels</h1> 
                    <div className="grid grid-cols-4 grid-flow-row place-items-center">
                        {followed?.map((streamer) => (
                            <div className="cursor-pointer text-xs text-slate-400">
                                <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name) }}}>
                                    <div>
                                        <img 
                                            className="w-80 hover:w-96 ease-in duration-200 hover:opacity-80" 
                                            src={streamer.thumbnail_url.slice(0, -21)+".jpg"} 
                                        />
                                        <h4 className="text-white text-sm hover:text-purple-400">{streamer.user_name}</h4>
                                        <h4>{streamer.game_name}</h4>
                                    </div>
                                </Link>
                                <div className="flex flex-inline items-center">
                                    <RiRadioButtonLine className="text-red-500"/>
                                    <h4 className="ml-2">{streamer.viewer_count}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10">
                    <h1 className="pl-8 pb-5">Recommended Channels</h1> 
                    <div className="grid grid-cols-4 grid-flow-row place-items-center">
                        {data &&  data?.map((streams) => (
                            <Link href={{pathname: '/stream', query:{streamer: (streams.user_name) }}}>
                                <div className="cursor-pointer text-xs text-slate-400">
                                    <img className="w-80 hover:w-96 ease-in duration-200 hover:opacity-80" src={streams.thumbnail_url.slice(0, -21)+".jpg"} alt="" />
                                    <h4 className="w-80 truncate text-white text-sm">{streams.title}</h4>
                                    <h4>{streams.user_name}</h4>
                                    <h4>{streams.game_name}</h4>
                                </div>
                            </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="pt-10">
                    <h1 className="pl-8 pb-5">Top Games</h1> 
                    <div className="grid grid-cols-6 grid-flow-row place-items-center">
                        {gamesTop &&  gamesTop?.map((games) => (
                            <div className="cursor-pointer place-items-center pl-20">
                                <img className="w-52 hover:w-56 ease-in duration-200 hover:opacity-80" src={games.box_art_url.slice(0, -21)+".jpg"} alt="" />
                                <h4 className="w-80 truncate text-white text-sm">{games.name}</h4>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Principal;