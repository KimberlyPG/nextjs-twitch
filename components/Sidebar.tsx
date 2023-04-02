import { useSession } from "next-auth/react";
import useSWR from 'swr';
import { FaHeart } from "react-icons/fa";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";
import SidebarSkeleton from "./SidebarSkeleton";

import { Follow, LiveStreamsData } from "../types/types";

const Sidebar = () => {
	const { data: session, status } = useSession();

	const userId = session?.user.id;

	const { data: follows, error: followsError, isLoading: followsIsLoading } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError, isLoading: follosLiveIsLoading } = useSWR<LiveStreamsData[], Error>(follows && follows?.length > 0 ? `/streams/followed?user_id=${userId}`: null);
	const { data: recommendationsList, error: recommendationsListError, isLoading: recommendationsListIsLoading } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);

	const streamsRecommended = recommendationsList?.filter(item => !follows?.some(id => id.to_id === item.user_id))!;

    if (followsIsLoading || follosLiveIsLoading || recommendationsListIsLoading) return <SidebarSkeleton />
	return (
		<div className="text-white pt-10 h-screen space-y-5">
			{follows && followedLive ? 	(
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
			):(
				<SidebarContainer>
					<div 
					className="flex flex-col m-3 items-center justify-center font-5xl font-bold text-center xs:hidden 
					lg:flex bg-[#060C0C] rounded-lg"
					>
						<FaHeart className="text-4xl text-purple-600" />
						Follow Recommended Channels!
						<span className="text-xs font-light">They will appear here to easy access!</span>
					</div>
				</SidebarContainer>
			)		
			}
			<SidebarContainer title="Recommended Channels">
				{streamsRecommended.map((streamer) => (
					<SidebarStreamerCard
						key={streamer.id} 
						id={streamer.user_id} 
						game_name={streamer.game_name} 
						viewer_count={streamer.viewer_count}
					/>
				))}
			</SidebarContainer>
		</div>
	);
}

export default Sidebar;
