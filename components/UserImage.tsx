import { FC } from "react";
import Image from "next/image";

type UserImageProps = {
    imageUrl: string;
    user: string
    extraStyle: string
}
const images = [
    {
      src: "https://i.ibb.co/5MMtXQQ/masahiro-miyagi-t-Hz-Ai-Axe-GBo-unsplash.jpg",
      blurUrl: "mokjmin2kl/9j/4AAQSk…"
    }
  ]
  

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
                    blurDataURL={images[0].blurUrl}
                />
            }
        </>
    )
}

export default UserImage;