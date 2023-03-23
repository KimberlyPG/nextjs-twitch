import { useEffect, useState } from "react";
import { UserData, LiveStreamsData, Follow } from "../types/types";
import { initialUserDataValues } from "../initialValues/intialDataValues";

export const useIsFollowLive = (followedData: Follow[], streamerLive: LiveStreamsData[] )=> {
    const [streams, setStreams] = useState<Follow[]>([]);

    useEffect(() => {      
        if(followedData.length > 0 && streamerLive.length > 0) {
            const followOffline = followedData?.filter(item => {
                return !streamerLive?.some(el => el.user_id === item.to_id)
            })
            setStreams(followOffline);
        }
    }, [followedData, streamerLive])

    return streams;
}