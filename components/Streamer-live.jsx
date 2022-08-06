import { useAppSelector } from "../store/hooks";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";

const StreamerLive = ({ data }) => {
    const liveData = useAppSelector(selectFollowedLive);

    console.log("liveData", liveData);
    return (

        <div>
            <h4 className="pb-5 hover:text-purple-400 cursor-pointer">{data.display_name}</h4>
            <img src={data.profile_image_url} alt="" />
        </div>

    )
}

export default StreamerLive;