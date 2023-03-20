import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import SearchList from "../../components/SearchList";
import Layout from '../../components/Layout';

import twitch from "../api/twitch";
import { SearchChannels } from "../../types/types";

const Search: NextPage = () => {
    const { data: session, status } = useSession();
    const currentToken = session?.user.token;

    const router = useRouter();
    const userName = router?.query?.name;

    const [results, setResults] = useState([]);

    useEffect(() => {
        const searchUsers = async() => {
            await twitch.get(`/search/channels?query=${userName}&first=8`,
            {
                headers: {
                    "Authorization": `Bearer ${currentToken}`,
                    "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                }
            })
            .then((data) => setResults(data.data.data)) 
        }
        searchUsers();
    }, [userName, currentToken])

    return (
        <Layout>
            <div className="pt-10 font-roboto">
                {results && results?.map((streams: SearchChannels) => (
                    <SearchList key={streams.id} streams={streams}/>
                ))}
            </div>
        </Layout>
    );
};

export default Search;
