import { useEffect, useState } from "react";

export function useStreamsFilter(followed, data) {
    const [streams, setStreams] = useState();

    useEffect(() => {      
        if(followed.length > 0 && data.length > 0) {
            const streamsFilter = data?.filter(item => {
                return !followed?.some(el => el.user_id === item.user_id)
            })
        setStreams(streamsFilter)
        }

    }, [followed, data])

    return streams;
}