import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";

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

    return (
        <div className="pb-7 relative">
            <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name), id:(streamer.user_id) }}}>
                <div className="cursor-pointer">
                   <StreamImage 
                        thumbnail_url={streamer.thumbnail_url} 
                        viewer_count={streamer.viewer_count}
                    />
                </div>
            </Link>
            <Link href={{pathname: '/profile', query:{name: (streamer.user_name), id:(streamer.user_id), image:(userData.profile_image_url), state:(true)}}}>
                <div className="cursor-pointer">
                    <StreamDescription 
                        user_id={streamer.id} 
                        title={streamer.title} 
                        user_name={streamer.user_name} 
                        profile_image_url={userData.profile_image_url} 
                        type='other' 
                    />
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
