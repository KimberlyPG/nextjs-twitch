import { FC } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from './Spinner';
import StreamCard from './StreamCard';

import { LiveStreamsData, StreamersData } from '../types/types';

type ChannelsScrollProps = {
    channelsList: LiveStreamsData[];
    channels: StreamersData[];
    isReachedEnd: boolean | undefined;
    changeSize: () => void;
    page: string;
}

const ChannelsScroll: FC<ChannelsScrollProps> = ({ channelsList, channels, isReachedEnd, changeSize, page }) => {
  return (
        <InfiniteScroll 
            className='scrollbar-hide'
            dataLength={channelsList.length ?? 0}
            next={() =>  changeSize()} 
            hasMore={!isReachedEnd} 
            loader={<h3 className='text-center'><Spinner /></h3>}
            endMessage={<p className='text-center text-xs'>Reached to the end</p>}
            scrollableTarget="scrollableDiv"
        >
            <div className="grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
                {channels?.map((item) => {
                    return (
                        item.data.map((streamer) => (
                            <StreamCard key={streamer.id+streamer.user_id} streamer={streamer} page={page} />
                        )))
                    })
                }
            </div>
        </InfiniteScroll>
  )
}

export default ChannelsScroll;
