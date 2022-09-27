import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Comic} from "../models/Comic";
import {request} from "../helpers/RequestHelper";

interface ComicsContextType {
    comics: Array<Comic>;
    loading: boolean;
}

const ComicsContext = createContext<ComicsContextType>(undefined!);

export const useComics = () => useContext(ComicsContext);

export default function ComicsContextProvider({children}: PropsWithChildren<{}>){
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request('/v1/public/comics')
            .then(({data}) => {
                setComics(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[]);

    return (
        <ComicsContext.Provider value={{ comics, loading }}>
            {children}
        </ComicsContext.Provider>
    );
}
