import { useSession } from 'next-auth/react';
import useSWRInfinite from "swr/infinite";

import Spinner from '../../components/Spinner';
import ChannelsScroll from '../../components/ChannelsScroll';

import usePaginationFetcher from "../../hooks/usePaginationFetcher";
import { LiveStreamsData, StreamersData } from '../../types/types';

const Live = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const fetcher = usePaginationFetcher();
    
    const getFollowedLiveKey = (pageIndex: number, previousPageData: StreamersData) => {
        if(pageIndex == 0) {
            return `/streams/followed?user_id=${userId}&first=15` 
        }
        if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams/followed?user_id=${userId}&first=5&after=${previousPageData.pagination.cursor}`
        } 
    }
    
    const changeSize = () => {
        setSize(size + 1);
    }
    
    const { data: followedLive, size, setSize, error, isLoading } = 
    useSWRInfinite<StreamersData>(getFollowedLiveKey, fetcher, {refreshInterval: 20000});

    const isReachedEnd = followedLive &&  !followedLive[followedLive.length -1]?.pagination?.cursor;

    const followedLiveArray: LiveStreamsData[][] =  [];
    followedLive?.forEach((el) => followedLiveArray.push(el.data));
    const followedLiveList = followedLiveArray.flat();

    if(isLoading) return <div className='flex w-full h-full justify-center items-center'><Spinner /></div>
    return (
        <div id="scrollableDiv" className='h-full overflow-y-scroll scrollbar-hide md:m-5'>
            <h1 className='text-3xl font-bold mb-5'>Following</h1>
            {followedLive &&
                <ChannelsScroll 
                    channelsList={followedLiveList} 
                    channels={followedLive} 
                    isReachedEnd={isReachedEnd} 
                    changeSize={changeSize} 
                    page="live"
                />
            }
        </div>   
    );
}

export default Live;
