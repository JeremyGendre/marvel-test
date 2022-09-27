import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Character} from "../models/Character";
import axios from "axios";
import {API_HASH, API_KEY, BASE_URL, TIMESTAMP} from "../config/config";

interface CharactersContextType {
    characters: Array<Character>;
    loading: boolean;
}

const CharactersContext = createContext<CharactersContextType>(undefined!);

export const useCharacters = () => useContext(CharactersContext);

export default function CharactersContextProvider({children}: PropsWithChildren<{}>){
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(BASE_URL + `/v1/public/characters`,{params: {apikey: API_KEY, hash: API_HASH, ts: TIMESTAMP, series: "24229"}})
            .then(({data}) => {
                setCharacters(data.data.results);
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    },[]);

    return (
        <CharactersContext.Provider value={{ characters, loading }}>
            {children}
        </CharactersContext.Provider>
    );
}
