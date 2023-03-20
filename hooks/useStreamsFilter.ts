import { useEffect, useState } from "react";
import { UserData, LiveStreamsData } from "../types/types";

export function useStreamsFilter(follows: UserData[], recommendations: LiveStreamsData[]) {
    const [streams, setStreams] = useState<LiveStreamsData[]>([]);

    useEffect(() => {      
        if(follows.length > 0 && recommendations.length > 0) {
            const streamsFilter = recommendations?.filter(item => {
                return !follows?.some(el => el.id === item.user_id)
            })
            setStreams(streamsFilter);
        }
    }, [follows, recommendations])

    return streams;
}