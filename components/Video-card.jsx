import Link from "next/link";
import Image from "next/image";

import { viewersformat } from "../utils/viewers-format";
import { time } from "../utils/time";
import { days } from "../utils/days";

const VideoCard = ({ item }) => {
    return (
        <div className='cursor-pointer hover:opacity-80 mb-5'>
            <Link href={{pathname: '/videos', query:{id: (item.id) }}}>
                <div>
                    <div className="relative">
                        <img src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} alt="" />
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute top-0">{time(item.duration)}</p>
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0">{viewersformat(item.view_count)} views</p>
                    <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0 right-0">{days(item.created_at, item.duration)}</p>
                    </div>
                    <h1 className='xs:w-64 md:w-full truncate sm:text-sm xs:text-xs'>{item.title}</h1>
                </div>
            </Link>
        </div>
    )
}

export default VideoCard;
