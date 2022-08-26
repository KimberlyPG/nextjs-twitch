import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BsSuitHeart, BsCameraVideo } from "react-icons/bs";

import SidebarLive from './Sidebar-live';
import SidebarOffine from './Sidebar-offline';
import SidebarRecommended from './Sidebar-recommended';

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addStreamerData, selectStreamer, cleanState } from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);

    const { data: session, status } = useSession();

    const streamerData = useAppSelector(selectStreamer);
    const streamerLive = useAppSelector(selectFollowedLive);
    const toggleSidebar = useAppSelector(selectToggle);
    const recommendedList = useAppSelector(selectRecommended);

    const dispatch = useAppDispatch();

    const userId = session?.user.id;
    const currentToken = session?.user.token;

    useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=50`,
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
    }, [currentToken, userId])

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
    }, [currentToken, followed])
        
    const validateLive = (id) => {
        let res = false;
        streamerLive && streamerLive?.forEach((item) => {
            if(item.user_id === id ) {
                res = true
            }
        })
        return res;
    }

    return (
        <div>
        {toggleSidebar && 
            <div className="text-white pt-10 h-screen">
                {followed &&
                     <>
                        <h4 className="text-sm xs:hidden lg:grid">Followed</h4>
                        <BsSuitHeart className="text-gray-500 lg:hidden w-full"/>
                        <div className="flex flex-col h-2/5 w-80 overflow-y-scroll scrollbar-hide 
                        md:max-w-[4rem] lg:max-w-[14rem] xs:max-w-[4rem]">
                            <div className="p-4 border-r border-gray-900">
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
                        </div> 
                     </>
                }
               
                <h1 className="pt-10 text-sm xs:hidden lg:grid">Recommended</h1>
                <BsCameraVideo className="text-gray-500 lg:hidden w-full mt-4"/>
                <div className="flex flex-col h-2/5 w-80 overflow-y-scroll scrollbar-hide
                md:max-w-[4rem] lg:max-w-[14rem] xs:max-w-[4rem]">
                    <div className="p-4 border-r border-gray-900">
                    {recommendedList && recommendedList.map((streamer) => (
                       <SidebarRecommended key={streamer.user_id} streamer={streamer}/>
                    ))
                    }
                    </div>
                </div>
            
            </div>
        }
        </div>
    )
}


export default Sidebar;