import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";

import twitch from "../pages/api/twitch";
import { UserData, Follow, LiveStreamsData } from "../types/types";
import { useIsFollowLive } from "../hooks/useIsFollowLive";
import { useStreamsFilter } from "../hooks/useStreamsFilter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStreamerData,
  cleanState,
} from "../store/slices/streamer/streamerSlice";
import { addList } from "../store/slices/recommended/recommendedSlice";
import { addFollowedData } from "../store/slices/followedLive/followedLiveSlice";
import { addData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { findStreamer } from "../utils/findStreamer";


const Sidebar = () => {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();

	const userId = session?.user.id;
	const currentToken = session?.user.token;

	const [follows, setFollows] = useState<Follow[]>([]);
	const [followedData, setFollowedData] = useState<UserData[]>([]);
	const [recommendationsList, setRecommendationsList] = useState<LiveStreamsData[]>([])
	const [recommendedData, setRecommendedData] = useState<UserData[]>([]);
	const [streamerLive, setStreamerLive] = useState<LiveStreamsData[]>([])

	const toggleSidebar = useAppSelector(selectToggle);

	const {followLive, followOffline}  = useIsFollowLive(followedData, streamerLive);
	const recommendations = useStreamsFilter(followedData, recommendationsList);

	//all the streamers followed
	useEffect(() => {
		const getFollows = async () => {
			if (currentToken && userId) {
				await twitch.get(`/users/follows?from_id=${userId}&first=80`,
				{
					headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
					},
				})
				.then((res) => setFollows(res.data.data));
			}
		};
		getFollows();
	}, [currentToken, userId]);

	//follows user data
	useEffect(() => {
		dispatch(cleanState([]));
			follows && follows.map((streamer) => {
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
	}, [follows, currentToken, dispatch]);

	//streamer followed live 
	useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                await twitch.get(`/streams/followed?user_id=${userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then((data) => {
					dispatch(addFollowedData(data.data.data))
					setStreamerLive(data.data.data)   
                })
            }
        }
        getFollowed();
    }, [currentToken, dispatch, userId])

	//recommendations
	useEffect(() => {
        const getRecommendations= async () => {
            if(currentToken) {
                await twitch.get(`/streams?first=12`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then((data) => {
                    setRecommendationsList(data.data.data)
					dispatch(addList(data.data.data));            
                })
            }
        }
        getRecommendations();
    }, [currentToken, dispatch, userId])

	//recommendations user data
	useEffect(() => {
		recommendationsList && recommendationsList.map((streamer: LiveStreamsData) => {
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
	}, [currentToken, recommendationsList, dispatch]);

	return (
		<>
		{toggleSidebar && (
			<div className="text-white pt-10 h-screen space-y-5">
			{follows && (
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
					))}
					{followOffline && followOffline?.map((streamer) => (
						<SidebarStreamerCard
							key={streamer.id}
							id={streamer.id}
							image={streamer.profile_image_url}
							display_name={streamer.display_name}
							game_name={null}
							viewer_count={null}
						/>
					))}
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
