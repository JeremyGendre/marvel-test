import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import {PropsWithChildren} from "react";
import {useComics} from "../context/ComicsContext";

export default function HomePage(){
    const {characters, loading} = useCharacters();
    const {comics, loading: loadingComics} = useComics();
    return (
        <div className="p-6 flex flex-col space-y-8">
            <Row title="Characters">
                {loading ? (<Spinner/>) : (
                    <>
                        {characters.slice(0,6).map(character => (
                            <Card key={character.id} name={character.name} thumbnail={character.thumbnail} link="/"/>
                        ))}
                    </>
                )}
            </Row>
            <Row title="Comics">
                {loadingComics ? (<Spinner/>) : (
                    <>
                        {comics.slice(0,6).map(comics => (
                            <Card key={comics.id} name={comics.title} thumbnail={comics.thumbnail} link="/"/>
                        ))}
                    </>
                )}
            </Row>
            <Row title="Series">series</Row>
        </div>
    );
}

function Row ({children, title}: PropsWithChildren<{title: string}>){
    return (
        <div>
            <div className="text-xl">{title}</div>
            <hr className="my-2"/>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {children}
            </div>
        </div>
    );
}
