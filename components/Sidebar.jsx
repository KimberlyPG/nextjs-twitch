import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import StreamerLive from "./Streamer-live";
import SidebarFollowed from './Sidebar-followed';

import { addStreamerData, selectStreamer, cleanState } from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectFollowedOrder } from "../store/slices/followedOrder/followedOrderSlice";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);
    const [info, setInfo] = useState([]);

    const { data: session, status } = useSession();

    const streamerData = useAppSelector(selectStreamer);
    const streamerLive = useAppSelector(selectFollowedLive);

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

    
    // useEffect(() => {
        //     streamerData.map((data) => (
            //         validateLive(data.id) === true ? (
                //             setInfo(data),
                //             dispatch(addFollowedOrder(data))
                //         ) : (""),
                //     ))
                // }, [streamerOrder, info])
                // console.log("order", streamerOrder)
                // const a = [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
                // a.sort(function(x, y) {
                    // return Number(x) - Number(y);
                    // });
                    // console.log(a);
    // streamerData.sort(function(x, y) {
    //     return Number(x) - Number(y)
    // })
    
    // useEffect(() => {
    //     respo = streamerData.map((data) => (
        //             validateLive(data.id),
        //             data
        //     ))
        //     respo.sort(function(x, y) {
            //         return Number(y) - Number(x)
            //     })
            //     // setInfo(respo);
            //     }, [streamerData])
            // console.log("sort", info)
            
    const validateLive = (id) => {
        let res = false;
        streamerLive.forEach((item) => {
            if(item.user_id === id ) {
                res = true
            }
        })
        return res;
    }

    console.log("streamer live", streamerLive);
    return (
        <div className="flex flex-col text-white pt-10  h-96 overflow-y-scroll scrollbar-hide  w-96
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <h4 className="text-sm">Followed</h4>
            <div className="w-30 text-gray-200 p-5 text-xs lg:text-sm border-r
            border-gray-900">
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
    )
}


export default Sidebar;