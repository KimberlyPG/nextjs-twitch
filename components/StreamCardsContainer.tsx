import { FC } from "react";

import StreamCard from "./StreamCard";

import { LiveStreamsData, StreamersData } from "../types/types";

type StreamCardContainerProps = {
    description: string;
	recommendedData?: StreamersData[] | undefined;
	followedData?: LiveStreamsData[] | undefined;
}

const StreamCardContainer: FC<StreamCardContainerProps> = ({ description, recommendedData, followedData }) => {
  return (
    <div className="xs:pt-2">
        <h2 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-md md:text-lg">{description}</h2> 
        <div className="grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
			{description === "Recommended Channels" &&
				recommendedData?.map((item) => {
					return (
						item.data.map((streamer: LiveStreamsData) => (
							<StreamCard key={streamer.id+streamer.user_id} streamer={streamer} page="twitch" />
						)))
					})
			}
			{description === "Followed Live Channels" &&
				followedData?.slice(0, 5).map((streamer) => (
					<StreamCard key={streamer.id+streamer.user_id} streamer={streamer} page="twitch" />
				))
			}	
        </div>
    </div>
  )
}

export default StreamCardContainer;