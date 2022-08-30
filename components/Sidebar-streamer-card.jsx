import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";

import { viewersformat } from "../utils/viewers-format";

const SidebarStreamerCard = ({ id, image, display_name, game_name, viewer_count }) => {

    return (
        <>
        {game_name ? (
            <Link href={{pathname: '/stream', query:{streamer: (display_name), id: (id)}}}>
                <div className="flex flex-row text-white w-full py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <img 
                        className="rounded-full h-8" 
                        src={image} 
                        alt="" 
                    />
                    <span>
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{display_name}</h4>
                        <h4 className="w-28 pl-5 text-xs text-gray-300 truncate">{game_name}</h4>
                    </span>
                    <div className="flex right-0">
                        <RiRadioButtonLine className="text-red-500 text-xs" />
                        <h4 className="text-xs pl-1">{viewersformat(viewer_count)}</h4>  
                    </div>
                </div>
            </Link>
            ):(
            <Link href={{pathname: '/profile', query:{name: (display_name), id:(id), state:(false)}}}>
                <div className="flex flex-row text-white w-full py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <img 
                        className="grayscale rounded-full h-8" 
                        src={image} 
                        alt="" 
                    />
                    <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{display_name}</h4>
                    <h3 className="right-0 text-xs">offline</h3>
                </div>
            </Link>
            ) 
            }
        </>
    )
}

export default SidebarStreamerCard;