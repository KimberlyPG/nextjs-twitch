import React, {FC} from 'react'
import TopGamesItem from './TopGamesItem'
import { TopGameData } from '../types/types'

type TopGamesProps = {
  topGames: TopGameData[];
}

const TopGames: FC<TopGamesProps> = ({ topGames }) => {
  return (
    <div className="sm:pt-2 xs:pt-2">
        <h2 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">Top Games</h2> 
        <div className="grid 3xl:grid-cols-9 2xl:grid-cols-9 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-4">
            {topGames &&  topGames.map((games) => (
                <TopGamesItem key={games.id} games={games}/>
            ))}
        </div>
    </div>
  )
}

export default TopGames;