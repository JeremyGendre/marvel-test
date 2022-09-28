import {useEffect, useState} from "react";
import {useLocation, useParams } from "react-router-dom";
import {request} from "../helpers/RequestHelper";
import Spinner from "../components/Spinner";
import {getThumbnailPath} from "../helpers/ThumbnailHelper";
import ItemList, {NoValue} from "../components/ItemList";
import {Comic} from "../models/Comic";
import Error from "../components/Error";

export default function ComicPage(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // id du comic
    let { id } = useParams();

    // on récupère l'objet Comic pour éviter, s'il existe, d'aller le fetch à l'API
    const {state} = useLocation();
    const [comic, setComic] = useState<Comic|undefined>(state);

    useEffect(() => {
        if(!comic && !!id){
            setLoading(true);
            request(`/v1/public/comics/${id}`)
                .then(({data}) => {
                    if(data.data.results.length >= 1){
                        setComic(data.data.results[0]);
                    }
                })
                .catch(error => { // on gère les erreurs
                    setError(error.response.data ? error.response.data.status : error.message);
                })
                .finally(() => {setLoading(false)})
        }
    },[id, comic]);

    // s'il y a une erreur on l'affiche
    if(error) return (<Error>{error}</Error>);

    if(!comic || loading) return <Spinner text="Fetching comic"/>;

    return (
        <div className="lg:mx-24">
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="overflow-hidden max-w-[15rem] rounded mx-auto lg:mx-0">
                    <img alt={comic.title} src={getThumbnailPath(comic.thumbnail)}/>
                </div>
                <div className="mt-4 lg:mt-0 mx-auto lg:mx-0">
                    <table className="ml-8 text-left item-table text-xl">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{comic.title}</td>
                        </tr>
                        <tr>
                            <th className="flex"><span className="mb-auto">Description</span></th>
                            <td>{comic.description ? comic.description : (<NoValue>No description</NoValue>)}</td>
                        </tr>
                        <tr>
                            <th className="flex"><span className="mb-auto">Creator(s)</span></th>
                            <td>{comic.creators.items.length > 0 ? (
                                <ul>
                                    {comic.creators.items.map(creator => creator.name).join(', ')}
                                </ul>
                            ) : (<NoValue>No associated creator</NoValue>)}</td>
                        </tr>
                        <tr>
                            <th>Format</th>
                            <td>{comic.format ? comic.format : (<NoValue>No format</NoValue>)}</td>
                        </tr>
                        <tr>
                            <th>Series</th>
                            <td>{comic.series ? comic.series.name : (<NoValue>No serie</NoValue>)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 flex flex-col space-y-8">
                <ItemList title={`Characters (${comic.characters.items.length})`}>
                    <ul>
                        {comic.characters.items.map((char, index) => (
                            <li key={char.name + index} className="mt-1">
                                {char.name}
                            </li>
                        ))}
                        {comic.characters.items.length === 0 && (<NoValue>No associated character</NoValue>)}
                    </ul>
                </ItemList>
            </div>
        </div>
    );
}

