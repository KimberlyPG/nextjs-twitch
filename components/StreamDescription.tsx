import { FC } from "react";
import useSWR from 'swr';

import UserImage from "./UserImage";

import { UserData } from "../types/types";

type StreamDescriptionProps = {
    user_id: string;
    title: string;
    user_name: string;
    game_name: string | null;
    page: string;
}

const StreamDescription: FC<StreamDescriptionProps> = ({ user_id, title, user_name, game_name, page }) => {
    const { data: streamerData, error: streamerDataError } = useSWR<UserData[], Error>(`/users?id=${user_id}`);

    if(!streamerData) return <div>Loading...</div>
    return (
        <div className="flex relative xs:mx-3 sm:mx-0">  
            <UserImage 
                extraStyle={"h-10 w-10 my-2 mr-2"}
                imageUrl={streamerData[0].profile_image_url}
                user={user_name}
            />                       
            <span className="w-full truncate m-2">
                <p className="truncate text-white sm:text-sm xs:text-xs">{title}</p>
                <h3 className="text-gray-400 sm:text-sm xs:text-xs">{user_name}</h3>
                {page !== "game" &&
                    <p className="text-gray-400 sm:text-sm xs:text-xs hover:text-purple-400">{game_name}</p>
                }
            </span>
        </div>   
    );
};

export default StreamDescription;