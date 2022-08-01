import { useState } from "react";
import axios from "axios";

const Topbar = () => { 
    const [name, setName] = useState("");
    const [result, setResults] = useState({});
    const currentToken = '0wisqs0ppodnca2xqjk15fxrzo86do';

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.twitch.tv/helix/search/channels?query=${name}&first=8`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": 'vg45al0z1c3d2awrv8zqh1rxx9pqwq',
                }
            }
        ).then((data) => {
            setResults(data.data.data);
        })
    }
    console.log("RESULTS: ", result);

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    return (
        <div>
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