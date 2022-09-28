import {useCharacters} from "../context/CharactersContext";
import usePagination from "../helpers/hooks/usePagination";
import {useEffect} from "react";
import PageTitle from "../PageTitle";
import Spinner from "../components/Spinner";
import List from "../components/List";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import {useComics} from "../context/ComicsContext";

export default function ComicsPage(){
    const { pagination, comics, loading, fetchComics } = useComics();
    const paginationInfos = usePagination();

    useEffect(() => {
        fetchComics({offset: (paginationInfos.page - 1) * paginationInfos.limit, limit: paginationInfos.limit});
    },[paginationInfos.page, paginationInfos.limit]);

    return (
        <div>
            <PageTitle>All Marvel comics</PageTitle>
            {loading ? (<Spinner text="Fetching Comics"/>) : (
                <>
                    <List>
                        {comics.map(comic => (
                            <Card key={comic.id} name={comic.title} thumbnail={comic.thumbnail} link="/"/>
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
