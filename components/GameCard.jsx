import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

import twitch from "../pages/api/twitch";
import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";

const GameCards = ({ streamer }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getStreamerInfo = async() => {
            await twitch.get(`/users?id=${streamer.user_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                }
            })
            .then(res => setUserData(res.data.data[0]))
        };
        getStreamerInfo();

    }, [currentToken, streamer.user_id]);

    return (
        <div className="pb-7 relative">
            <Link href={`/stream/${streamer.user_name}`}>
                <div className="cursor-pointer">
                   <StreamImage 
                        thumbnailUrl={streamer.thumbnail_url} 
                        viewerCount={streamer.viewer_count}
                    />
                </div>
            </Link>
            <Link 
                href={{
                    pathname: `/profile/${streamer.user_name}`, 
                    query: {
                        id:(streamer.user_id), 
                        image:(userData.profile_image_url), 
                        state:(true)
                        }
                    }}
                    as={`/profile/${streamer.user_name}`}
                >
                <div className="cursor-pointer">
                    <StreamDescription 
                        user_id={streamer.id} 
                        title={streamer.title} 
                        user_name={streamer.user_name} 
                        profile_image={userData.profile_image_url} 
                        type='other' 
                    />
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
