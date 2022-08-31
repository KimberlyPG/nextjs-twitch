import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Layout from '../components/Layout';

const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
  ssr: false,
})

const Stream = () => {
  const router = useRouter();
  const streamer = router.query.streamer;
  const id = router.query.id;

  const { data: session, status } = useSession();

  const currentToken = session?.user.token;

  const [song, setSong] = useState("");

    // const getSong = async () => {
    //     if(currentToken) {
    //         const information = await fetch(`https://api.twitch.tv/helix/soundtrack/current_track?broadcaster_id=${id}`,
    //         {
    //             headers: {
    //                 "Authorization": `Bearer ${currentToken}`,
    //                 "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
    //             }
    //         }
    //         ).then(res => res.json());

    //         setSong(information);
    //     }
    //     console.log("current song:", song);
    //   }

  console.log(router.query);
    return (
          <Layout>
            {/* <div>
              <button onClick={getSong} className="bg-red bottom-0 text-white">SONG</button>
            </div> */}
            <ReactTwitchEmbedVideo 
              channel={streamer}
              allowfullscreen={true}
              height="100%" 
              width="100%"
              // time="string"
              />  
          </Layout>
    )
}

export default Stream;