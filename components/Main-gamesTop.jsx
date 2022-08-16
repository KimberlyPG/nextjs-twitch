import Link from "next/link";

const MainGamesTop = ({ games }) => {
    return (
        <Link href={{pathname: '/game', query:{game: (games.id) }}}>
             <div className="cursor-pointer place-items-center pl-20">
                <img className="w-52 hover:w-56 ease-in duration-200 hover:opacity-80" src={games.box_art_url.slice(0, -21)+".jpg"} alt="" />
                <h4 className="w-80 truncate text-white text-sm">{games.name}</h4>
            </div>
        </Link>
    )
}

export default MainGamesTop;