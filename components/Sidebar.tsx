import { useSession } from "next-auth/react";
import useSWR from 'swr';

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";
import SidebarSkeleton from "./SidebarSkeleton";

import { Follow, LiveStreamsData } from "../types/types";

import { useIsFollowLive } from "../hooks/useIsFollowLive";
import { useStreamsFilter } from "../hooks/useStreamsFilter";

const Sidebar = () => {
	const { data: session, status } = useSession();

	const userId = session?.user.id;

	const { data: follows, error: followsError } = useSWR<Follow[], Error>(`/users/follows?from_id=${userId}&first=80`);
	const { data: followedLive, error: followedLiveError } = useSWR<LiveStreamsData[], Error>(`/streams/followed?user_id=${userId}`);
	const { data: recommendationsList, error: recommendationsListError } = useSWR<LiveStreamsData[], Error>(`/streams?first=12`);

	const followedOffline  = useIsFollowLive(follows, followedLive);
	const recommendations = useStreamsFilter(follows, recommendationsList);

	if (followedLiveError || followsError || recommendationsListError) return <div>failed to load</div>
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
				{followedOffline.map((streamer) => (
					<SidebarStreamerCard
						key={streamer.to_id}
						id={streamer.to_id}
						game_name={null}
						viewer_count={null}
					/>
				))}
			</SidebarContainer>
			<SidebarContainer title="recomended">
				{recommendations.map((streamer) => (
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
