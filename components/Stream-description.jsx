import { useSelector } from "react-redux";
import { selectStreamer } from "../store/slices/streamer/streamerSlice";
import { selectRecommendedUserData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";

const StreamDescription = ({ user_id, title, user_name, game_name, type }) => {

    const streamerData = useSelector(selectStreamer);
    const recommendedData = useSelector(selectRecommendedUserData);

    const findStreamer = streamerData.findIndex((streamerid) => streamerid.id == user_id)
    const findRecommended = recommendedData.findIndex((streamerid) => streamerid.id == user_id)

    return (
        <div className="flex">  
            {type === 'followed' ? 
                <img 
                    className="rounded-full h-10 flex flex-col m-2"
                    src={streamerData[findStreamer]?.profile_image_url} 
                    alt="" 
                />
                :
                <img 
                    className="rounded-full h-10 m-2"
                    src={recommendedData[findRecommended]?.profile_image_url} 
                    alt="" 
                />                          
            }
            <span className="w-full truncate m-2">
                <h4 className="truncate text-white sm:text-sm xs:text-xs">{title}</h4>
                <h3 className="text-white sm:text-sm xs:text-xs hover:text-purple-400">{user_name}</h3>
                <h4>{game_name}</h4>
            </span>
        </div>   
    );
};

export default StreamDescription;