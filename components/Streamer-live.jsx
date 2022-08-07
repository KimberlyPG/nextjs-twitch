import { RiRadioButtonLine } from "react-icons/ri";
import { useAppSelector } from "../store/hooks";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";

const StreamerLive = ({ data }) => {
    const liveData = useAppSelector(selectFollowedLive);
    
    const findIndex = () => liveData.findIndex((streamerid) => streamerid.user_id == data.id)

    return (
        <div className="flex flex-row pb-3 hover:opacity-80 cursor-pointer">
            <img className="rounded-full h-8" src={data.profile_image_url} alt="" />
            <h4 className="pb-5 w-72 hover:text-purple-400 cursor-pointer pl-2 truncate text-xs">{data.display_name}</h4>
            <div className="flex flex-inline">
                <RiRadioButtonLine className="text-red-500 text-xs" />
                <h4 className="pl-3 text-xs">{liveData[findIndex()].viewer_count}</h4>  
            </div>
        </div>
    )
}

export default StreamerLive;