import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Serie} from "../models/Serie";
import {request} from "../helpers/RequestHelper";

interface SeriesContextType {
    series: Array<Serie>;
    loading: boolean;
}

const SeriesContext = createContext<SeriesContextType>(undefined!);

export const useSeries = () => useContext(SeriesContext);

export default function SeriesContextProvider({children}: PropsWithChildren<{}>){
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request('/v1/public/series')
            .then(({data}) => {
                setSeries(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[]);

    return (
        <SeriesContext.Provider value={{ series, loading }}>
            {children}
        </SeriesContext.Provider>
    );
}
