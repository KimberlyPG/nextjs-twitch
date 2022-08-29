import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

import Layout from '../components/Layout';
import VideoCard from '../components/Video-card';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
  })

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
    }, [currentToken, id]);
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
                    {state === 'true' &&
                        <div className='pl-3'>
                            <Link href={{pathname: '/stream', query:{streamer: (name) }}}>
                                <a className='text-white bg-red-600 rounded-sm font-bold font-roboto p-1 hover:opacity-50'>GO TO LIVE</a>
                            </Link>
                        </div>
                    }

                <div className='p-5 font-roboto'>
                <h1 className='py-3 text-lg font-semibold'>Recent streams</h1>
                    <div className='grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 space-x-3'>
                        {video &&
                        video.map((item) => (
                          <VideoCard key={item.id} item={item} />  
                        ))
                        }
                    </div>
                </div>         
            </div>
          </Layout>
        </div>
    )
}

export default Profile;