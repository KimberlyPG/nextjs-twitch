import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";

import SidebarStreamerCard from "./sidebar-streamer-card";

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
        <SidebarStreamerCard key={streamer.user_id} image={streamerData.profile_image_url} display_name={streamer.user_name} game_name={streamer.game_name} viewer_count={streamer.viewer_count} />  
    )
}

export default SidebarRecommended;