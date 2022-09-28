import {useEffect, useState} from "react";
import {useLocation, useParams } from "react-router-dom";
import {request} from "../helpers/RequestHelper";
import Spinner from "../components/Spinner";
import {getThumbnailPath} from "../helpers/ThumbnailHelper";
import ItemList, {NoValue} from "../components/ItemList";
import {Serie} from "../models/Serie";

export default function SeriePage(){
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const {state} = useLocation();
    const [serie, setSerie] = useState<Serie|undefined>(state);

    useEffect(() => {
        if(!serie && !!id){
            setLoading(true);
            request(`/v1/public/series/${id}`)
                .then(({data}) => {
                    if(data.data.results.length >= 1){
                        setSerie(data.data.results[0]);
                    }
                })
                .catch(console.error)
                .finally(() => {setLoading(false)})
        }
    },[id, serie]);

    if(!serie || loading) return <Spinner text="Fetching serie"/>;

    return (
        <div className="lg:mx-24">
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="overflow-hidden max-w-[15rem] rounded mx-auto lg:mx-0">
                    <img alt={serie.title} src={getThumbnailPath(serie.thumbnail)}/>
                </div>
                <div className="mt-4 lg:mt-0 mx-auto lg:mx-0">
                    <table className="ml-8 text-left item-table text-xl">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{serie.title}</td>
                        </tr>
                        <tr>
                            <th className="flex"><span className="mb-auto">Description</span></th>
                            <td>{serie.description ? serie.description : (<NoValue>No description</NoValue>)}</td>
                        </tr>
                        <tr>
                            <th className="flex"><span className="mb-auto">Creator(s)</span></th>
                            <td>{serie.creators.items.length > 0 ? (
                                <ul>
                                    {serie.creators.items.map(creator => creator.name).join(', ')}
                                </ul>
                            ) : (<NoValue>No associated creator</NoValue>)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
                <ItemList title={`Characters (${serie.characters.items.length})`}>
                    <ul>
                        {serie.characters.items.map((char, index) => (
                            <li key={char.name + index} className="mt-1">
                                {char.name}
                            </li>
                        ))}
                        {serie.characters.items.length === 0 && (<NoValue>No associated character</NoValue>)}
                    </ul>
                </ItemList>
                <ItemList title={`Comics (${serie.comics.items.length})`}>
                    <ul>
                        {serie.comics.items.map((comic, index) => (
                            <li key={comic.name + index} className="mt-1">
                                {comic.name}
                            </li>
                        ))}
                        {serie.comics.items.length === 0 && (<NoValue>No associated comic</NoValue>)}
                    </ul>
                </ItemList>
            </div>
        </div>
    );
}

