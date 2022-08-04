import ReactTwitchEmbedVideo from "react-twitch-embed-video"
import { useRouter } from 'next/router'

const Stream = () => {
  // const { streamer } = getQueryParams(window.location.search);
  const router = useRouter()
  const streamer = router.query.streamer;
  
  console.log(router.query);
    return (
        <div>
          <ReactTwitchEmbedVideo 
            channel={streamer}
            allowfullscreen={true}
            width="100%"
             />  
        </div>
    )
}

export default Stream;