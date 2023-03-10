import Link from "next/link";

import StreamImage from "./StreamImage";
import  StreamDescription from "./StreamDescription";

const StreamCard = ({ streamer, type }) => {
    const { user_id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={`/stream/${user_name}`}>
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