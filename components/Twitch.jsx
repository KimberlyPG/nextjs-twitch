import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import StreamCard from "./Stream-card";
import TopGames from "./TopGames";

import { useAppDispatch } from "../store/hooks";
import { addFollowedData, cleanState } from "../store/slices/followedLive/followedLiveSlice";
import { addList } from "../store/slices/recommended/recommendedSlice";

const Twitch = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const currentToken = session?.user.token;
    console.log(currentToken)


    const [data, setData] = useState([]);
    const [followed, setFollowed] = useState([]);
    const [topGames, setTopGames] = useState([]);
   
    const dispatch = useAppDispatch();
 
    useEffect(() => {
            const getStreams = async () => {
                if(currentToken) {
                    const information = await fetch(`https://api.twitch.tv/helix/streams?first=12`,
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
    }, [currentToken]);

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
    }, [currentToken])
 
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
                setTopGames(information.data);
            }
        }
        getGames();
    }, [currentToken]);

    const filtered = (id) => {
        let res = false;
        if(followed.length > 0 ){
          followed.forEach((item) => {
            if (item.user_id === id) {
              res = true;
            }
          });
        return res;
        }
    };

    return (
        <div className="flex md:p-5">
            <div className="text-white font-roboto">
           
            {followed.length > 0 &&
                <div className="pt-2">
                    <h1 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">Followed Live Channels</h1> 
                    <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 space-x-3"> 
                        {followed?.slice(0, 5).map((streamer) => (                
                            <StreamCard key={streamer.id} streamer={streamer} type='followed'/>
                        ))}
                    </div>
                </div>
                }

                <div className="sm:pt-2 xs:pt-2">
                    <h1 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">Recommended Channels</h1> 
                    <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 space-x-3">
                        {data &&  data?.filter((item) => filtered(item.user_id) !== true).slice(0, 5).map((streamer) => (
                            <StreamCard key={streamer.id} streamer={streamer} type='recommended'/>
                            ))}
                    </div>
                </div>

                <div className="sm:pt-2 xs:pt-2">
                    <h1 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">Top Games</h1> 
                    <div className="grid 3xl:grid-cols-9 2xl:grid-cols-9 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-4">
                        {topGames &&  topGames?.map((games) => (
                            <TopGames key={games.id} games={games}/>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Twitch;
