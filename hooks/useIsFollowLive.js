import { useEffect, useState } from "react";

export function useIsFollowLive(followed, streamerLive) {
    const [streams, setStreams] = useState([]);

    useEffect(() => {      
        if(followed.length > 0 && streamerLive.length > 0) {
            const followLive = streamerLive?.filter(item => {
                return followed?.some(el => el.id === item.user_id)
            })
            const followOffline = followed?.filter(item => {
                return !streamerLive?.some(el => el.user_id === item.id)
            })
            setStreams({followLive: followLive, followOffline: followOffline})
        }
    }, [followed, streamerLive])
    return streams;
}