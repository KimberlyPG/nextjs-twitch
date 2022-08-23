import Image from 'next/image'

const StreamImage = ({ thumbnail_url }) => {

    return (
        <div> 
            <Image 
                className="hover:opacity-80" 
                src={thumbnail_url.slice(0, -21)+".jpg"} 
                layout="responsive"
                width='100%'
                height='55%'
            />
            <p className="m-1 bg-red-500 text-white w-10 h-4 text-xs rounded-md text-center absolute top-0">LIVE</p>
        </div>
    )
}

export default StreamImage;