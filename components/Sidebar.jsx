import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
    const [followed, setFollowed] = useState([]);
    const { data: session, status } = useSession();

    const userId = session?.user.id;
    const currentToken = session?.user.token;

    // useEffect(() => {
    //     const getFollowed = async () => {
    //         if(currentToken) {
    //             const information = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${userId}`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${currentToken}`,
    //                     "Client-Id": 'vdad16o4rb91nnzy9bnawjqqprhan6',
    //                 }
    //             }
    //             ).then(res => res.json());

    //             setFollowed(information.data);
    //         }
    //         }
    //     getFollowed();
    // }, [])
    // console.log("followed", followed);

    return (
        <div className="w-30 text-gray-500 p-5 text-xs lg:text-sm border-r
        border-gray-900 overflow-y-scroll scrollbar-hide h-screen
        sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div>
                {followed?.map((streamer) => (
                    <div>
                        <img className="w-20 rounded-full cursor-pointer" src={streamer.thumbnail_url.slice(0, -21)+".jpg"} alt="" />
                        <h4>{streamer.user_name}</h4>
                        <h4>{streamer.game_name}</h4>
                        <h4>{streamer.viewer_count}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;