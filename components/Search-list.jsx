const SearchList = ({ streams }) => {
    return ( 
        <div>
            <div className="flex flex-row text-white">
                <img className="w-20 rounded-full ml-20" src={streams.thumbnail_url} alt="" />
                <h4 className="ml-10">{streams.display_name}</h4>
                <div className="">
                    <h4>Lo último de {streams.display_name}</h4>
                    <h4>{streams.game_name}</h4>
                    <h4>{streams.title}</h4>
                </div>
            </div>
        </div>
    )
}

export default SearchList;
