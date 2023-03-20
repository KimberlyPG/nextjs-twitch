import { FC } from 'react';
import Image from 'next/image'
import { RiRadioButtonLine } from "react-icons/ri";

import { viewersFormat } from '../utils/viewersFormat';

type StreamImageProps = {
    thumbnailUrl: string;
    viewerCount: number;
}

const StreamImage: FC<StreamImageProps> = ({ thumbnailUrl, viewerCount }) => {

    return (
        <div className='relative font-roboto'> 
            <Image 
                className="hover:opacity-80" 
                src={thumbnailUrl.slice(0, -21)+".jpg"} 
                alt="stream image"
                layout="responsive"
                objectFit="contain"
                width='100%'
                height='55%'
            />
            <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0">LIVE</p>
            <div className="flex flex-inline items-center text-white bg-black bg-opacity-60 absolute bottom-0 ml-2 mb-2">
                <RiRadioButtonLine className="text-red-500"/>
                <h4 className="xs:text-xs sm:text-sm">{viewersFormat(viewerCount)} viewers</h4>
            </div>
        </div>
    )
}

export default StreamImage;