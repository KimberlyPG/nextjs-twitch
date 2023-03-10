import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";

import twitch from "../pages/api/twitch";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStreamerData,
  selectStreamer,
  cleanState,
} from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";
import { addData, selectRecommendedUserData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";
import { validateLive } from "../utils/validateLive";

const Sidebar = () => {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();
	const [followed, setFollowed] = useState([]);

	const userId = session?.user.id;
	const currentToken = session?.user.token;
	
	const streamerData = useAppSelector(selectStreamer);
	const streamerLive = useAppSelector(selectFollowedLive);
	const toggleSidebar = useAppSelector(selectToggle);
	const recommendedList = useAppSelector(selectRecommended);
	const recommendedUserData = useAppSelector(selectRecommendedUserData);

	useEffect(() => {
		const getFollowed = async () => {
			if (currentToken) {
				twitch.get(`/users/follows?from_id=${userId}&first=50`,
				{
					headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
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
				twitch.get(`/users?id=${streamerId}`,
				{
					headers: {
						Authorization: `Bearer ${currentToken}`,
						"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
					},
				})
			.then((res) =>dispatch(addStreamerData(res.data.data[0])));
			};
			getFollowedInfo();
		});
	}, [currentToken, followed, dispatch]);

	useEffect(() => {
		recommendedList.map((streamer) => {
			const getStreamerInfo = async() => {
				twitch.get(`/users?id=${streamer.user_id}`,
				{
					headers: {
						"Authorization": `Bearer ${currentToken}`,
						"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
					}
				})
				.then(res => dispatch(addData(res.data.data[0])))
			};
			getStreamerInfo();
		});
	}, [currentToken, recommendedList, dispatch]);

	return (
		<>
		{toggleSidebar && (
			<div className="text-white pt-10 h-screen">
			{followed && (
				<SidebarContainer title="followed">
					{streamerData.map((data) => validateLive(data.id, streamerLive) === true && (
						<SidebarStreamerCard
							key={data.id}
							id={data.id}
							image={data.profile_image_url}
							display_name={data.display_name}
							game_name={streamerLive[streamerLive.findIndex((streamerid) => streamerid.user_id == data.id)].game_name}
							viewer_count={streamerLive[streamerLive.findIndex((streamerid) => streamerid.user_id == data.id)].viewer_count}
						/>
						)
					)}
					{streamerData.map((data) => validateLive(data.id, streamerLive) === false && (
						<SidebarStreamerCard
							key={data.id}
							id={data.id}
							image={data.profile_image_url}
							display_name={data.display_name}
							game_name={null}
							viewer_count={null}
						/>
						)
					)}
				</SidebarContainer>
			)}
				<SidebarContainer title="recomended">
					{recommendedList &&
						recommendedList.filter((item) => validateLive(item.user_id) !== true).map((streamer) => (
						<SidebarStreamerCard
							key={streamer.id} 
							id={streamer.user_id} 
							image={recommendedUserData[recommendedUserData.findIndex((streamerid) => streamerid.id == streamer.user_id)]?.profile_image_url} 
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
};

export default Sidebar;
