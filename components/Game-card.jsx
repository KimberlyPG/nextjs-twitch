import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

import StreamImage from "./Stream-image";

const GameCards = ({ streamer }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getStreamerInfo = async() => {
            const response = await fetch(`https://api.twitch.tv/helix/users?id=${streamer.user_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                }
            }
            ).then(res => res.json())
            setUserData(response.data[0]);
        };
        getStreamerInfo();

    }, [currentToken, streamer.user_id]);
    console.log("user data", userData);

    return (
        <div className="pb-7 relative">
            <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name) }}}>
                <div className="cursor-pointer">
                   <StreamImage key={streamer.id} thumbnail_url={streamer.thumbnail_url} viewer_count={streamer.viewer_count}/>
                </div>
            </Link>
            <Link href={{pathname: '/profile', query:{name: (streamer.user_name), id:(streamer.user_id), state:(true)}}}>
                <div className="cursor-pointer text-xs flex">
                    <img 
                        className="rounded-full h-10 m-2 flex flex-col"
                        src={userData.profile_image_url} 
                        alt={` ${streamer.user_name} image`} 
                    />
                    <div className="w-full truncate">
                        <h3 key={streamer.id} className="pt-2 font-bold w-full truncate">{streamer.title}</h3>
                        <h4 key={streamer.id} className="text-gray-400">{streamer.user_name}</h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
