import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SearchList = ({ streams }) => {
    
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const state = streams.is_live;
    // const [data, setData] = useState({});
    
    // if(state === true) {
    //         const getStream = async () => {
    //             const information = await fetch(`https://api.twitch.tv/helix/streams?&user_id=${streams.id}`,
    //             {
    //                 headers: {
    //                     "Authorization": `Bearer ${currentToken}`,
    //                     "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
    //                 }
    //             }
    //             ).then(res => res.json());
    //             setData(information.data);
    //         }
    //         getStream();
    //         console.log("data", data);
    // } 

    return ( 
        <div>
        {state === true ? (
             <Link href={{pathname: '/stream', query:{streamer: (streams.display_name), id:(streams.id) }}}>
                <div className="flex flex-row text-white mb-5 ml-20 cursor-pointer">
                    <Image 
                        className="rounded-full cursor-pointer" 
                        src={streams.thumbnail_url}
                        layout="fixed"
                        width="70rem"
                        height="70rem"
                        alt="streamer image" 
                    /> 
                    <div className="flex xs:flex-col md:flex-row">
                        <h4 className="ml-10 md:w-60 xs:w-32 xs:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                        {streams.game_name &&
                            <div className="xs:ml-10 md:ml-0">
                                <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center">LIVE</p>
                                <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.game_name}</h4>
                                <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer xs:hidden lg:flex">{streams.title}</h4>
                            </div>
                        }
                    </div>        
                </div>  
            </Link>
            ):(  
            <Link href={{pathname: '/profile', query:{name: (streams.display_name), id:(streams.id), image:(streams.thumbnail_url), state:(state)}}}>
                <div className="flex flex-row text-white mb-5 ml-20 cursor-pointer">
                    <Image 
                        className="rounded-full cursor-pointer" 
                        src={streams.thumbnail_url}
                        layout="fixed"
                        width="70rem"
                        height="70rem"
                        alt="streamer image" 
                    /> 
                    <div className="flex xs:flex-col md:flex-row">
                        <h4 className="ml-10 md:w-60 xs:w-32 xs:text-sm font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                        {streams.game_name &&
                            <div className="xs:ml-10 md:ml-0">
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
