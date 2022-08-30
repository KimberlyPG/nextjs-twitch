import { useRouter } from "next/router";

import Layout from '../components/Layout';

const Videos = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <Layout>
                <div className="flex flex-row w-full h-full">
                    {/* <div className="left-0"> */}
                        <iframe
                            src={`https://player.twitch.tv/?video=${id}&parent=silly-manatee-cc57df.netlify.app`}
                            width="80%"
                            height="100%"
                            allowFullScreen>
                        </iframe>
                    {/* </div> */}
                    {/* <div className="right-0"> */}
                        <iframe src="https://www.twitch.tv/embed/<channel>/chat?parent=<parent>"
                            width="20%"
                            height="100%">
                        </iframe>
                    {/* </div> */}
                </div>
            </Layout>
        </div>
    )
}

export default Videos;