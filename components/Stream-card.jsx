import Link from "next/link";

import StreamImage from "./Stream-image";

import { viewersformat } from "../lib/viewers-format";

const StreamCard = ({ streamer }) => {
    const { id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={{pathname: '/stream', query:{streamer: (user_name) }}}>
                <div>
                        <StreamImage key={id} thumbnail_url={thumbnail_url} viewer_count={viewersformat(viewer_count)}/>
                    <div>
                        <h4 className="w-full truncate text-white sm:text-sm xs:text-xs">{title}</h4>
                        <h3 className="text-white sm:text-sm xs:text-xs hover:text-purple-400">{user_name}</h3>
                        <h4>{game_name}</h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StreamCard;