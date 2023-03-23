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
import { UserData, Video } from '../../types/types';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
  })

const Profile: NextPage = () => {
    const router = useRouter();
    const id = router.query.name as string;
    const state = router.query.state;

    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const [userData, setUserData] = useState<UserData>();
    const [video, setVideo] = useState<Video[]>([]);

    useEffect(() => {
        if(currentToken && id) {
            const getStreamerInfo = async() => {
                await twitch.get(`/users?id=${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    }
                })
                .then(res => setUserData(res.data.data[0]))
            };
            getStreamerInfo();
        }
    }, [currentToken, id]);

    useEffect(() => {
        if(currentToken && id) {
            const getVideos = async () => {
                await twitch.get(`/videos?user_id=${id}&first=5`,
                    {
                        headers: {
                            "Authorization": `Bearer ${currentToken}`,
                            "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                        }
                    }
                    ).then(res => setVideo(res?.data?.data));
                }
            getVideos();
        }
    }, [currentToken, id]);

    return (
        <div className='text-white font-roboto'>
            <Layout>
                {userData &&
                    <ReactTwitchEmbedVideo 
                        channel={userData.display_name}
                        allowfullscreen={Boolean(state)}
                        width="100%"
                        height="450px"
                        layout='video'
                    /> 
                }
                <div>
                    {state === "true" &&
                        <div className='pl-3'>
                            <Link href={`/stream/${userData?.display_name}`}>
                                <a className='bg-red-600 rounded-sm font-bold font-roboto p-1 hover:opacity-50'>GO TO LIVE</a>
                            </Link>
                        </div>
                    }
                    {userData &&
                        <div className='flex flex-row items-center m-5'>
                            <Image 
                                className="rounded-full cursor-pointer" 
                                src={userData?.profile_image_url}
                                width={70}
                                height={70}
                                alt="user image" 
                            /> 
                            <h3 className='pl-5'>{userData?.display_name}</h3>
                        </div>
                    }
                    {video && video.length > 0 &&
                        <div className='md:p-5'>              
                        <h1 className='py-3 text-lg font-semibold'>Recent streams</h1>
                            <div className='grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 space-x-3'>
                                {video && video.map((item) => (
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
