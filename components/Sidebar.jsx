import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import StreamerLive from "./Streamer-live";

import { addStreamerData, selectStreamer, cleanState } from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);

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
    console.log("streamer data", streamerData);

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
        <div className="flex flex-col text-white pt-10  h-96 overflow-y-scroll scrollbar-hide  w-96
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <h4>Followed</h4>
            <div className="w-30 text-gray-200 p-5 text-xs lg:text-sm border-r
            border-gray-900">
                    {streamerData.map((data) => (
                            validateLive(data.id) === true ? (
                                    <StreamerLive key={data.id} data={data}/>
                            ):(
                                // <h1>offline</h1>
                                <div className="flex flex-row pb-3">
                                    <img className="grayscale rounded-full h-10" src={data.profile_image_url} alt="" />
                                    <h1 className="pl-2">{data.display_name}</h1>
                                </div>
                            )
                        ))  }
            </div>
        </div>  
    )
}

export default Sidebar;