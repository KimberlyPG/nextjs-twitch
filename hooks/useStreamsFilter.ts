import { useEffect, useState } from "react";
import { UserData, LiveStreamsData, Follow } from "../types/types";

export function useStreamsFilter(follows: Follow[] | undefined, recommendations: LiveStreamsData[] | undefined) {
    const [streams, setStreams] = useState<LiveStreamsData[]>([]);

    useEffect(() => {      
        if(follows && recommendations) {
            const streamsFilter = recommendations?.filter(item => {
                return !follows?.some(el => el.to_id === item.user_id)
            })
            setStreams(streamsFilter);
        }
    }, [follows, recommendations])

    return streams;
}