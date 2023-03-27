import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import Link from "next/link";

import UserImage from "./UserImage";

import twitch from "../pages/api/twitch";
import { useAppDispatch } from "../store/hooks";
import { addStreamerData } from "../store/slices/streamer/streamerSlice";
import { addData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";
import { UserData } from "../types/types";
import { initialUserDataValues } from "../initialValues/intialDataValues";
import { viewersFormat } from "../utils/viewersFormat";

type SidebarStreamerCardProps = {
    id: string;
    category: string;
    game_name: string | null;
    viewer_count: number | null;
}

const SidebarStreamerCard: FC<SidebarStreamerCardProps> = ({ id, category, game_name, viewer_count }) => {
    const { data: session, status } = useSession();
	const dispatch = useAppDispatch();

	const currentToken = session?.user.token;

    const [streamerData, setStreamerData] = useState<UserData>(initialUserDataValues);

    //information about followed and recommended streamers
    useEffect(() => {
        const getFollowedInfo = async () => {
            await twitch.get(`/users?id=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                },
            })
            .then((res) => {
                setStreamerData(res.data.data[0])
                if(category === "followed") {
                    dispatch(addStreamerData(res.data.data[0]))
                } else if (category === "recommended") {
                    dispatch(addData(res.data.data[0]))
                }
            })
        }
        getFollowedInfo();
    }, [id, currentToken, category, dispatch])

    return (
        <>
        {game_name ? (
            <Link href={`/stream/${streamerData.display_name}`}>
                <div className="flex flex-row relative text-white py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage 
                        imageUrl={streamerData.profile_image_url} 
                        user={streamerData.display_name} 
                        extraStyle={"h-8 w-8"} 
                    />
                    <div>
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold xs:hidden lg:flex">{streamerData.display_name}</h4>
                        {game_name && <h4 className="w-28 pl-5 text-xs text-gray-300 truncate xs:hidden lg:flex">{game_name}</h4>}
                    </div>
                    <div className="flex right-0 xs:hidden lg:flex">
                        <RiRadioButtonLine className="text-red-500 text-xs" />
                        {viewer_count && <h4 className="text-xs pl-1">{viewersFormat(viewer_count)}</h4>}
                    </div>
                </div>
            </Link>
            ):(
            <Link href={{pathname: `/profile/${id}`, query: {state:(false)}}}>
                <div className="flex flex-row relative text-white py-2 pl-4 pr-2 hover:bg-slate-900 hover:opacity-70 cursor-pointer">
                    <UserImage 
                        imageUrl={streamerData.profile_image_url} 
                        user={streamerData.display_name} 
                        extraStyle={"h-8 w-8 grayscale"} 
                    />
                    <div className="flex xs:hidden lg:flex">
                        <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{streamerData.display_name}</h4>
                        <h3 className="right-0 text-xs">offline</h3>
                    </div>
                </div>
            </Link>
            ) 
        }
        </>
    )
}

export default SidebarStreamerCard;