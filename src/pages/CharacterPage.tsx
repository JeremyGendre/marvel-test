import {Character} from "../models/Character";
import {PropsWithChildren, useEffect, useState} from "react";
import {useLocation, useParams } from "react-router-dom";
import {request} from "../helpers/RequestHelper";
import Spinner from "../components/Spinner";
import {getThumbnailPath} from "../helpers/ThumbnailHelper";

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
        <div className="mx-24">
            <div className="flex">
                <div className="rounded-full max-h-[15rem] max-w-[15rem] overflow-hidden">
                    <img src={getThumbnailPath(character.thumbnail)}/>
                </div>
                <div>
                    <table className="ml-8 text-left item-table text-xl">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{character.name}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{character.description ? character.description : (<NoValue>No description</NoValue>)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
                <div>
                    <div className="font-bold text-2xl">Comics</div>
                    <hr className="my-2 border-red-500"/>
                    <div>
                        <ul>
                            {character.comics.items.map(comic => (
                                <li key={comic.name}>
                                    {comic.name}
                                </li>
                            ))}
                            {character.series.items.length === 0 && (<NoValue>No associated comic</NoValue>)}
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="font-bold text-2xl">Series</div>
                    <hr className="my-2 border-red-500"/>
                    <div>
                        <ul>
                            {character.series.items.map(serie => (
                                <li key={serie.name}>
                                    {serie.name}
                                </li>
                            ))}
                            {character.series.items.length === 0 && (<NoValue>No associated serie</NoValue>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NoValue({children}: PropsWithChildren<{}>){
    return <span className="italic">{children}</span>;
}
