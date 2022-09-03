import Link from "next/link";
import { useSelector } from "react-redux";

import StreamImage from "./Stream-image";

import { selectStreamer } from "../store/slices/streamer/streamerSlice";
import { selectRecommendedUserData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";

const StreamCard = ({ streamer, type }) => {
    const { id, user_id, thumbnail_url, user_name, game_name, viewer_count, title } = streamer;

    const streamerData = useSelector(selectStreamer);
    const recommendedData = useSelector(selectRecommendedUserData);
    console.log("streamerData", streamerData)
    console.log("recommendedData", recommendedData)

    const findStreamer = streamerData.findIndex((streamerid) => streamerid.id == user_id)
    const findRecommended = recommendedData.findIndex((streamerid) => streamerid.id == user_id)

    return (
        <div className="cursor-pointer text-xs text-slate-400 mb-10 relative">
            <Link href={{pathname: '/stream', query:{streamer: (user_name), id: (user_id)}}}>
                <div>
                    <StreamImage key={id} thumbnail_url={thumbnail_url} viewer_count={viewer_count}/>
                    <div className="flex flex-row w-full truncate">
                        {type === 'followed' ? 
                            <img 
                                className="rounded-full h-10 m-2"
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

                        <div>
                            <h4 className="w-full truncate text-white sm:text-sm xs:text-xs">{title}</h4>
                            <h3 className="text-white sm:text-sm xs:text-xs hover:text-purple-400">{user_name}</h3>
                            <h4>{game_name}</h4>
                        </div>
                    </div>                        
                </div>
            </Link>
        </div>
    )
}

export default StreamCard;