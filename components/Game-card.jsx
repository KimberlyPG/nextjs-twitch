import Link from "next/link";
import StreamImage from "./Stream-image";

const GameCards = ({ streamer }) => {

    return (
        <div className="pb-7 relative">
            <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name) }}}>
                <div className="cursor-pointer">
                   <StreamImage key={streamer.id} thumbnail_url={streamer.thumbnail_url} viewer_count={streamer.viewer_count}/>
                </div>
            </Link>
            <Link href={{pathname: '/profile', query:{name: (streamer.user_name), id:(streamer.user_id), state:(true)}}}>
                <div className="cursor-pointer text-xs">
                    <h3 key={streamer.id} className="pt-2 font-bold w-80 truncate">{streamer.title}</h3>
                    <h4 key={streamer.id} className="text-gray-400">{streamer.user_name}</h4>
                </div>
            </Link>
        </div>
    )
}

export default GameCards;
