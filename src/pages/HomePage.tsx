import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import {PropsWithChildren, useEffect} from "react";
import {useComics} from "../context/ComicsContext";
import {useSeries} from "../context/SeriesContext";
import {Link} from "react-router-dom";
import Error from "../components/Error";

export default function HomePage(){
    const {characters, loading, fetchCharacters, error: charError} = useCharacters();
    const {comics, loading: loadingComics, fetchComics, error: comicError} = useComics();
    const {series, loading: loadingSeries, fetchSeries, error: serieError} = useSeries();

    // on fetch les différents pré-listing

    useEffect(() => {
        fetchCharacters();
    },[fetchCharacters]);

    useEffect(() => {
        fetchComics();
    },[fetchComics]);

    useEffect(() => {
        fetchSeries();
    },[fetchSeries]);

    // on affiche les 6 premiers résultats de chaque listing et on gère les erreurs
    return (
        <div className="flex flex-col space-y-16">
            <Row title="Characters" link="/characters">
                {loading ? (<Spinner text="Fetching characters..."/>) : (
                    <>
                        {characters.slice(0,6).map(character => (
                            <Card
                                key={character.id}
                                name={character.name}
                                thumbnail={character.thumbnail}
                                to={`/characters/${character.id}`}
                                state={character}
                            />
                        ))}
                    </>
                )}
                {charError && <Error>{charError}</Error>}
            </Row>
            <Row title="Comics" link="/comics">
                {loadingComics ? (<Spinner text="Fetching comics..."/>) : (
                    <>
                        {comics.slice(0,6).map(comic => (
                            <Card
                                key={comic.id}
                                name={comic.title}
                                thumbnail={comic.thumbnail}
                                to={`/comics/${comic.id}`}
                                state={comic}
                            />
                        ))}
                    </>
                )}
                {comicError && <Error>{comicError}</Error>}
            </Row>
            <Row title="Series" link="/series">
                {loadingSeries ? (<Spinner text="Fetching series..."/>) : (
                    <>
                        {series.slice(0,6).map(serie => (
                            <Card
                                key={serie.id}
                                name={serie.title}
                                thumbnail={serie.thumbnail}
                                to={`/series/${serie.id}`}
                                state={serie}
                            />
                        ))}
                    </>
                )}
                {serieError && <Error>{serieError}</Error>}
            </Row>
        </div>
    );
}

interface RowProps {
    title: string;
    link: string;
}

function Row ({children, title, link}: PropsWithChildren<RowProps>){
    return (
        <div>
            <div><span className="text-2xl">{title} | </span> <Link to={link} className="text-md text-red-400 transition duration-150 hover:underline">see more →</Link></div>
            <hr className="my-2"/>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {children}
            </div>
        </div>
    );
}
