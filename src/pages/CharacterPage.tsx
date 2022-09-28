import {Character} from "../models/Character";
import {useEffect, useState} from "react";
import {useLocation, useParams } from "react-router-dom";
import {request} from "../helpers/RequestHelper";
import Spinner from "../components/Spinner";

export default function CharacterPage(){
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const {state} = useLocation();
    const [character, setCharacter] = useState<Character|undefined>(state);

    useEffect(() => {
        if(!character && !!id){
            setLoading(true);
            request(`/v1/public/characters/${id}`)
                .then(({data}) => {
                    console.log(data);
                    if(data.data.results.length >= 1){
                        setCharacter(data.data.results[0]);
                    }
                })
                .catch(console.error)
                .finally(() => {setLoading(false)})
        }
    },[id, character]);

    if(!character || loading) return <Spinner text="Fetching character"/>;
    return (
        <div>
            {character.name}
            <div>
                {character.description}
            </div>
        </div>
    );
}
