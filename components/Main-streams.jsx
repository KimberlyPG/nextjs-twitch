import Link from "next/link";

const MainStreams = ({ streams }) => {
    return (
        <div>
            <Link href={{pathname: '/stream', query:{streamer: (streams.user_name) }}}>
                <div className="cursor-pointer text-xs text-slate-400">
                    <img 
                        className="w-80 hover:w-96 ease-in duration-200 hover:opacity-80" 
                        src={streams.thumbnail_url.slice(0, -21)+".jpg"} alt="" 
                    />
                    <h4 className="w-80 truncate text-white text-sm">{streams.title}</h4>
                    <h4>{streams.user_name}</h4>
                    <h4>{streams.game_name}</h4>
                </div>
            </Link>
        </div>
    )
}

export default MainStreams;