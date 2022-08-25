import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";

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
    }, [currentToken, streamer])

    return (
        <div className="flex flex-row text-white w-full mb-5 hover:opacity-80 cursor-pointer">
            <img 
                className="rounded-full h-8" 
                src={streamerData.profile_image_url} alt="" 
            />
            <span>
                <h4 className="w-28 hover:text-purple-400 cursor-pointer pl-5 truncate text-xs font-semibold">{streamer.user_name}</h4>
                <h4 className="w-28 pl-5 text-xs text-gray-300 truncate">{streamer.game_name}</h4>
            </span>
            <div>
                <RiRadioButtonLine className="text-red-500 text-xs" />
                <h4 className="pl-3 text-xs">{streamer.viewer_count}</h4>  
            </div>
        </div>
    )
}

export default SidebarRecommended;