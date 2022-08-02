const SearchList = ({ streams }) => {
    return ( 
        <div>
            <div>
                <img className="w-20 rounded-full" src={streams.thumbnail_url} alt="" />
                <h4>{streams.display_name}</h4>
            </div>
        </div>
    )
}

export default SearchList;
