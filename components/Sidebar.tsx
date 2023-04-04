import { useSession } from "next-auth/react";
import useSWR from 'swr';
import useSWRInfinite from "swr/infinite";
import { FaHeart } from "react-icons/fa";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";
import SidebarSkeleton from "./SidebarSkeleton";

import { Follow, LiveStreamsData, StreamersData } from "../types/types";
import { useState } from "react";
import twitch from "../pages/api/twitch";

const Sidebar = () => {
	const { data: session, status } = useSession();
	const userId = session?.user.id;
	const currentToken = session?.user?.token;
	const [showMore, setShowMore] = useState(true);

	const fetcher = async(url: string) => {
		return await twitch.get(url, 
			{
				headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
				},
			})
			.then((res) => res.data)
	}
	const getKey = (pageIndex: number, previousPageData: StreamersData) => {
		if(pageIndex == 0) {
			return `/streams?first=6`
		}
		if (previousPageData && previousPageData?.pagination?.cursor) {
			console.log(previousPageData)
			setShowMore(true);
			return  `/streams?&first=3&after=${previousPageData.pagination.cursor}`
		} 
		// reached the end
		if (recommendationsList && Object.keys(recommendationsList[recommendationsList.length - 1].pagination).length === 0) {
			setShowMore(false);
			return null;
		}
	}
	const {data: recommendationsList, size, setSize, isLoading: recommendationsListIsLoading} = useSWRInfinite(getKey , fetcher);
	const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}`: null);
	// const { data: recommendationsList, error: recommendationsListError, isLoading: recommendationsListIsLoading } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);

    if ( !follows || followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading) return <SidebarSkeleton />
	return (
		<div className="text-white pt-10 h-screen space-y-5 overflow-y-scroll scrollbar-hide">
			{follows && followedLive ? 	(
			<>
				<SidebarContainer title="Followed Channels">
					{followedLive.map((streamer) =>  (
						<SidebarStreamerCard
							key={streamer.id}
							id={streamer.user_id}
							game_name={streamer.game_name}
							viewer_count={streamer.viewer_count}
						/>
					))}
					{follows.filter(item => !followedLive.some(id => id.user_id === item.to_id)).map((streamer) => (
						<SidebarStreamerCard
							key={streamer.to_id}
							id={streamer.to_id}
							game_name={null}
							viewer_count={null}
						/>
					))}
				</SidebarContainer>
			</>
			):(
				<SidebarContainer>
					<div 
					className="flex flex-col m-3 items-center justify-center font-5xl font-bold text-center xs:hidden 
					lg:flex bg-[#060C0C] rounded-lg"
					>
						<FaHeart className="text-4xl text-purple-600" />
						Follow Recommended Channels!
						<span className="text-xs font-light">They&apos;ll show up here for easy access!</span>
					</div>
				</SidebarContainer>
			)		
			}
			<SidebarContainer title="Recommended Channels">
				{recommendationsList && recommendationsList.map((item) => {
					return (
						item.data
						.filter((item: LiveStreamsData) => !follows?.some(id => id.to_id === item.user_id))
						.map((streamer: LiveStreamsData) => (
							<SidebarStreamerCard
								key={streamer.id} 
								id={streamer.user_id} 
								game_name={streamer.game_name} 
								viewer_count={streamer.viewer_count}
							/>
						))
					)
				})}
			</SidebarContainer>
			<button className="m-5 text-purple-500 text-sm" onClick={() => setSize(size + 1)}>{showMore ? "Show more" : "No more"}</button>
		</div>
	);
}

export default Sidebar;
