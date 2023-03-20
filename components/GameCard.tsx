import { useSession } from "next-auth/react";
import { useState, useEffect, FC } from "react";
import Link from "next/link";

import twitch from "../pages/api/twitch";
import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";

import { LiveStreamsData, UserData } from "../types/types";
import { initialUserDataValues } from "../initialValues/intialDataValues";
import { addUserData } from "../store/slices/userData/userDataSlice";
import { useAppDispatch } from "../store/hooks";

type GameCardProps = {
    streamer: LiveStreamsData;
}
const GameCards: FC<GameCardProps> = ({ streamer }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const dispatch = useAppDispatch(); 

    const [userData, setUserData] = useState<UserData>(initialUserDataValues);

    useEffect(() => {
        const getStreamerInfo = async() => {
            await twitch.get(`/users?id=${streamer.user_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
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
            <Link href={{pathname: `/profile/${streamer.user_id}`, query: {state:(true)}}}>
                <div className="cursor-pointer">
                    <StreamDescription 
                        user_id={streamer.id} 
                        title={streamer.title} 
                        user_name={streamer.user_name} 
                        game_name={null}
                        profile_image={userData.profile_image_url} 
                        type='other' 
                    />
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
