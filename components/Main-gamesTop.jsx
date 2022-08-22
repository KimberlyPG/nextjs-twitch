import Link from "next/link";

const MainGamesTop = ({ games }) => {
    return (
        <Link href={{pathname: '/game', query:{id: (games.id), image: (games.box_art_url), name:(games.name) }}}>
             <div className="cursor-pointer mb-5">
                <img className="3xl:w-44 2xl:w-52 xl:w-40 lg:w-40 md:w-40 hover:w-56 xs:w-10 ease-in duration-200 hover:opacity-80" src={games.box_art_url.slice(0, -21)+".jpg"} alt="" />
                <h4 className="3xl:w-80 2xl:w-80 xl:w-40 truncate text-white text-sm">{games.name}</h4>
            </div>
        </Link>
    )
}

export default MainGamesTop;