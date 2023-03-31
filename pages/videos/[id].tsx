import { NextPage } from "next";
import { useRouter } from "next/router";

const Videos: NextPage = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <iframe
            src={`https://player.twitch.tv/?video=${id}&parent=silly-manatee-cc57df.netlify.app`}
            width="100%"
            height="95%"
            allowFullScreen>
        </iframe>
    );
};

export default Videos;
