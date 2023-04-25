import { FC } from "react";
import Link from "next/link";

import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";
import { LiveStreamsData } from "../types/types";

type StreamCardProps = {
    streamer: LiveStreamsData;
    page: string;
}

const StreamCard: FC<StreamCardProps> = ({ streamer, page }) => {
    const { user_id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 h-full w-full">
            <Link href={`/stream/${user_name}`}>
                <StreamImage 
                    thumbnailUrl={thumbnail_url} 
                    viewerCount={viewer_count}
                />
            </Link>
            <StreamDescription 
                user_id={user_id} 
                title={title} 
                user_name={user_name} 
                game_name={game_name} 
                page={page}
            />
        </div>
    )
}

export default StreamCard;
