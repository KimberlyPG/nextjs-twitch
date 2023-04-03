import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import useSWR from 'swr';

import VideoCard from '../../components/VideoCard';

import twitch from '../api/twitch';
import { UserData, Video } from '../../types/types';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
  })

type ProfileProps = {
    userData: UserData;
    userId: string;
}

const Profile: NextPage<ProfileProps> = ({ userData }) => {
    const router = useRouter();
    const state = router.query.state;
    const userId = router.query.name;

    const { data: video, error: followsError } = useSWR<Video[]>(`/videos?user_id=${userId}&first=6`);

    if(!video) return <div>Loading...</div>
    return (
        <>
            <ReactTwitchEmbedVideo 
                channel={userData.display_name}
                allowfullscreen={Boolean(state)}
                width="100%"
                height="450px"
                layout='video'
            /> 
            <div>
                {state === "true" &&
                    <div className='pl-3'>
                        <Link href={`/stream/${userData?.display_name}`}>
                            <p className='bg-red-600 text-center rounded-sm font-bold font-roboto p-1 hover:opacity-50 w-28 xs:text-sm lg:text-lg'>GO TO LIVE</p>
                        </Link>
                    </div>
                }
                <div className='flex flex-row items-center m-5'>
                    <Image 
                        className="rounded-full cursor-pointer" 
                        src={userData?.profile_image_url}
                        width={70}
                        height={70}
                        priority
                        alt="user image" 
                    /> 
                    <h3 className='pl-5'>{userData?.display_name}</h3>
                </div>
                {video.length > 0 && 
                    <div className='md:p-5'>              
                    <h1 className='py-3 text-lg font-semibold'>Recent streams</h1>
                        <div className='grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1'>
                            {state === "true" ? (
                                video.map((item) => (
                                    <VideoCard key={item.id} item={item} />  
                                ))
                            ):(
                                video.slice(0, 5).map((item) => (
                                    <VideoCard key={item.id} item={item} />  
                                )) 
                            )
                            }
                        </div>
                    </div>         
                }
            </div>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    const currentToken = session?.user.token;
    const userId = context.query.name;

    const res = await twitch.get(`/users?id=${userId}`,
        {
            headers: {
                "Authorization": `Bearer ${currentToken}`,
                "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
            }
        })
    const userData = await res.data.data[0];

    return { props: { userData } }
}

export default Profile;
