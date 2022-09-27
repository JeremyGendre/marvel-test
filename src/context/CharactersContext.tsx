import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Character} from "../models/Character";
import {request} from "../helpers/RequestHelper";

interface CharactersContextType {
    characters: Array<Character>;
    loading: boolean;
}

const CharactersContext = createContext<CharactersContextType>(undefined!);

export const useCharacters = () => useContext(CharactersContext);

export default function CharactersContextProvider({children}: PropsWithChildren<{}>){
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    //..., series: "24229" pour les avengers ;)
    useEffect(() => {
        request('/v1/public/characters')
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
