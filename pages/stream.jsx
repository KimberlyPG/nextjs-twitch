import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Stream = () => {
  const router = useRouter();
  const streamer = router.query.streamer;
  
  console.log(router.query);
    return (
        <div className="bg-black">
          <Layout>
            <ReactTwitchEmbedVideo 
              channel={streamer}
              allowfullscreen={true}
              height="100%" width="100%" 
              />  
          </Layout>
        </div>
    )
}

export default Stream;