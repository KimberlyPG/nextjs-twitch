import { useContext, useEffect } from 'react';

import { FilterContext } from "../context/filter.context";
import { LiveStreamsData, StreamersData } from "../types/types";

const useFilterRecommendations = 
(recommendationsList: StreamersData[] | undefined, followedLive: LiveStreamsData[][] | undefined, size: number) => {
    const { setFirst, first, second, setSecond } = useContext(FilterContext);

    const recommended: Array<LiveStreamsData[]> = [];
    recommendationsList?.forEach((element) => {
        if(followedLive){
            recommended.push(element.data.filter((item: LiveStreamsData) => !followedLive[0]?.some(id => id.user_id === item.user_id)))
        } else {
            recommended.push(element.data);
        }
    })   

    let secondPage = recommended[1]?.length;
    let fisrtPage = recommended[0]?.length;
    const changeFisrtPage = () => {
        if (recommended[1]?.length !== 5) {
            let sum = 5 - recommended[1]?.length;
            setSecond(second + sum);
        }
    }

    const changeSecondPage = () => {
        if(recommended[0]?.length !== 5) {     
            let sum = 5 - recommended[0]?.length;
            setFirst(first + sum);
        }
    }

    useEffect(() => {
        if(size === 2 && recommended[1]) {
            changeFisrtPage();
        }
        if(recommended.length > 0) {
            changeSecondPage();
        }
    }, [size, secondPage, fisrtPage])

  return recommended;
}

export default useFilterRecommendations;