import { getSession } from "next-auth/react";
import { NextPage, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

import GameCards from "../../components/GameCard";
import GameSkeleton from "../../components/GameSkeleton";
import ChannelsScroll from "../../components/ChannelsScroll";

import twitch from "../api/twitch";
import usePaginationFetcher from "../../hooks/usePaginationFetcher";
import { GameData, LiveStreamsData, StreamersData } from "../../types/types";

type GameProps = {
    game: GameData;
    gameId: string;
}

const Game: NextPage<GameProps> = ({ game }) => {
    const router = useRouter();
    const fetcher = usePaginationFetcher();
    const gameId = router.query.id;
 
    const getKey = (pageIndex: number, previousPageData: StreamersData) => {
        if(pageIndex == 0) {
            return `/streams?game_id=${gameId}&first=15`
        }
        if (previousPageData && previousPageData?.pagination?.cursor) {
            return `/streams?game_id=${gameId}&first=10&after=${previousPageData.pagination.cursor}`
        } 
    }
    
    const changeSize = () => {
        setSize(size + 1);
    }

    const { data: gameChannels, size, setSize, isLoading } = useSWRInfinite(getKey , fetcher, {refreshInterval: 20000});
    
    const isReachedEnd = gameChannels &&  !gameChannels[gameChannels.length -1]?.pagination?.cursor;

    const gameChannelsArray: LiveStreamsData[][] =  [];
    gameChannels?.forEach((el) => gameChannelsArray.push(el.data));
    const gameChannelsList = gameChannelsArray.flat();

    if(!gameChannels) return <GameSkeleton />
    return (
        <div id="scrollableDiv" className='h-full overflow-y-scroll scrollbar-hide md:m-5'>
            <div className="flex relative items-center my-10 m-10">
                <Image
                    className="bg-purple-500 shadow-lg shadow-purple-500/50 object-contain lg:h-56 md:h-44 xs:h-36 w-fit" 
                    src={game.box_art_url.split("-{width}x{height}").join('')} 
                    alt={`${game.name} image`} 
                    width={168}
                    height={224}
                    priority={true}
                />
                <h1 className="lg:text-4xl md:text-2xl sm:text-xl ml-5 w-full">{game.name}</h1>                        
            </div>

            <h2 className="text-sm my-5 font-semibold">Live channels we think you will like</h2>
            {gameChannels &&
                <ChannelsScroll 
                    channelsList={gameChannelsList} 
                    channels={gameChannels} 
                    isReachedEnd={isReachedEnd} 
                    changeSize={changeSize} 
                    page="game"
                />
            }
        </div>
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
