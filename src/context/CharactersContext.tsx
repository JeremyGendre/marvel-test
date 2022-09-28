import {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";
import {Character} from "../models/Character";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, PaginationType} from "../models/Pagination";

interface CharactersContextType {
    characters: Array<Character>;
    loading: boolean;
    fetchCharacters: (params?: object) => void,
    pagination: PaginationType,
    error: string|null
}

const CharactersContext = createContext<CharactersContextType>(undefined!);

export const useCharacters = () => useContext(CharactersContext);

export default function CharactersContextProvider({children}: PropsWithChildren<{}>){
    const [characters, setCharacters] = useState([]);
    const [pagination, setPagination] = useState<PaginationType>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchCharacters = useCallback((params: object = {}) => {
        setLoading(true);
        setError(null);
        request('/v1/public/characters',{...params})
            .then(({data}) => {
                // au fetch on récupère aussi les données de la pagination, pour l'update à l'affichage
                setPagination(getPaginationValues(data.data));
                setCharacters(data.data.results);
            })
            .catch(error => { // on gère les erreurs
                setError(error.response.data ? error.response.data.status : error.message);
            })
            .finally(() => setLoading(false))
    },[]);

    return (
        <CharactersContext.Provider value={{ characters, loading, fetchCharacters, pagination, error }}>
            {children}
        </CharactersContext.Provider>
    );
}
