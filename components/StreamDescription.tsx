import { FC } from "react";

import UserImage from "./UserImage";

import { useSelector } from "react-redux";
import { selectStreamer } from "../store/slices/streamer/streamerSlice";
import { selectRecommendedUserData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";

type StreamDescriptionProps = {
    user_id: string;
    title: string;
    user_name: string;
    game_name: string;
    profile_image: string;
    type: string;
}

const StreamDescription: FC<StreamDescriptionProps> = ({ user_id, title, user_name, game_name, profile_image, type }) => {
    const streamerData = useSelector(selectStreamer);
    const recommendedData = useSelector(selectRecommendedUserData);

    const findStreamer = streamerData.findIndex((streamerid) => streamerid.id == user_id)
    const findRecommended = recommendedData.findIndex((streamerid) => streamerid.id == user_id)

    return (
        <div className="flex">  
            {type === 'followed' &&
                <UserImage 
                    extraStyle={"h-10 my-2 mr-2"} 
                    imageUrl={streamerData[findStreamer]?.profile_image_url} 
                    user={user_name} 
                />
            }
            {type === 'recommended' &&   
                <UserImage 
                    extraStyle={"h-10 my-2 mr-2"}
                    imageUrl={recommendedData[findRecommended]?.profile_image_url} 
                    user={user_name}
                /> 
            }  
            {type === 'other' &&
                <UserImage 
                    extraStyle={"h-10 my-2 mr-2"}
                    imageUrl={profile_image}
                    user={user_name}
                />                       
            }
            <span className="w-full truncate m-2">
                <h4 className="truncate text-white sm:text-sm xs:text-xs">{title}</h4>
                <h3 className="text-gray-400 sm:text-sm xs:text-xs">{user_name}</h3>
                <h4 className="text-gray-400 sm:text-sm xs:text-xs hover:text-purple-400">{game_name}</h4>
            </span>
        </div>   
    );
};

export default StreamDescription;