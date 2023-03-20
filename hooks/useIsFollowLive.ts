import { useEffect, useState } from "react";
import { UserData, LiveStreamsData } from "../types/types";
import { initialIsFollowLiveValues } from "../initialValues/intialDataValues";

type useIsFollowLive = {
    followLive: LiveStreamsData[];
    followOffline: UserData[];
}

export const useIsFollowLive = (followedData: UserData[], streamerLive: LiveStreamsData[] )=> {
    const [streams, setStreams] = useState<useIsFollowLive>(initialIsFollowLiveValues);

    useEffect(() => {      
        if(followedData.length > 0 && streamerLive.length > 0) {
            const followLive = streamerLive?.filter(item => {
                return followedData?.some(el => el.id === item.user_id)
            })
            const followOffline = followedData?.filter(item => {
                return !streamerLive?.some(el => el.user_id === item.id)
            })
            setStreams({followLive: followLive, followOffline: followOffline})
        }
    }, [followedData, streamerLive])

    return streams;
}