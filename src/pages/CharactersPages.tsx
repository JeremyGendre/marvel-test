import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";
import PageTitle from "../PageTitle";
import Spinner from "../components/Spinner";
import List from "../components/List";
import Pagination from "../components/Pagination";
import usePagination from "../helpers/hooks/usePagination";
import {useEffect} from "react";

export default function CharactersPage(){
    const { pagination, characters, loading, fetchCharacters } = useCharacters();
    const paginationInfos = usePagination();

    useEffect(() => {
        fetchCharacters({offset: (paginationInfos.page - 1) * paginationInfos.limit, limit: paginationInfos.limit});
    },[paginationInfos.page, paginationInfos.limit]);

    return (
        <div>
            <PageTitle>All Marvel characters</PageTitle>
            {loading ? (<Spinner text="Fetching characters"/>) : (
                <>
                    <List>
                        {characters.map(character => (
                            <Card key={character.id} name={character.name} thumbnail={character.thumbnail} link="/"/>
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
