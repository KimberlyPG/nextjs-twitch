import Link from "next/link";
import { RiRadioButtonLine } from "react-icons/ri";
import UserImage from "./user-image";

import { useAppSelector } from "../store/hooks";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
const SidebarLive = ({ data }) => {
    const liveData = useAppSelector(selectFollowedLive);
    
    const findIndex = () => liveData.findIndex((streamerid) => streamerid.user_id == data.id)

    return (
        <Link href={{pathname: '/stream', query:{streamer: (data.display_name) }}}>
            <div className="flex flex-row pb-3 hover:opacity-80 cursor-pointer">
                {/* <UserImage imageUrl={data.profile_image_url} /> */}
                <img className="rounded-full h-8" src={data.profile_image_url} alt="" />
                <span>
                    <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs">{data.display_name}</h4>
                    <h4 className="w-28 pl-5 text-xs text-gray-300 truncate">{liveData[findIndex()].game_name}</h4>
                </span>
                <div>
                    <RiRadioButtonLine className="text-red-500 text-xs" />
                    <h4 className="pl-3 text-xs">{liveData[findIndex()].viewer_count}</h4>  
                </div>
            </div>
        </Link>
    )
}

export default SidebarLive;