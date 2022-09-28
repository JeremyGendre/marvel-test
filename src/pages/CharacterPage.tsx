import {Character} from "../models/Character";
import {useEffect, useState} from "react";
import {useLocation, useParams } from "react-router-dom";
import {request} from "../helpers/RequestHelper";
import Spinner from "../components/Spinner";
import {getThumbnailPath} from "../helpers/ThumbnailHelper";
import ItemList, {NoValue} from "../components/ItemList";
import Error from "../components/Error";

export default function CharacterPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // id du personnage
    let { id } = useParams();

    // on récupère l'objet Character pour éviter, s'il existe, d'aller le fetch à l'API
    const {state} = useLocation();
    const [character, setCharacter] = useState<Character|undefined>(state);

    useEffect(() => {
        // si on a pas d'objet Character, on va le fetch avec l'ID dans l'url
        if(!character && !!id){
            setLoading(true);
            request(`/v1/public/characters/${id}`)
                .then(({data}) => {
                    if(data.data.results.length >= 1){
                        setCharacter(data.data.results[0]);
                    }
                })
                .catch(error => { // on gère les erreurs
                    setError(error.response.data ? error.response.data.status : error.message);
                })
                .finally(() => {setLoading(false)})
        }
    },[id, character]);

    // s'il y a une erreur on l'affiche
    if(error) return (<Error>{error}</Error>);

    if(!character || loading) return <Spinner text="Fetching character"/>;

    return (
        <div className="lg:mx-24">
            <div className="block lg:flex">
                <div className="overflow-hidden rounded-full max-h-[15rem] max-w-[15rem] mx-auto lg:mx-0">
                    <img alt={character.name} className="rounded-full aspect-square" src={getThumbnailPath(character.thumbnail)}/>
                </div>
                <div className="mt-4 lg:mt-0">
                    <table className="ml-8 text-left item-table text-xl">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{character.name}</td>
                        </tr>
                        <tr>
                            <th className="flex"><span className="mb-auto">Description</span></th>
                            <td>{character.description ? character.description : (<NoValue>No description</NoValue>)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
                <ItemList title={`Comics (${character.comics.items.length})`}>
                    <ul>
                        {character.comics.items.map((comic, index) => (
                            <li key={comic.name + index} className="mb-1">
                                {comic.name}
                            </li>
                        ))}
                        {character.series.items.length === 0 && (<NoValue>No associated comic</NoValue>)}
                    </ul>
                </ItemList>
                <ItemList title={`Series (${character.series.items.length})`}>
                    <ul>
                        {character.series.items.map((serie,index) => (
                            <li key={serie.name + index} className="mb-1">
                                {serie.name}
                            </li>
                        ))}
                        {character.series.items.length === 0 && (<NoValue>No associated serie</NoValue>)}
                    </ul>
                </ItemList>
            </div>
        </div>
    );
}
