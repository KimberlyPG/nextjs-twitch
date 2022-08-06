import { useAppSelector } from "../store/hooks";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";

const StreamerLive = ({ data }) => {
    const liveData = useAppSelector(selectFollowedLive);

    console.log("liveData", liveData);
    return (

        <div className="flex flex-row pb-3">
            <img className="rounded-full h-10" src={data.profile_image_url} alt="" />
            <h4 className="pb-5 hover:text-purple-400 cursor-pointer pl-2">{data.display_name}</h4>
        </div>

    )
}

export default StreamerLive;