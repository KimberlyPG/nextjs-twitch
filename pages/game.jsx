import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from '../components/Layout';
import { useAppSelector } from "../store/hooks";

import { selectRecommended } from "../store/slices/recommended/recommendedSlice";

const Game = () => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const gameId = router.query.id;
    const gameName = router.query.name;
    const gameUrl = router.query.image;
    
    const [channel, setChannel] = useState([]);
 
    useEffect(() => {
        const getChannels = async () => {
                const information = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=12`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());

                setChannel(information.data);
            }

        getChannels();

    }, [gameId]);
    console.log("channels", channel);

    return (
        <Layout>
            <div className="text-white font-roboto">
                <div className="p-10">
                    <span className="flex items-center">
                        <img
                            className="h-56 bg-purple-500 shadow-lg shadow-purple-500/50" 
                            src={gameUrl.slice(0, -21)+".jpg"} alt="" 
                        />
                        <h2 className="text-4xl pl-5">{gameName}</h2>                        
                    </span>
                </div>

                <div className="grid grid-cols-5 grid-flow-row place-items-center pt-3">
                    {channel && channel.map((streamer) => (
                        <div className="pb-7 cursor-pointer hover:opacity-80">
                            <div className="relative">
                                <h4 className="m-1 bg-red-500 w-10 h-4 text-xs rounded-md text-center absolute">LIVE</h4>
                                <img
                                    className="w-80" 
                                    src={streamer.thumbnail_url.slice(0, -21)+".jpg"} alt="" 
                                />
                            </div>
                            <h3 className="text-xs w-80 truncate">{streamer.title}</h3>
                            <h4 className="text-xs text-gray-400">{streamer.user_name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Game;