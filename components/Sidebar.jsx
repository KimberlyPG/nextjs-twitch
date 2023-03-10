import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";

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

const Sidebar = () => {
	const { data: session, status } = useSession();
	const userId = session?.user.id;
	const currentToken = session?.user.token;
	
	const [followed, setFollowed] = useState([]);

	const dispatch = useAppDispatch();

	const streamerData = useAppSelector(selectStreamer);
	const streamerLive = useAppSelector(selectFollowedLive);
	const toggleSidebar = useAppSelector(selectToggle);
	const recommendedList = useAppSelector(selectRecommended);
	const recommendedUserData = useAppSelector(selectRecommendedUserData);

	useEffect(() => {
		const getFollowed = async () => {
		if (currentToken) {
			const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=50`,
			{
				headers: {
				Authorization: `Bearer ${currentToken}`,
				"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
				},
			}
			).then((res) => res.json());
			setFollowed(response.data);
		}
		};
		getFollowed();
	}, [currentToken, userId]);

	useEffect(() => {
		dispatch(cleanState([]));
		if (followed) {
		followed.map((streamer) => {
			const streamerId = streamer.to_id;
			const getFollowedInfo = async () => {
			const response = await fetch(`https://api.twitch.tv/helix/users?id=${streamerId}`,
				{
				headers: {
					Authorization: `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
				},
				}
			).then((res) => res.json());
			dispatch(addStreamerData(response.data[0]));
			};
			getFollowedInfo();
		});
		}
	}, [currentToken, followed, dispatch]);

	useEffect(() => {
		recommendedList.map((streamer) => {
		const getStreamerInfo = async() => {
			const information = await fetch(`https://api.twitch.tv/helix/users?id=${streamer.user_id}`,
			{
				headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
				}
			}
			).then(res => res.json())
			dispatch(addData(information.data[0]));
		};
		getStreamerInfo();
	});
	}, [currentToken, recommendedList, dispatch]);

	const validateLive = (id) => {
		let res = false;
		if(streamerLive.length > 0 ){
		streamerLive.forEach((item) => {
			if (item.user_id === id) {
			res = true;
			}
		});
		return res;
		}
	};

	return (
		<>
		{toggleSidebar && (
			<div className="text-white pt-10 h-screen">
			{followed && (
				<SidebarContainer title="followed">
					{streamerData.map((data) => validateLive(data.id) === true && (
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
					{streamerData.map((data) => validateLive(data.id) === false && (
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
