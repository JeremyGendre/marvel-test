import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {Serie} from "../models/Serie";
import {getPaginationValues, request} from "../helpers/RequestHelper";
import {DEFAULT_PAGINATION, PaginationType} from "../models/Pagination";

interface SeriesContextType {
    series: Array<Serie>;
    loading: boolean;
    fetchSeries: (params?: object) => void,
    pagination: PaginationType,
    error: string|null
}

const SeriesContext = createContext<SeriesContextType>(undefined!);

export const useSeries = () => useContext(SeriesContext);

export default function SeriesContextProvider({children}: PropsWithChildren<{}>){
    const [series, setSeries] = useState([]);
    const [pagination, setPagination] = useState<PaginationType>(DEFAULT_PAGINATION);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // méthode qui va pouvoir être appelée notamment avec les offset et la limite pour la pagination
    const fetchSeries = useCallback((params: object = {}) => {
        setLoading(true);
        request('/v1/public/series',{...params})
            .then(({data}) => {
                // au fetch on récupère aussi les données de la pagination, pour l'update à l'affichage
                setPagination(getPaginationValues(data.data));
                setSeries(data.data.results);
            })
            .catch(error => { // on gère les erreurs
                setError(error.response.data ? error.response.data.status : error.message);
            })
            .finally(() => setLoading(false))
    },[]);

    return (
        <SeriesContext.Provider value={{ series, loading, pagination, fetchSeries, error }}>
            {children}
        </SeriesContext.Provider>
    );
}
