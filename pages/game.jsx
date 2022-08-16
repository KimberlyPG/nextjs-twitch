import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Layout from '../components/Layout';

const Game = () => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const gameId = router.query.game;

    const [channel, setChannel] = useState([]);
 
    useEffect(() => {
        const getChannels = async () => {
                const information = await fetch(`https://api.twitch.tv/helix/streams?game_id=${gameId}&first=16`,
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
    console.log("channel", channel);


    return (
        <Layout>
            <div className="grid grid-cols-4 grid-flow-row place-items-center text-white">
                {channel && channel.map((streamer) => (
                    <div>
                        <img
                            className="w-80" 
                            src={streamer.thumbnail_url.slice(0, -21)+".jpg"} alt="" />
                        <span>{streamer.user_name}</span>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Game;