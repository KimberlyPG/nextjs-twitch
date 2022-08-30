import { useRouter } from "next/router";

const videos = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <iframe
                src={`https://player.twitch.tv/?video=${id}&parent=silly-manatee-cc57df.netlify.app`}
                width="100%"
                height="100%"
                allowFullScreen>
            </iframe>
        </div>
    )
}