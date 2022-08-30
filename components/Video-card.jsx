import Link from "next/link";
import Image from "next/image";

import { viewersformat } from "../utils/viewers-format";

const VideoCard = ({ item }) => {
    return (
        <div className='cursor-pointer hover:opacity-80'>
            <Link href={{pathname: '/videos', query:{id: (item.id) }}}>
                <div>
                    <div className="relative">
                        <img src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} alt="" />
                        {/* <Image 
                            src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} 
                            alt="video image"
                            layout="intrinsic"
                            height="250px"
                            width="450px"
                        /> */}
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute top-0">{item.duration}</p>
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0">{viewersformat(item.view_count)} views</p>
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0 right-0">{item.created_at}</p>
                    </div>
                    <h1 className='w-full text-sm truncate'>{item.title}</h1>
                </div>
            </Link>
        </div>
    )
}

export default VideoCard;
