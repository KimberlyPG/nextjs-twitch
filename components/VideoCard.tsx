import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { viewersFormat } from "../utils/viewersFormat";
import { time } from "../utils/time";
import { days } from "../utils/days";
import { Video } from "../types/types";
import { shimmer, toBase64 } from "../utils/shimmerImage";

type VideoCardProps = {
    item: Video;
}
const VideoCard: FC<VideoCardProps> = ({ item }) => {
    return (
        <div className='cursor-pointer hover:opacity-80 mb-5 mx-1'>
            <Link href={`/videos/${item.id}`}>
                <div className="space-y-2">
                    <div className="relative">
                        <Image 
                            className="hover:opacity-80 object-contain w-full h-full" 
                            src={item.thumbnail_url.slice(0, -22)+"572x318.jpg"} 
                            alt="stream image"
                            priority={true}
                            width={570}
                            height={318}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        />
                        <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute top-0">{time(item.duration)}</p>
                        <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0">{viewersFormat(item.view_count)} views</p>
                        <p className="m-2 text-sm text-white bg-black bg-opacity-60 absolute bottom-0 right-0">{days(item.created_at, item.duration)}</p>
                    </div>
                    <p className='w-full truncate sm:text-sm xs:text-xs'>{item.title}</p>
                </div>
            </Link>
        </div>
    );
}

export default VideoCard;
