import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
  ssr: false,
})

const Stream = () => {
  const router = useRouter();
  const streamer = router.query.streamer;

  console.log(router.query);
    return (
          <Layout>
            <ReactTwitchEmbedVideo 
              channel={streamer}
              allowfullscreen={true}
              height="100%" width="100%" 
              />  
          </Layout>
    )
}

export default Stream;