import SearchList from "../components/SearchList";
import Layout from '../components/Layout';

import { useAppSelector } from "../store/hooks";

import { selectSearch } from "../store/slices/searchSlice/searchSlice";

const Search = () => {
    const results = useAppSelector(selectSearch);

    return (
        <Layout>
            <div className="pt-10 font-roboto">
                {results?.map((streams) => (
                        <SearchList key={streams.id} streams={streams}/>
                    ))}
            </div>
        </Layout>
    );
};

export default Search;
