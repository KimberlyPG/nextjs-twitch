import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import ReactTwitchEmbedVideo from "react-twitch-embed-video"

const Principal = () => {
    const [list, setData] = useState({});
    const { data: session, status } = useSession()
    console.log('session', session);
    const currentToken = session?.user.token;
    // const userId = session.user.id;
    // console.log("userId", session.user.id)

    // useEffect(() => {
    //     const getValidation = async() => {
    //         await fetch("https://id.twitch.tv/oauth2/validate",
    //             {
    //                 headers: {
    //                     "Authorization": `OAuth ${currentToken}`,
    //                 }
    //             }
    //         )
    //     }
    //     getValidation();
    // }, [])

    useEffect(() => {
            const getStreams = async () => {
                if(currentToken) {
                    const information = await fetch(`https://api.twitch.tv/helix/streams?first=8`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": 'vg45al0z1c3d2awrv8zqh1rxx9pqwq',
                        }
                    }
                    ).then(res => res.json());
    
                    setData(information.data);
                }
                }
            getStreams();
            console.log("a");
    }, [])

    // useEffect(() => {
    //     const getStreams = async () => {
    //         if(currentToken) {
    //             const information = await fetch(`https://api.twitch.tv/helix/streams/followed?user_id=${useId}`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${currentToken}`,
    //                     "Client-Id": 'vdad16o4rb91nnzy9bnawjqqprhan6',
    //                 }
    //             }
    //             ).then(res => res.json());

    //             setData(information);
    //         }
    //         }
    //     getStreams();
    // }, [])

    console.log("data2: ", list);
    return (
        <div>
            {/* <div className="">
                {result?.map((streams) => (
                    <div className="flex flex-row px-10 py-5">
                    <img className="w-20 rounded-full" src={streams.thumbnail_url} alt="" />
                    <h4 className="pl-10">{streams.display_name}</h4>
                    <hr/>
                    </div>
                    ))
                }
            </div> */}

            {/* <div className="grid grid-cols-4 grid-flow-row">
                {list && list?.map((streams) => (
                    <div>
                    <img className="w-80" src={streams.thumbnail_url.slice(0, -21)+".jpg"} alt="" />
                    <h4 className="w-80 truncate">{streams.title}</h4>
                    <h4>{streams.user_name}</h4>
                    <h4 key={streams.id}>{streams.game_name}</h4>
                    </div>
                    ))
                }
            </div> */}
        </div>
    )
} 

export default Principal;