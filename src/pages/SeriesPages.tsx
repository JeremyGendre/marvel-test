import {useCharacters} from "../context/CharactersContext";
import usePagination from "../helpers/hooks/usePagination";
import {useEffect} from "react";
import PageTitle from "../PageTitle";
import Spinner from "../components/Spinner";
import List from "../components/List";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import {useSeries} from "../context/SeriesContext";

export default function SeriesPage(){
    const { pagination, series, loading, fetchSeries } = useSeries();
    const paginationInfos = usePagination();

    useEffect(() => {
        fetchSeries({offset: (paginationInfos.page - 1) * paginationInfos.limit, limit: paginationInfos.limit});
    },[paginationInfos.page, paginationInfos.limit]);

    return (
        <div>
            <PageTitle>Marvel series</PageTitle>
            {loading ? (<Spinner text="Fetching series"/>) : (
                <>
                    <List>
                        {series.map(serie => (
                            <Card key={serie.id} name={serie.title} thumbnail={serie.thumbnail} to="/"/>
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
