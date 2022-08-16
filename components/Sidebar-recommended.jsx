import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SidebarRecommended = ({ streamer }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [streamerData, setStreamerData] = useState([]);

    useEffect(() => {
        const streamerId = streamer.user_id;
        const getStreamerInfo = async() => {
                    const information = await fetch(`https://api.twitch.tv/helix/users?id=${streamerId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        }
                    }
                    ).then(res => res.json())
                    setStreamerData(information.data[0]);
                };
                getStreamerInfo();
    }, [])

    return (
        <div className="">
            <img 
                className="rounded full h-8" 
                src={streamerData.profile_image_url} alt="" 
            />
            <h4 className="pb-5 w-72 hover:text-purple-400 cursor-pointer pl-2 truncate text-xs">{streamer.user_name}</h4>
            <h4 className="pb-5 w-72 pl-2 truncate text-xs">{streamer.game_name}</h4>
        </div>
    )
}

export default SidebarRecommended;