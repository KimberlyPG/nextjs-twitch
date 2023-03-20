import { NextPage } from "next";
import SearchList from "../../components/SearchList";
import Layout from '../../components/Layout';

import { useAppSelector } from "../../store/hooks";
import { selectSearch } from "../../store/slices/searchSlice/searchSlice";
import { SearchChannels } from "../../types/types";

const Search: NextPage = () => {
    const results = useAppSelector(selectSearch);

    return (
        <Layout>
            <div className="pt-10 font-roboto">
                {results?.map((streams: SearchChannels) => (
                    <SearchList key={streams.id} streams={streams}/>
                ))}
            </div>
        </Layout>
    );
};

export default Search;
