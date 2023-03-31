import { NextPage } from 'next';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
  ssr: false,
})

const Stream: NextPage = () => {
  const router = useRouter();
  const streamer = router.query.name as string;

    return (
		<ReactTwitchEmbedVideo 
			channel={streamer}
			allowfullscreen={true}
			height="100%" 
			width="100%"
		/>  
    );
};

export default Stream;
