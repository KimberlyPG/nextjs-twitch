import { useEffect, useState } from "react";
import { UserData, LiveStreamsData, Follow } from "../types/types";
import { initialUserDataValues } from "../initialValues/intialDataValues";

export const useIsFollowLive = (followedData: Follow[] | undefined, streamerLive: LiveStreamsData[] | undefined )=> {
    const [streams, setStreams] = useState<Follow[]>([]);

    useEffect(() => {      
        if(followedData && streamerLive) {
            const followOffline = followedData?.filter(item => {
                return !streamerLive?.some(el => el.user_id === item.to_id)
            })
            setStreams(followOffline);
        }
    }, [followedData, streamerLive])

    return streams;
}