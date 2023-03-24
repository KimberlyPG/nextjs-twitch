import { FC } from "react";
import Image from "next/image";

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
                />
            }
        </>
    )
}

export default UserImage;