import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

import viewersformat from "../utils/viewers-format";

const SearchList = ({ streams }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const state = streams.is_live;

    const [data, setData] = useState({});
 
    // console.log("streams", streams);
    useEffect(() => {
        if(state === true) {
            const getStream = async () => {
                const response = await fetch(`https://api.twitch.tv/helix/streams?&user_id=${streams.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());
                setData(response.data[0]);
                console.log("send")
            }
            getStream();
        }
    }, [state])
    console.log("data", data);
    
    return ( 
        <div>
        {state === true ? (
             <Link href={{pathname: '/stream', query:{streamer: (streams.display_name), id:(streams.id) }}}>
                <div className="flex flex-row text-white mb-5 sm:ml-20 cursor-pointer">
                    <div className="relative sm:w-64 xs:w-36">
                        <img 
                            className="full"
                            src={data?.thumbnail_url?.slice(0, -21)+".jpg"} 
                            alt="" 
                        />
                        <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0">LIVE</p>
                    </div>
                    <div className="xs:ml-2 sm:ml-10">                 
                        <h4 className="md:w-60 xs:w-32 xs:text-xs sm:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                        <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.game_name}</h4>
                        <p>{data?.viewer_count} viewers</p>
                        <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.title}</h4>
                    </div> 
                </div>  
            </Link>
            ):(  
            <Link href={{pathname: '/profile', query:{name: (streams.display_name), id:(streams.id), image:(streams.thumbnail_url), state:(state)}}}>
                <div className="flex flex-row text-white mb-5 sm:ml-20 cursor-pointer">
                    <div className="flex sm:w-64 xs:w-36 justify-center">
                        <Image 
                            className="rounded-full cursor-pointer m-0" 
                            src={streams.thumbnail_url}
                            layout="fixed"
                            width="90%"
                            height="90%"
                            alt="streamer image" 
                        /> 
                    </div>
                    <div className="flex xs:flex-col md:flex-row">
                        <h4 className="xs:ml-2 sm:ml-10 md:w-60 xs:w-32 xs:text-xs sm:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                        {streams.game_name &&
                            <div className="xs:ml-0 sm:ml-10">
                                <h4 className="text-sm xs:hidden lg:flex">Lo último de {streams.display_name}</h4>
                                <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.game_name}</h4>
                                <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.title}</h4>
                            </div>
                        }
                    </div>        
                </div>  
            </Link>
            )
        } 
        </div>        
    )
}

export default SearchList;
