import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);
    const [followedInfo, setFollowedInfo] = useState([]);
    const { data: session, status } = useSession();

    const userId = session?.user.id;
    const currentToken = session?.user.token;

    useEffect(() => {
        const getFollowed = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=2`,
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
    console.log("followed channels", followed);

    // useEffect(() => {
    //     followed.map((streamer) => {
    //     const getFollowedInfo = async() => {
    //                 await fetch(`https://api.twitch.tv/helix/users?id=${streamer.to_id}`,
    //                 {
    //                     headers: {
    //                         "Authorization": `Bearer ${currentToken}`,
    //                         "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
    //                     }
    //                 }
    //                 ).then((data) => setFollowedInfo(followed => ({
    //                     setFollowedInfo: [...followed.setFollowedInfo, {data}]
    //                 }))
    //                 );
                    
    //                 // setFollowedInfo.concat(information);   
    //             };
    //             getFollowedInfo();
    //         })
    // }, [])
    // console.log("followed info", followedInfo);

    return (
        <div className="flex flex-col text-white pt-10 overflow-y-scroll scrollbar-hide h-scree w-60">
            <h4>Followed</h4>
            <div className="w-30 text-gray-200 p-5 text-xs lg:text-sm border-r
            border-gray-900 sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div>
                {followed?.map((streamer) => (
                    <div>
                        <h4 className="pb-5 hover:text-purple-400 cursor-pointer">{streamer.to_name}</h4>
                    </div>
                ))}
            </div>
        </div>
        </div>  
    )
}

export default Sidebar;