import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarContainer from "./SidebarContainer";
import SidebarStreamerCard from "./SidebarStreamerCard";

import twitch from "../pages/api/twitch";
import { Follow, LiveStreamsData } from "../types/types";

import { useIsFollowLive } from "../hooks/useIsFollowLive";
import { useStreamsFilter } from "../hooks/useStreamsFilter";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addList } from "../store/slices/recommended/recommendedSlice";
import { addFollowedData } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { addFollowed } from "../store/slices/followed/followedSlice";

const Sidebar = () => {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();

	const userId = session?.user.id;
	const currentToken = session?.user.token;

	const [followedLive, setFollowedLive] = useState<LiveStreamsData[]>([])
	const [follows, setFollows] = useState<Follow[]>([]);
	const [recommendationsList, setRecommendationsList] = useState<LiveStreamsData[]>([])

	const toggleSidebar = useAppSelector(selectToggle);
	console.log(toggleSidebar)

	const followedOffline  = useIsFollowLive(follows, followedLive);
	const recommendations = useStreamsFilter(follows, recommendationsList);

	//All the streamers followed by the user
	useEffect(() => {
		if (currentToken && userId) {
			const getFollows = async () => {
				await twitch.get(`/users/follows?from_id=${userId}&first=80`,
				{
					headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
					},
				})
				.then((data) => {
					dispatch(addFollowed(data.data.data))
					setFollows(data.data.data);
				});
			}
			getFollows();
		};
	}, [currentToken, dispatch, userId]);
	
	//streamers that the user follows and that are streaming live
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
					setFollowedLive(data.data.data)   
                })
            }
        }
        getFollowed();
    }, [currentToken, dispatch, userId])

	//streaming live recommendations
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

	return (
		<>
		{toggleSidebar && (
			<div className="text-white pt-10 h-screen space-y-5">
			{follows && (
				<SidebarContainer title="followed">
					{followedLive && followedLive?.map((streamer) =>  (
						<SidebarStreamerCard
							key={streamer.id}
							id={streamer.user_id}
							category="followed"
							game_name={streamer.game_name}
							viewer_count={streamer.viewer_count}
						/>
					))}
					{followedOffline && followedOffline?.map((streamer) => (
						<SidebarStreamerCard
							key={streamer.to_id}
							id={streamer.to_id}
							category="followed"
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
							category="recommended"
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
