import Image from "next/image";

const VideoCard = ({ item }) => {
    return (
        <div className='cursor-pointer hover:opacity-80'>
            <img src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} alt="" />
            {/* <Image 
                src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} 
                alt="video image"
                layout="intrinsic"
                height="250px"
                width="450px"
            /> */}
            <h1 className='w-full text-sm truncate'>{item.title}</h1>
            {/* <iframe
                src={`https://player.twitch.tv/?${item.url}&parent=localhost:3000/profile`}
                height="<height>"
                width="<width>"
                allowfullscreen>
            </iframe> */}
        </div>
    )
}

export default VideoCard;
