import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";

import twitch from "../pages/api/twitch";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStreamerData,
  cleanState,
} from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";
import { addData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";
import { useStreamsFilter } from "../hooks/useStreamsFilter";

import { UserData, Follow } from "../types/types";
import { useIsFollowLive } from "../hooks/useIsFollowLive";

const Sidebar = () => {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();

	const userId = session?.user.id;
	const currentToken = session?.user.token;

	const [followed, setFollowed] = useState<Follow[]>([]);
	const [followedData, setFollowedData] = useState<UserData[]>([]);
	const [recommendedData, setRecommendedData] = useState<UserData[]>([]);

	const toggleSidebar = useAppSelector(selectToggle);
	const streamerLive = useAppSelector(selectFollowedLive);
	const recommendedList = useAppSelector(selectRecommended);

	const {followLive, followOffline}  = useIsFollowLive(followedData, streamerLive);
	const recommendations = useStreamsFilter(followedData, recommendedList, "sidebar");
	const findStreamer = (data, id) => data?.findIndex((streamerid) => streamerid.id == id);

	useEffect(() => {
		const getFollowed = async () => {
			if (currentToken) {
				await twitch.get(`/users/follows?from_id=${userId}&first=50`,
				{
					headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
					},
				})
				.then((res) => setFollowed(res.data.data));
			}
		};
		getFollowed();
	}, [currentToken, userId]);

	useEffect(() => {
		dispatch(cleanState([]));
		followed &&	followed.map((streamer) => {
			const streamerId = streamer.to_id;
			const getFollowedInfo = async () => {
				await twitch.get(`/users?id=${streamerId}`,
				{
					headers: {
						Authorization: `Bearer ${currentToken}`,
						"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
					},
				})
				.then((res) => {
					setFollowedData(current => [...current, res.data.data[0]]);
					dispatch(addStreamerData(res.data.data[0]));
				}) 
			}
			getFollowedInfo();
		});
	}, [followed, currentToken, dispatch]);

	useEffect(() => {
		recommendedList.map((streamer) => {
			const getStreamerInfo = async () => {
				await twitch.get(`/users?id=${streamer.user_id}`,
				{
					headers: {
						"Authorization": `Bearer ${currentToken}`,
						"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
					}
				})
				.then(res => {
					setRecommendedData(current => [...current, res.data.data[0]]);
					dispatch(addData(res.data.data[0]));
				})
			};
			getStreamerInfo();
		});
	}, [currentToken, recommendedList, dispatch]);

	return (
		<>
		{toggleSidebar && (
			<div className="text-white pt-10 h-screen space-y-5">
			{followed && (
				<SidebarContainer title="followed">
					{followLive && followLive?.map((streamer) =>  (
						<SidebarStreamerCard
							key={streamer.id}
							id={streamer.id}
							image={followedData[findStreamer(followedData, streamer.user_id)]?.profile_image_url}
							display_name={streamer.user_name}
							game_name={streamer.game_name}
							viewer_count={streamer.viewer_count}
						/>
						)
					)}
					{followOffline && followOffline?.map((streamer) => (
						<SidebarStreamerCard
							key={streamer.id}
							id={streamer.id}
							image={streamer.profile_image_url}
							display_name={streamer.display_name}
							game_name={null}
							viewer_count={null}
						/>
						)
					)}
				</SidebarContainer>
			)}
				<SidebarContainer title="recomended">
					{recommendations && recommendations.map((streamer) => (
						<SidebarStreamerCard
							key={streamer.id} 
							id={streamer.user_id} 
							image={recommendedData[findStreamer(recommendedData, streamer.user_id)]?.profile_image_url} 
							display_name={streamer.user_name} 
							game_name={streamer.game_name} 
							viewer_count={streamer.viewer_count}
						/>
					))}
				</SidebarContainer>
			</div>
		)}
		</>
	);
}

export default Sidebar;
