import { useSession } from "next-auth/react";
import useSWR from 'swr';

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";
import SidebarSkeleton from "./SidebarSkeleton";

import { Follow, LiveStreamsData } from "../types/types";

const Sidebar = () => {
	const { data: session, status } = useSession();

	const userId = session?.user.id;

	const { data: follows, error: followsError } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError } = useSWR<LiveStreamsData[], Error>(`/streams/followed?user_id=${userId}`);
	const { data: recommendationsList, error: recommendationsListError } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);

	const streamsRecommended = recommendationsList?.filter(item => !follows?.some(id => id.to_id === item.user_id))!;

    if (!follows || !followedLive || !recommendationsList) return <SidebarSkeleton />
	return (
		<div className="text-white pt-10 h-screen space-y-5">
			<SidebarContainer title="followed">
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
			<SidebarContainer title="recomended">
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
