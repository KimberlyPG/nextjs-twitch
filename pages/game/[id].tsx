import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from '../../components/Layout';
import GameCards from "../../components/GameCard";

import twitch from "../api/twitch";
import { GameData, LiveStreamsData } from "../../types/types";
import { InitialGameDataValues } from "../../initialValues/intialDataValues";

const Game: NextPage = () => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const gameId = router.query.id;

    const [game, setGame] = useState<GameData>(InitialGameDataValues);
    const [channel, setChannel] = useState<LiveStreamsData[]>([]);

    useEffect(() => {
        if(gameId && currentToken) {
        const getGameData = async() => {
                await twitch.get(`/games?id=${gameId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then(res => setGame(res.data.data[0]));
            }
            getGameData();
        }
    }, [gameId, currentToken])
 
    useEffect(() => {
        if(gameId && currentToken) {
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
            }
    }, [currentToken, gameId]);

    return (
        <Layout>
            <div className="text-white font-roboto sm:p-5">
                <div className="flex relative items-center my-10 m-10">
                    <Image
                        className="bg-purple-500 shadow-lg shadow-purple-500/50 object-contain lg:h-56 md:h-44 xs:h-36 w-fit" 
                        src={game?.box_art_url?.split("-{width}x{height}").join('')} 
                        alt={`${game?.name} image`} 
                        width={168}
                        height={224}
                    />
                    <h1 className="lg:text-4xl md:text-2xl sm:text-xl ml-5 w-full">{game?.name}</h1>                        
                </div>

                <h2 className="text-sm my-5 font-semibold">Live channels we think you will like</h2>
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                    {channel && channel.map((streamer) => (
                        <GameCards key={streamer.id} streamer={streamer} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Game;
