import { useEffect, useState } from "react";

export function useStreamsFilter(followed, data, container) {
    const [streams, setStreams] = useState();

    useEffect(() => {      
        if(followed.length > 0 && data.length > 0) {
            if(container === "twitch") {
                const streamsFilter = data?.filter(item => {
                    return !followed?.some(el => el.user_id === item.user_id)
                })
                setStreams(streamsFilter);
            } 
            else if(container === "sidebar") {
                const streamsFilter = data?.filter(item => {
                    return !followed?.some(el => el.id === item.user_id)
                })
                setStreams(streamsFilter);
            }
        }

    }, [followed, data, container])

    return streams;
}