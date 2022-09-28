import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {Comic} from "../models/Comic";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, PaginationType} from "../models/Pagination";

interface ComicsContextType {
    comics: Array<Comic>;
    loading: boolean;
    fetchComics: (params?: object) => void,
    pagination: PaginationType,
    error: string|null
}

const ComicsContext = createContext<ComicsContextType>(undefined!);

export const useComics = () => useContext(ComicsContext);

export default function ComicsContextProvider({children}: PropsWithChildren<{}>){
    const [comics, setComics] = useState([]);
    const [pagination, setPagination] = useState<PaginationType>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchComics = useCallback((params: object = {}) => {
        setLoading(true);
        request('/v1/public/comics',{...params})
            .then(({data}) => {
                // au fetch on récupère aussi les données de la pagination, pour l'update à l'affichage
                setPagination(getPaginationValues(data.data));
                setComics(data.data.results);
            })
            .catch(error => { // on gère les erreurs
                setError(error.response.data ? error.response.data.status : error.message);
            })
            .finally(() => setLoading(false))
    },[]);

    return (
        <ComicsContext.Provider value={{ comics, loading, pagination, fetchComics, error }}>
            {children}
        </ComicsContext.Provider>
    );
}
