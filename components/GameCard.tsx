import { FC } from "react";
import Link from "next/link";

import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";

import { LiveStreamsData } from "../types/types";

type GameCardProps = {
    streamer: LiveStreamsData;
}

const GameCards: FC<GameCardProps> = ({ streamer }) => {

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
                        user_id={streamer.user_id} 
                        title={streamer.title} 
                        user_name={streamer.user_name} 
                        game_name={null}
                    />
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
