import { getSession, useSession } from "next-auth/react";
import { NextPage, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from 'swr';

import Layout from '../../components/Layout';
import GameCards from "../../components/GameCard";

import twitch from "../api/twitch";
import { GameData, LiveStreamsData } from "../../types/types";
import { shimmer, toBase64 } from "../../utils/shimmerImage";
import useFetcher from "../../hooks/useFetcher";

type GameProps = {
    game: GameData;
    gameId: string;
}

const Game: NextPage<GameProps> = ({ game }) => {
    const fetcher = useFetcher();
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const gameId = router.query.id;
 
    const { data: channel, error: followsError } = useSWR<LiveStreamsData[], Error>(`/streams?game_id=${gameId}&first=15`, fetcher, {refreshInterval: 120000});

    if(!channel) return <div>Loading...</div>
    return (
        <Layout>
            <div className="text-white font-roboto sm:p-5">
                <div className="flex relative items-center my-10 m-10">
                    <Image
                        className="bg-purple-500 shadow-lg shadow-purple-500/50 object-contain lg:h-56 md:h-44 xs:h-36 w-fit" 
                        src={game.box_art_url.split("-{width}x{height}").join('')} 
                        alt={`${game.name} image`} 
                        width={168}
                        height={224}
                        priority={true}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                    <h1 className="lg:text-4xl md:text-2xl sm:text-xl ml-5 w-full">{game.name}</h1>                        
                </div>

                <h2 className="text-sm my-5 font-semibold">Live channels we think you will like</h2>
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                    {channel && channel.map((streamer) => (
                        <GameCards key={streamer.id} streamer={streamer} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
    const currentToken = session?.user.token;
    const gameId = context.query.id;

    const res = await twitch.get(`/games?id=${gameId}`,
        {
            headers: {
                "Authorization": `Bearer ${currentToken}`,
                "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
            }
        })
    const game = await res.data.data[0];

    return { props: { game } }
}

export default Game;
