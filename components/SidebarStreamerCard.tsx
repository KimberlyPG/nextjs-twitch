import { FC } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";

import UserImage from "./UserImage";

import { viewersFormat } from "../utils/viewersFormat";

type SidebarStreamerCardProps = {
    id: string;
    image: string;
    display_name: string;
    game_name: string;
    viewer_count: number;
}

const SidebarStreamerCard: FC<SidebarStreamerCardProps> = ({ id, image, display_name, game_name, viewer_count }) => {
    return (
        <>
        {game_name ? (
            <Link href={`/stream/${display_name}`}>
                <div className="flex flex-row text-white w-full py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage imageUrl={image} user={display_name} extraStyle={"h-8"} />
                    <span>
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{display_name}</h4>
                        <h4 className="w-28 pl-5 text-xs text-gray-300 truncate">{game_name}</h4>
                    </span>
                    <div className="flex right-0">
                        <RiRadioButtonLine className="text-red-500 text-xs" />
                        <h4 className="text-xs pl-1">{viewersFormat(viewer_count)}</h4>  
                    </div>
                </div>
            </Link>
            ):(
            <Link 
                href={{
                    pathname: `/profile/${display_name}`, 
                    query:{id:(id), image:(image), state:(false)}
                }}
                as={`/profile/${display_name}`}
            >
                <div className="flex flex-row text-white w-full py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage imageUrl={image} user={display_name} extraStyle={"h-8 grayscale"} />
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