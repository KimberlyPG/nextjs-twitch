import Image from "next/image";

const UserImage = ({ imageUrl }) => {
    return (
        <div>
            <Image 
                className="rounded-full"
                src={imageUrl}
                alt="User image"
                // layout="fill"
                // height="100px"
                // width="100px"
            />
        </div>
    )
}

export default UserImage;