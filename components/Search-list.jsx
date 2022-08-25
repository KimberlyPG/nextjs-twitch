import Image from "next/image";

const SearchList = ({ streams }) => {
    return ( 
        <div>
            <div className="flex flex-row text-white w-full mb-5 ml-20">
                <Image 
                    className="rounded-full cursor-pointer" 
                    src={streams.thumbnail_url}
                    layout="fixed"
                    width="70rem"
                    height="70rem"
                    alt="streamer image" 
                />
                <h4 className="ml-10 w-60 font-semibold hover:text-purple-400 cursor-pointer">{streams.display_name}</h4>
                <div className="">
                    <h4 className="text-sm">Lo último de {streams.display_name}</h4>
                    <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer">{streams.game_name}</h4>
                    <h4 className="text-xs text-purple-500 hover:text-white cursor-pointer">{streams.title}</h4>
                </div>
            </div>
        </div>
    )
}

export default SearchList;
