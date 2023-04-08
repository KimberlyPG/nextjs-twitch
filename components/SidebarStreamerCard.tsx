import { FC } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";
import useSWR from 'swr';

import UserImage from "./UserImage";

import { UserData } from "../types/types";
import { viewersFormat } from "../utils/viewersFormat";

type SidebarStreamerCardProps = {
    id: string;
    game_name: string | null;
    viewer_count: number | null;
}

const SidebarStreamerCard: FC<SidebarStreamerCardProps> = ({ id, game_name, viewer_count }) => {
    const { data: streamerData, error: streamerDataError } = useSWR<UserData[], Error>(`/users?id=${id}`);

    return (
        <>
        {game_name ? (
            streamerData &&
            <Link href={`/stream/${streamerData[0].display_name}`}>
                <div className="flex flex-row w-full relative text-white py-2 ml-4 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage 
                        imageUrl={streamerData[0].profile_image_url} 
                        user={streamerData[0].display_name} 
                        extraStyle={"h-8 w-8"} 
                    />
                    <div>
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold xs:hidden lg:flex">{streamerData[0].display_name}</h4>
                        {game_name && <h4 className="w-28 pl-5 text-xs text-gray-300 truncate xs:hidden lg:flex">{game_name}</h4>}
                    </div>
                    <div className="flex right-0 xs:hidden lg:flex">
                        <RiRadioButtonLine className="text-red-500 text-xs" />
                        {viewer_count && <h4 className="text-xs pl-1">{viewersFormat(viewer_count)}</h4>}
                    </div>
                </div>
            </Link>
            ):(
            streamerData &&
            <Link href={{pathname: `/profile/${id}`, query: {state:(false)}}}>
                <div className="flex flex-row w-full relative text-white py-2 ml-4 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage 
                        imageUrl={streamerData[0].profile_image_url} 
                        user={streamerData[0].display_name} 
                        extraStyle={"h-8 w-8 grayscale"} 
                    />
                    <div className="flex xs:hidden lg:flex">
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{streamerData[0].display_name}</h4>
                        <h3 className="right-0 text-xs">offline</h3>
                    </div>
                </div>
            </Link>
            )
        } 
        </>
    );
}

export default SidebarStreamerCard;