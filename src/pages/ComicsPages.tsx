import usePagination from "../helpers/hooks/usePagination";
import {useEffect, useState} from "react";
import PageTitle from "../components/PageTitle";
import Spinner from "../components/Spinner";
import List from "../components/List";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import {useComics} from "../context/ComicsContext";
import useDebounceValue from "../helpers/hooks/useDebounceValue";
import Input from "../components/Input";
import Error from "../components/Error";

export default function ComicsPage(){
    const { pagination, comics, loading, fetchComics, error } = useComics();
    const paginationInfos = usePagination();
    const [searchValue, setSearchValue] = useState('');

    //on debounce la valeur pour faire le moins d'appels à l'API possible
    const debouncedValue = useDebounceValue(searchValue);

    useEffect(() => {
        let params:any = {offset: (paginationInfos.page - 1) * paginationInfos.limit, limit: paginationInfos.limit};
        if(debouncedValue){// si ya une valeur rentrée, on l'ajoute aux params de recherche
            params.titleStartsWith = debouncedValue;
        }
        fetchComics(params);
    },[paginationInfos.page, paginationInfos.limit, debouncedValue]);

    // on gère les erreurs
    if(error) return (<Error>{error}</Error>);

    return (
        <div>
            <PageTitle>
                <div className="flex justify-between">
                    <div>Marvel comics</div>
                    <div>
                        <Input
                            className="text-lg"
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </PageTitle>
            {loading ? (<Spinner text="Fetching Comics"/>) : (
                <>
                    <List>
                        {comics.map(comic => (
                            <Card
                                key={comic.id}
                                name={comic.title}
                                thumbnail={comic.thumbnail}
                                to={`/comics/${comic.id}`}
                                state={comic}
                            />
                        ))}
                    </List>
                    {pagination && (
                        <div className="flex w-full">
                            <Pagination
                                pagination={pagination}
                                onFirst={() => {paginationInfos.updatePagination(1)}}
                                onPrevious={() => {paginationInfos.updatePagination(paginationInfos.page - 1)}}
                                onNext={() => {paginationInfos.updatePagination(paginationInfos.page + 1)}}
                                onLast={() => {paginationInfos.updatePagination(pagination.max)}}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
