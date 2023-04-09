import { FC, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from 'swr';
import { useSession } from "next-auth/react";

import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";
import { LiveStreamsData } from "../types/types";

type StreamCardProps = {
    streamer: LiveStreamsData;
    changeSize: () => void;
    category: string;
}

const StreamCard: FC<StreamCardProps> = ({ streamer, changeSize, previousPage, category }) => {
    const { user_id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    const { data: session, status } = useSession();
    const userId = session?.user.id;

    //checking if the user follows the channel
    const { data: channel } = useSWR(`channels/followed?user_id=${userId}&broadcaster_id=${user_id}`);

    const getPage = () => {
        if(channel?.length > 0 && category === "recommended") {
            changeSize();
        }
    }

    useEffect(() => {
        getPage();
    }, [channel, user_name])

    if(channel?.length > 0 && category === "recommended") return null;
    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 h-full w-full">
            <Link href={`/stream/${user_name}`}>
                <div>
                    <StreamImage 
                        thumbnailUrl={thumbnail_url} 
                        viewerCount={viewer_count}
                    />
                    <StreamDescription 
                        user_id={user_id} 
                        title={title} 
                        user_name={user_name} 
                        game_name={game_name} 
                    />
                </div>
            </Link>
        </div>
    )
}

export default StreamCard;