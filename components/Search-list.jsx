import Image from "next/image";
import Link from "next/link";

const SearchList = ({ streams }) => {
    return ( 
        <Link href={{pathname: '/profile', query:{name: (streams.display_name), id:(streams.id), image:(streams.thumbnail_url), state:(true)}}}>
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

export default SearchList;
