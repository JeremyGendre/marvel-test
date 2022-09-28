import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";
import PageTitle from "../PageTitle";
import Spinner from "../components/Spinner";
import List from "../components/List";
import Pagination from "../components/Pagination";
import usePagination from "../helpers/hooks/usePagination";
import {useEffect, useState} from "react";
import Input from "../components/Input";
import useDebounceValue from "../helpers/hooks/useDebounceValue";

export default function CharactersPage(){
    const { pagination, characters, loading, fetchCharacters } = useCharacters();
    const paginationInfos = usePagination();
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounceValue(searchValue);

    useEffect(() => {
        let params:any = {offset: (paginationInfos.page - 1) * paginationInfos.limit, limit: paginationInfos.limit};
        if(debouncedValue){
            params.nameStartsWith = debouncedValue;
        }
        fetchCharacters(params);
    },[paginationInfos.page, paginationInfos.limit, debouncedValue]);

    return (
        <div>
            <PageTitle>
                <div className="flex justify-between">
                    <div>Marvel characters</div>
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
            {loading ? (<Spinner text="Fetching characters"/>) : (
                <>
                    <List>
                        {characters.map(character => (
                            <Card
                                key={character.id}
                                name={character.name}
                                thumbnail={character.thumbnail}
                                to={`/characters/${character.id}`}
                                state={character}
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
