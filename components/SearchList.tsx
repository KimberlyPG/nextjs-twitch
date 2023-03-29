import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import twitch from "../pages/api/twitch";
import { SearchChannels, LiveStreamsData} from "../types/types";
import { InitialStreamDataValues } from "../initialValues/intialDataValues";
import { viewersFormat } from "../utils/viewersFormat";
import { shimmer, toBase64 } from "../utils/shimmerImage";

type SearchListProps = {
    streams: SearchChannels;
}

const SearchList: FC<SearchListProps> = ({ streams }) => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const state = streams.is_live;
    const [data, setData] = useState<LiveStreamsData>(InitialStreamDataValues);
 
    useEffect(() => {
        if(state) {
            const getStream = async () => {
                await twitch.get(`/streams?&user_id=${streams.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                }
                ).then(data => setData(data.data.data[0]))
            }
            getStream();
        }
    }, [state, currentToken, streams.id])

    return ( 
        <>
        {state ? (
             <Link href={`/stream/${streams.display_name}`}>
                <div className="flex text-white mb-5 cursor-pointer lg:ml-10 xs:ml-5">
                    <div className="flex relative lg:w-1/3 sm:w-1/2 xs:w-full">
                        <Image 
                            className="lg:w-96 xs:w-full"
                            src={data?.thumbnail_url?.split("-{width}x{height}").join('')} 
                            alt={`${streams.display_name} image`} 
                            width={300}
                            height={150}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        />
                        <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0">LIVE</p>
                    </div>
                    <div className="w-full xs:ml-3 lg:ml-5">                 
                        <h3 className="xs:text-xs sm:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h3>
                        <p className="xs:text-xs sm:text-sm text-gray-300 truncate">{streams.game_name}</p>
                        <p className="xs:text-xs sm:text-sm text-gray-300 truncate">{viewersFormat(data?.viewer_count)} viewers</p>
                        <p className="xs:text-xs sm:text-sm text-gray-300 xs:hidden sm:flex">{streams.title}</p>
                    </div> 
                </div>  
            </Link>
            ):(  
            <Link href={{pathname: `/profile/${streams.id}`, query: {state:(state)}}}>
                <div className="flex items-center text-white mb-5 cursor-pointer lg:ml-10 xs:ml-5">
                    <div className="flex relative lg:w-1/3 sm:w-1/2 xs:w-full items-center justify-center">
                        <Image 
                            className="rounded-full cursor-pointer lg:w-28 xs:w-16" 
                            src={streams.thumbnail_url}
                            alt={`${streams.display_name} image`} 
                            width={100}
                            height={100}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        /> 
                    </div>
                    <div className="w-full xs:ml-3 lg:ml-5">
                        <h3 className="xs:text-xs sm:text-sm font-semibold hover:text-purple-400">{streams.display_name}</h3>
                        <p className="xs:text-xs sm:text-sm truncate text-gray-300 xs:hidden sm:flex">Lo último de {streams.display_name}</p>
                        <p className="xs:text-xs sm:text-sm text-purple-500 hover:text-white xs:hidden sm:flex">{streams.game_name}</p>
                        <p className="xs:text-xs sm:text-sm text-purple-500 hover:text-white xs:hidden sm:flex">{streams.title}</p>
                    </div>
                </div>        
            </Link>
            )
        } 
        </>        
    )
}

export default SearchList;
