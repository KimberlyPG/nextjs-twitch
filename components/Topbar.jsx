

const Topbar = ({ handleChange, handleSubmit}) => { 

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <input 
                    type="search"
                    onChange={handleChange} 
                />
                <button type="submit">Search</button>
            </form>   
        </div>
    )
}

export default Topbar;