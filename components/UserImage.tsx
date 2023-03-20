import { FC } from "react";

type UserImageProps = {
    imageUrl: string | undefined;
    user: string
    extraStyle: string
}

const UserImage: FC<UserImageProps> = ({ imageUrl, user, extraStyle }) => {
    return (
        <img 
            className={`rounded-full ${extraStyle}`}
            src={imageUrl} 
            alt={`${user} profile image`} 
        />
    )
}

export default UserImage;