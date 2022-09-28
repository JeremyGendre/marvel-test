import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {Comic} from "../models/Comic";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, PaginationType} from "../models/Pagination";

interface ComicsContextType {
    comics: Array<Comic>;
    loading: boolean;
    fetchComics: (params?: object) => void,
    pagination: PaginationType
}

const ComicsContext = createContext<ComicsContextType>(undefined!);

export const useComics = () => useContext(ComicsContext);

export default function ComicsContextProvider({children}: PropsWithChildren<{}>){
    const [comics, setComics] = useState([]);
    const [pagination, setPagination] = useState<PaginationType>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchComics = useCallback((params: object = {}) => {
        setLoading(true);
        request('/v1/public/comics',{...params})
            .then(({data}) => {
                setPagination(getPaginationValues(data.data));
                setComics(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[]);

    return (
        <ComicsContext.Provider value={{ comics, loading, pagination, fetchComics }}>
            {children}
        </ComicsContext.Provider>
    );
}
