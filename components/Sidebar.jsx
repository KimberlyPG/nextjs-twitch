import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import SidebarLive from './Sidebar-live';
import SidebarOffine from './Sidebar-offline';

import { useAppDispatch, useAppSelector } from "../store/hooks";
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
        streamerLive && streamerLive.forEach((item) => {
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
                                    <SidebarLive key={data.id} data={data} />
                                )
                            ))}
                            {streamerData.map((data) => (
                                validateLive(data.id) === false && (
                                    <SidebarOffine key={data.id} data={data} />
                                )
                            ))}
                    </div>
                    <h4></h4>
                </div>  
            }
        </div>
    )
}


export default Sidebar;