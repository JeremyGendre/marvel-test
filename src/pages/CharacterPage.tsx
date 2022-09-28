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
        <div className="lg:mx-24">
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="overflow-hidden rounded-full max-h-[15rem] max-w-[15rem] mx-auto">
                    <img className="rounded-full" src={getThumbnailPath(character.thumbnail)}/>
                </div>
                <div className="mt-4 lg:mt-0">
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
                                <li key={comic.name} className="mt-1">
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
                                <li key={serie.name} className="mt-1">
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
