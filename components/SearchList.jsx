import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { viewersFormat } from "../utils/viewersFormat";

const SearchList = ({ streams }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const state = streams.is_live;
    const [data, setData] = useState({});
 
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
   
    return ( 
        <>
        {state === true ? (
             <Link href={`/stream/${display_name}`}>
                <div className="flex flex-row text-white mb-5 sm:ml-20 cursor-pointer w-full">
                    <div className="relative sm:w-64 xs:w-36">
                        <img 
                            className="w-full"
                            src={data?.thumbnail_url?.slice(0, -21)+".jpg"} 
                            alt={`Agustin ${streams.display_name}`} 
                        />
                        <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0">LIVE</p>
                    </div>
                    <div className="w-1/2 xs:ml-2 sm:ml-10">                 
                        <h4 className="md:w-60 xs:w-32 xs:text-xs sm:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                        <h3 className="xs:text-xs sm:text-sm text-gray-300">{streams.game_name}</h3>
                        <p className="xs:text-xs sm:text-sm text-gray-300">{viewersFormat(data?.viewer_count)} viewers</p>
                        <h3 className="xs:text-xs sm:text-sm truncate text-gray-300">{streams.title}</h3>
                    </div> 
                </div>  
            </Link>
            ):(  
            <Link 
                href={{
                    pathname: `/profile/${streams.display_name}`, 
                    query: {
                        id:(streams.id), 
                        image:(streams.thumbnail_url), 
                        state:(state)
                    }
                }}
                as={`/profile/${streams.display_name}`}
            >
                <div className="flex flex-row text-white mb-5 sm:ml-20 cursor-pointer">
                    <div className="flex sm:w-64 xs:w-36 justify-center">
                        <Image 
                            className="rounded-full cursor-pointer" 
                            src={streams.thumbnail_url}
                            layout="fixed"
                            width="90%"
                            height="90%"
                            alt="streamer image" 
                        /> 
                    </div>
                    <div className="w-1/2 xs:ml-2 sm:ml-10">
                        <h4 className="md:w-60 xs:w-32 xs:text-xs sm:text-sm font-semibold hover:text-purple-400">{streams.display_name}</h4>
                        <h4 className="xs:text-xs sm:text-sm truncate text-gray-300 xs:hidden sm:flex">Lo último de {streams.display_name}</h4>
                        <h4 className="xs:text-xs sm:text-sm text-purple-500 hover:text-white xs:hidden sm:flex">{streams.game_name}</h4>
                        <h4 className="xs:text-xs sm:text-sm w-full truncate text-purple-500 hover:text-white xs:hidden sm:flex">{streams.title}</h4>
                    </div>
                </div>        
            </Link>
            )
        } 
        </>        
    )
}

export default SearchList;
