import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Character} from "../models/Character";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, Pagination} from "../models/Pagination";

interface CharactersContextType {
    characters: Array<Character>;
    loading: boolean;
    fetchCharacters: (params?: object) => void,
    pagination: Pagination
}

const CharactersContext = createContext<CharactersContextType>(undefined!);

export const useCharacters = () => useContext(CharactersContext);

export default function CharactersContextProvider({children}: PropsWithChildren<{}>){
    const [characters, setCharacters] = useState([]);
    const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);

    // ajouter un param series: "24229" pour avoir uniquement les characters présents dans les avengers ;)
    useEffect(() => {
        fetchCharacters();
    },[]);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchCharacters = (params: object = {}) => {
        request('/v1/public/characters',{...params})
            .then(({data}) => {
                setPagination(getPaginationValues(data.data));
                setCharacters(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    };

    return (
        <CharactersContext.Provider value={{ characters, loading, fetchCharacters, pagination }}>
            {children}
        </CharactersContext.Provider>
    );
}
