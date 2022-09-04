import Link from "next/link";

import StreamImage from "./Stream-image";
import  StreamDescription from "./Stream-description";

const StreamCard = ({ streamer, type }) => {
    const { id, user_id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={{pathname: '/stream', query:{streamer: (user_name), id: (user_id)}}}>
                <div>
                    <StreamImage 
                        thumbnail_url={thumbnail_url} 
                        viewer_count={viewer_count}
                    />
                    <StreamDescription 
                        user_id={user_id} 
                        title={title} 
                        user_name={user_name} 
                        game_name={game_name} 
                        type={type} 
                    />
                </div>
            </Link>
        </div>
    )
}

export default StreamCard;