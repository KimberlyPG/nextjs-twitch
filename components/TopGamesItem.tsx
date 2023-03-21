import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TopGameData } from "../types/types";

type TopGamesItem = {
    games: TopGameData;
}

const TopGamesItem: FC<TopGamesItem> = ({ games }) => {
    return (
        <Link href={`/game/${games.id}`}>
            <div className="relative cursor-pointer mb-5 mx-1">
                <Image 
                    className="hover:w-56 ease-in duration-200 hover:opacity-80 h-full w-full" 
                    src={games.box_art_url.slice(0, -21)+".jpg"}
                    alt={`${games.name} image`}
                    width={200}
                    height={260}
                />
                <h4 className="w-full truncate text-white sm:text-sm xs:text-xs bottom-0">{games.name}</h4>
            </div>
        </Link>
    )
}

export default TopGamesItem;