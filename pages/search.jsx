import SearchList from "../components/Search-list";
import Layout from '../components/Layout';

import { useAppSelector } from "../store/hooks";

import { selectSearch } from "../store/slices/searchSlice/searchSlice";

const Search = () => {
    const results = useAppSelector(selectSearch);

    return (
        <div className="bg-black">
            <Layout>
                <div className="pt-10">
                    {results?.map((streams) => (
                            <SearchList key={streams.id} streams={streams}/>
                        ))}
                </div>
            </Layout>
        </div>
    )
}

export default Search;
