import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";

import Layout from '../components/Layout';
import StreamImage from "../components/Stream-image";

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
                const information = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=15`,
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

    }, [currentToken, gameId]);
    console.log("channels", channel);

    return (
        <Layout>
            <div className="text-white font-roboto p-5">
                <div className="p-10">
                    <span className="flex items-center">
                        <img
                            className="lg:h-56 md:h-44 xs:h-36 bg-purple-500 shadow-lg shadow-purple-500/50" 
                            src={gameUrl.slice(0, -21)+".jpg"} alt="" 
                            />
                        <h2 className="lg:text-4xl md:text-2xl sm:text-xl pl-5">{gameName}</h2>                        
                    </span>
                </div>

                <h3 className="text-sm my-5 font-semibold">Live channels we think you will like</h3>
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 space-x-3">
                    {channel && channel.map((streamer) => (
                        <div className="pb-7">
                                <div className="relative">
                                    <h4 key={streamer.id} className="m-1 bg-red-500 w-10 h-4 text-xs rounded-md text-center absolute">LIVE</h4>
                                    <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name) }}}>
                                        <StreamImage key={streamer.id} thumbnail_url={streamer.thumbnail_url}/>
                                    </Link>
                                </div>
                                <Link href={{pathname: '/profile', query:{name: (streamer.user_name), id:(streamer.user_id), state:(true)}}}>
                                    <div className="cursor-pointer text-xs">
                                        <h3 key={streamer.id} className="pt-2 font-bold w-80 truncate">{streamer.title}</h3>
                                        <h4 key={streamer.id} className="text-gray-400">{streamer.user_name}</h4>
                                    </div>
                                </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Game;