import { useRouter } from "next/router";

import Layout from '../components/Layout';

const Videos = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <Layout>
                <iframe
                    src={`https://player.twitch.tv/?video=${id}&parent=silly-manatee-cc57df.netlify.app`}
                    width="100%"
                    height="95%"
                    allowFullScreen>
                </iframe>
            </Layout>
        </div>
    )
}

export default Videos;
