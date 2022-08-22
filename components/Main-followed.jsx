import Link from "next/link";
import { RiRadioButtonLine } from "react-icons/ri";

const MainFollowed = ({ streamer }) => {
    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={{pathname: '/stream', query:{streamer: (streamer.user_name) }}}>
                <div>
                <h4 className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute">LIVE</h4>
                    <img 
                        className="w-full hover:mt-2 ease-in duration-200 hover:opacity-80" 
                        src={streamer.thumbnail_url.slice(0, -21)+".jpg"} 
                    />
                    <h4 className="text-white text-sm hover:text-purple-400">{streamer.user_name}</h4>
                    <h4>{streamer.game_name}</h4>
                </div>
            </Link>
            <div className="flex flex-inline items-center">
                <RiRadioButtonLine className="text-red-500"/>
                <h4 className="ml-2">{streamer.viewer_count}</h4>
            </div>
        </div>
    )
}

export default MainFollowed;