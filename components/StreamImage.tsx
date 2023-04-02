import { FC } from 'react';
import Image from 'next/image'
import { RiRadioButtonLine } from "react-icons/ri";

import { viewersFormat } from '../utils/viewersFormat';

import { shimmer, toBase64 } from '../utils/shimmerImage';

type StreamImageProps = {
    thumbnailUrl: string;
    viewerCount: number;
}

const StreamImage: FC<StreamImageProps> = ({ thumbnailUrl, viewerCount }) => {

    return (
        <div className='relative font-roboto mx-1'> 
            <Image 
                className="hover:opacity-80 object-cover w-full h-full" 
                src={thumbnailUrl.slice(0, -21)+".jpg"} 
                alt="stream image"
                priority={true}
                width={562}
                height={316}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
            <p className="m-1 bg-red-600 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0 font-semibold">LIVE</p>
            <div className="flex flex-inline items-center text-white bg-black bg-opacity-60 absolute bottom-0 ml-2 mb-2">
                <RiRadioButtonLine className="text-red-500"/>
                <p className="xs:text-xs sm:text-sm">{viewersFormat(viewerCount)} viewers</p>
            </div>
        </div>
    );
}

export default StreamImage;