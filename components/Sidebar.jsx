import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import StreamerLive from "./Streamer-live";

import { addStreamerData, selectStreamer, cleanState } from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);

    const { data: session, status } = useSession();

    const streamerData = useAppSelector(selectStreamer);
    const streamerLive = useAppSelector(selectFollowedLive);
    const toggleSidebar = useAppSelector(selectToggle);

    const dispatch = useAppDispatch();

    const userId = session?.user.id;
    const currentToken = session?.user.token;
 
    useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": 'vdad16o4rb91nnzy9bnawjqqprhan6',
                    }
                }
                ).then(res => res.json());

                setFollowed(information.data);
            }
            }
        getFollowed();
    }, [])

    useEffect(() => {
        dispatch(cleanState([])); 
        if(followed) {
        followed.map((streamer) => {
        const streamerId = streamer.to_id;
        const getFollowedInfo = async() => {
                    const information = await fetch(`https://api.twitch.tv/helix/users?id=${streamerId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        }
                    }
                    ).then(res => res.json())
                    dispatch(addStreamerData(information.data[0]))
                };
                getFollowedInfo();
            })
        }
    }, [followed])
         
    const validateLive = (id) => {
        let res = false;
        streamerLive.forEach((item) => {
            if(item.user_id === id ) {
                res = true
            }
        })
        return res;
    }

    return (
        <div>
        {toggleSidebar && 
            <div className="flex flex-col text-white pt-10  h-96 overflow-y-scroll scrollbar-hide w-96
            sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
                    <h4 className="text-sm">Followed</h4>
                    <div className="p-5 border-r border-gray-900">
                            {streamerData.map((data) => (
                                    validateLive(data.id) === true && (
                                        <div>
                                            <StreamerLive key={data.id} data={data}/>
                                        </div>
                                    )
                                ))
                            }
                            {streamerData.map((data) => (
                                validateLive(data.id) === false && (
                                    <div className="flex flex-row pb-3">
                                        <img className="grayscale rounded-full h-10" src={data.profile_image_url} alt="" />
                                        <h4 className="pl-2 truncate text-xs">{data.display_name}</h4>
                                        <span className="text-right text-xs">Offline</span>
                                    </div>
                                    )
                                ))
                            }
                    </div>
                </div>  
            }
        </div>
    )
}


export default Sidebar;