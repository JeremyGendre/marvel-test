import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {Character} from "../models/Character";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, PaginationType} from "../models/Pagination";

interface CharactersContextType {
    characters: Array<Character>;
    loading: boolean;
    fetchCharacters: (params?: object) => void,
    pagination: PaginationType
}

const CharactersContext = createContext<CharactersContextType>(undefined!);

export const useCharacters = () => useContext(CharactersContext);

export default function CharactersContextProvider({children}: PropsWithChildren<{}>){
    const [characters, setCharacters] = useState([]);
    const [pagination, setPagination] = useState<PaginationType>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchCharacters = useCallback((params: object = {}) => {
        setLoading(true);
        request('/v1/public/characters',{...params})
            .then(({data}) => {
                setPagination(getPaginationValues(data.data));
                setCharacters(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[]);

    return (
        <CharactersContext.Provider value={{ characters, loading, fetchCharacters, pagination }}>
            {children}
        </CharactersContext.Provider>
    );
}
