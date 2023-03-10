import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import StreamCard from "./StreamCard";
import StreamCardContainer from "../components/StreamCardContainer";
import TopGames from "./TopGames";

import twitch from "../pages/api/twitch"
import { useAppDispatch } from "../store/hooks";
import { addFollowedData, cleanState } from "../store/slices/followedLive/followedLiveSlice";
import { addList } from "../store/slices/recommended/recommendedSlice";

const Twitch = () => {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    
    const userId = session?.user.id;
    const currentToken = session?.user.token;

    const [data, setData] = useState([]);
    const [followed, setFollowed] = useState([]);
    const [topGames, setTopGames] = useState([]);
   
 
    useEffect(() => {
        const getStreams = async () => {
            if(currentToken) {
                await twitch.get(`/streams?first=12`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                })
                .then((data) => {
                    dispatch(addList(data.data.data));
                    setData(data.data.data);
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
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                })
                .then((data) => {
                    dispatch(cleanState({}));
                    dispatch(addFollowedData(data.data.data))
                    setFollowed(data.data.data)            
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
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                })
                .then((data) => setTopGames(data.data.data));
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
                    <StreamCardContainer description="Followed Live Channels">
                        {followed?.slice(0, 5).map((streamer) => (                
                            <StreamCard key={streamer.id} streamer={streamer} type='followed'/>
                        ))}
                    </StreamCardContainer> 
                }
                <StreamCardContainer description="Recommended Channels">
                    {data &&  data?.filter((item) => filtered(item.user_id) !== true).slice(0, 5).map((streamer) => (
                        <StreamCard key={streamer.id} streamer={streamer} type='recommended'/>
                    ))}
                </StreamCardContainer>
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
