const Game = () => {

    useEffect(() => {
        gamesTop.map((game) => {
        const getChannels = async () => {
            if(currentToken) {
                const information = await fetch(`https://api.twitch.tv/helix/streams?game_id=${game.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`,
                        "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
                    }
                }
                ).then(res => res.json());

                setChannel(information.data);
            }
            }
        getChannels();
        })
    }, [gamesTop]);
    console.log("channel", channel);
    
    return (
        <div>

        </div>
    )
}

return Game;