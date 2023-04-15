import { useSession } from 'next-auth/react';
import React from 'react'
import useSWRInfinite from "swr/infinite";

import StreamCard from '../../components/StreamCard';

import usePaginationFetcher from "../../hooks/usePaginationFetcher";
import { StreamersData } from '../../types/types';
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
            return `/streams/followed?user_id=${userId}&first=15&after=${previousPageData.pagination.cursor}`
        } 
    }

    const { data: followedLive, size, setSize, error, isLoading } = 
    useSWRInfinite<StreamersData>(getFollowedLiveKey, fetcher, {refreshInterval: 20000});

    const isReachedEnd = followedLive &&  !followedLive[followedLive.length -1]?.pagination?.cursor;
    console.log(isReachedEnd)

    const followed =  [];
    followedLive?.forEach((el) => followed.push(el.data));
    const followedList = followed.flat();
    
    console.log(followedList.length ?? 0)
    if(isLoading) return <div>Loading...</div>
    return (
        <div id="scrollableDiv" className='scrollableDiv my-10 mx-5 h-full'>
            <h1 className='text-3xl font-bold mb-5'>Following</h1>
            {followedLive &&
                <InfiniteScroll 
                    dataLength={followedList.length ?? 0}
                    next={() => setSize(size + 1)} 
                    hasMore={!isReachedEnd} 
                    loader={<div>Loading...</div>}
                    endMessage={<p>Reached to the end</p>}
                    scrollableTarget="scrollableDiv"
                    height="100%"
                    // onScroll={() => console.log("A")}
                >
                    <div className="grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                            {followedList?.map((streamer) => (
                                // return (
                                //     item.data.map((streamer) => (
                                        <StreamCard key={streamer.id+streamer.user_id} streamer={streamer} />
                                    // )))
                            ))
                            }
                    </div>
                </InfiniteScroll>
            }
            {/* <button className='text-sm text-purple-500 text-center w-full' onClick={() => setSize(size + 1)}>
                Show more
            </button> */}
        </div>
    );
}

export default Live;
