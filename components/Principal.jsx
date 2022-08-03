import axios from "axios";
import { useEffect, useState } from "react";
import SearchList from "./Search-list";
import { useSession } from "next-auth/react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
// import ReactTwitchEmbedVideo from "react-twitch-embed-video"

const Principal = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [result, setResults] = useState([]);
    const [gamesTop, setGamesTop] = useState([]);

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

    useEffect(() => {
            const getStreams = async () => {
                if(currentToken) {
                    const information = await fetch(`https://api.twitch.tv/helix/streams?first=4`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        }
                    }
                    ).then(res => res.json());
    
                    setData(information.data);
                }
                }
            getStreams();
    }, []);

    useEffect(() => {
        const getGames = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/games/top?first=6`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());

                setGamesTop(information.data);
            }
            }
        getGames();
    }, []);
    console.log("games top list", gamesTop);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.twitch.tv/helix/search/channels?query=${name}&first=5`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                }
            }
        ).then((data) => {
            setResults(data.data.data);
        })
    }

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    return (
        // <div className="flex">
        //     <Sidebar />
            <div className="text-white overflow-y-scroll scrollbar-hide">
                <Topbar handleChange={handleChange} handleSubmit={handleSubmit}/>
                    <div className="flex flex-col pt-10">
                        {result?.map((streams) => (
                            <SearchList key={streams.id} streams={streams}/>
                            )
                        )}
                    </div>

                <div className="pt-10">
                    <h1 className="pl-8 pb-5">Recommended Channels</h1> 
                    <div className="grid grid-cols-4 grid-flow-row place-items-center">
                        {data &&  data?.map((streams) => (
                            <div className="cursor-pointer text-xs text-slate-400">
                                <img className="w-80" src={streams.thumbnail_url.slice(0, -21)+".jpg"} alt="" />
                                <h4 className="w-80 truncate text-white text-sm">{streams.title}</h4>
                                <h4>{streams.user_name}</h4>
                                <h4>{streams.game_name}</h4>
                            </div>
                            ))
                        }
                    </div>
                </div>
                <div className="pt-10">
                    <h1 className="pl-8 pb-5">Top Games</h1> 
                    <div className="grid grid-cols-6 grid-flow-row place-items-center">
                        {gamesTop &&  gamesTop?.map((games) => (
                            <div className="cursor-pointer place-items-center pl-20">
                                <img className="w-60" src={games.box_art_url.slice(0, -21)+".jpg"} alt="" />
                                <h4 className="w-80 truncate text-white text-sm">{games.name}</h4>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        // </div>
    )
} 

export default Principal;