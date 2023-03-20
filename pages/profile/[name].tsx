import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import Image from 'next/image';

import Layout from '../../components/Layout';
import VideoCard from '../../components/VideoCard';

import twitch from '../api/twitch';
import { Video } from '../../types/types';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
  })

const Profile: NextPage = () => {
    const router = useRouter();
    const name = router.query.name as string;
    const id = router.query.id;
    const image = router.query.image;
    const state = router.query.state;

    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [video, setVideo] = useState<Video[]>([]);

    useEffect(() => {
        const getVideos = async () => {
            if(currentToken) {
                await twitch.get(`https://api.twitch.tv/helix/videos?user_id=${id}&first=5`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                }
                ).then(res => setVideo(res.data.data));
            }
        }
        getVideos();
    }, [currentToken, id]);

    return (
        <div className='text-white font-roboto'>
            <Layout>
                <ReactTwitchEmbedVideo 
                    channel={name}
                    allowfullscreen={state}
                    width="100%"
                    height="450px"
                    layout='video'
                /> 
                <div>
                    {state === "true" &&
                        <div className='pl-3'>
                            <Link href={`/stream/${name}`}>
                                <a className='bg-red-600 rounded-sm font-bold font-roboto p-1 hover:opacity-50'>GO TO LIVE</a>
                            </Link>
                        </div>
                    }

                    <div className='flex flex-row items-center m-5'>
                        <Image 
                            className="rounded-full cursor-pointer" 
                            src={image}
                            layout="fixed"
                            width="70rem"
                            height="70rem"
                            alt="user image" 
                        /> 
                        <h3 className='pl-5'>{name}</h3>
                    </div>

                    {video.length > 0 &&
                        <div className='md:p-5'>              
                        <h1 className='py-3 text-lg font-semibold'>Recent streams</h1>
                            <div className='grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 space-x-3'>
                                {video.map((item) => (
                                    <VideoCard key={item.id} item={item} />  
                                ))
                                }
                            </div>
                        </div>         
                    }
                </div>
          </Layout>
        </div>
    );
};

export default Profile;
