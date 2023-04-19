import { useSession } from 'next-auth/react';
import useSWRInfinite from "swr/infinite";

import StreamCard from '../../components/StreamCard';
import Spinner from '../../components/Spinner';

import usePaginationFetcher from "../../hooks/usePaginationFetcher";
import { LiveStreamsData, StreamersData } from '../../types/types';
import InfiniteScroll from 'react-infinite-scroll-component';

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
                <InfiniteScroll 
                    className='scrollbar-hide'
                    dataLength={followedLiveList.length ?? 0}
                    next={() =>  setSize(size + 1)} 
                    hasMore={!isReachedEnd} 
                    loader={<h3 className='text-center'><Spinner /></h3>}
                    endMessage={<p className='text-center text-xs'>Reached to the end</p>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                            {followedLive?.map((item) => {
                                return (
                                    item.data.map((streamer) => (
                                        <StreamCard key={streamer.id+streamer.user_id} streamer={streamer} />
                                    )))
                                })
                            }
                    </div>
                </InfiniteScroll>
            }
        </div>   
    );
}

export default Live;
