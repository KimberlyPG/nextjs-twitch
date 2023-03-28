import { FC } from "react";
import Image from "next/image";

import { shimmer, toBase64 } from "../utils/shimmerImage";

type UserImageProps = {
    imageUrl: string;
    user: string
    extraStyle: string
}

const UserImage: FC<UserImageProps> = ({ imageUrl, user, extraStyle }) => {
    return (
        <>
            {imageUrl &&
                <Image 
                    className={`rounded-full ${extraStyle}`}
                    src={imageUrl} 
                    alt={`${user} profile image`} 
                    width={50}
                    height={50}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                />
            }
        </>
    )
}

export default UserImage;