import Link from "next/link";
import { RiRadioButtonLine } from "react-icons/ri";

import StreamImage from "./Stream-image";

const StreamCard = ({ streamer }) => {
    const { id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={{pathname: '/stream', query:{streamer: (user_name) }}}>
                <div>
                    <StreamImage key={id} thumbnail_url={thumbnail_url}/>
                    <div>
                        <h4 className="w-full truncate text-white text-sm">{title}</h4>
                        <h3 className="text-white text-sm hover:text-purple-400">{user_name}</h3>
                        <h4>{game_name}</h4>
                    </div>
                    <div className="flex flex-inline items-center">
                        <RiRadioButtonLine className="text-red-500"/>
                        <h4 className="ml-2">{viewer_count}</h4>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StreamCard;