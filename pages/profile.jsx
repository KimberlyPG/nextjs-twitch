import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

import Layout from '../components/Layout';

const Profile = () => {
    const router = useRouter();
    const name = router.query.name;
    const id = router.query.id;
    const state = router.query.state;

    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [video, setVideo] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/videos?user_id=${id}&first=5`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());

                setVideo(information.data);
            }
            }
        getVideos();
    }, [id]);
    console.log("videos: ", video);

    return (
        <div className='text-white'>
            <Layout>
                <ReactTwitchEmbedVideo 
                    channel={name}
                    allowfullscreen={state}
                    width="100%"
                    height="450px"
                />  
           
                <div>
                    {state &&
                        <div className='pl-3'>
                            <Link href={{pathname: '/stream', query:{streamer: (name) }}}>
                                <a className='text-white bg-red-600 rounded-sm font-bold font-roboto p-1 hover:opacity-50'>GO TO LIVE</a>
                            </Link>
                        </div>
                    }
                    <h1 className='pt-8'>Recent streams</h1>
                    <div className='flex pr-10'>
                        {video &&
                        video.map((item) => (
                            <div className='cursor-pointer hover:opacity-80'>
                                <img src={item.thumbnail_url.slice(0, -22)+"450x250.jpg"} alt="" />
                                <h1 className='w-80 truncate'>{item.title}</h1>
                                {/* <iframe
                                    src={`https://player.twitch.tv/?${item.url}&parent=localhost:3000/profile`}
                                    height="<height>"
                                    width="<width>"
                                    allowfullscreen>
                                </iframe> */}
                            </div>
                        ))
                        }
                </div>
            </div>
          </Layout>
        </div>
    )
}

export default Profile;