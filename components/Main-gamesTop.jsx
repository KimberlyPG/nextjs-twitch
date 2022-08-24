import Link from "next/link";

const MainGamesTop = ({ games }) => {
    return (
        <Link href={{pathname: '/game', query:{id: (games.id), image: (games.box_art_url), name:(games.name) }}}>
            <div className="cursor-pointer mb-5 mx-1">
                <img className="w-full hover:w-56 ease-in duration-200 hover:opacity-80" src={games.box_art_url.slice(0, -21)+".jpg"} alt="" />
                <h4 className="w-full truncate text-white text-sm">{games.name}</h4>
            </div>
        </Link>
    )
}

export default MainGamesTop;