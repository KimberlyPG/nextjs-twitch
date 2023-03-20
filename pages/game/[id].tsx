import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from '../../components/Layout';
import GameCards from "../../components/GameCard";

import twitch from "../api/twitch";
import { LiveStreamsData } from "../../types/types";

const Game: NextPage = () => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const gameId = router.query.id;
    const gameName = router.query.name;
    const gameUrl = router.query.image;
    
    const [channel, setChannel] = useState<LiveStreamsData[]>([]);
 
    useEffect(() => {
        const getChannels = async () => {
            await twitch.get(`/streams?game_id=${gameId}&first=15`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then(res => setChannel(res.data.data));
            }
        getChannels();
    }, [currentToken, gameId]);

    return (
        <Layout>
            <div className="text-white font-roboto sm:p-5">
                <header className="p-10">
                    <span className="flex items-center lg:h-56 md:h-44 xs:h-36">
                        <img
                            className="lg:h-56 md:h-44 xs:h-36 bg-purple-500 shadow-lg shadow-purple-500/50" 
                            src={gameUrl?.slice(0, -21)+".jpg"} 
                            alt={`${gameName} image`} 
                        />
                        <h2 className="lg:text-4xl md:text-2xl sm:text-xl pl-5">{gameName}</h2>                        
                    </span>
                </header>

                <h3 className="text-sm my-5 font-semibold">Live channels we think you will like</h3>
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 space-x-3">
                    {channel && channel.map((streamer) => (
                        <GameCards key={streamer.id} streamer={streamer} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Game;
